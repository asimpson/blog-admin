const aws = require('aws-sdk');

const db = new aws.DynamoDB({
  region: 'us-east-1',
});

const sts = new aws.STS();

const grantRole = (token, cb) => {
  const params = {
    RoleArn: process.env.stsRole,
    RoleSessionName: 'ams-blog',
    WebIdentityToken: token,
  };

  sts.assumeRoleWithWebIdentity(params, (err, data) => {
    if (err) {
      cb(err);
    } else {
      cb(null, JSON.stringify({ perms: data, token }));
    }
  });
};

const getTokenForToken = (email, cb) => {
  const cognitoidentity = new aws.CognitoIdentity({ region: 'us-east-1' });

  const params = {
    IdentityId: process.env.identityId,
    IdentityPoolId: process.env.identityPool,
    Logins: {
      'blog.ams.net': email,
    },
    TokenDuration: 60 * 60,
  };

  cognitoidentity.getOpenIdTokenForDeveloperIdentity(params, (err, data) => {
    if (err) {
      cb(err);
    } else {
      grantRole(data.Token, cb);
    }
  });
};

const returnToken = (event, context, callback) => {
  const params = {
    TableName: 'ams-blog',
    IndexName: 'token-index',
    KeyConditionExpression: '#token = :token',
    ExpressionAttributeNames: {
      '#token': 'token',
    },
    ExpressionAttributeValues: {
      ':token': {
        S: event.token,
      },
    },
  };
  db.query(params, (err, data) => {
    const now = new Date();
    const email = data.Items[0].email.S;
    const expire = new Date(data.Items[0].token_expire.S);

    if (now.getTime() < expire.getTime()) {
      getTokenForToken(email, callback);
    } else {
      callback('expired');
    }
  });
};

exports.handler = returnToken;

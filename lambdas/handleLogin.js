const aws = require('aws-sdk');
const crypto = require('crypto');
const sendgrid = require('sendgrid')(process.env.sendGridKey);

const db = new aws.DynamoDB({
  region: 'us-east-1',
});

const TableName = 'ams-blog';

const sendLink = (email, token, cb) => {
  const request = sendgrid.emptyRequest();
  request.body = {
    personalizations: [
      {
        to: [{ email }],
        subject: 'Login',
      },
    ],
    content: [
      {
        type: 'text/plain',
        value: `Login with this URL: adamsimpson.net/login?token=${token}`,
      },
    ],
    from: {
      email: 'admin@adamsimpson.net',
      name: 'AMS Admin',
    },
  };
  request.method = 'POST';
  request.path = '/v3/mail/send';
  /* eslint new-cap: 0 */
  sendgrid.API(request, (error, response) => {
    if (error) {
      cb(`error sending email: ${error}`);
    } else {
      cb(null, JSON.stringify(response.body));
    }
  });
};

const generateTempToken = (email, cb) => {
  const token = crypto.randomBytes(64).toString('hex');
  const date = new Date();
  const EXPIRE_WINDOW = 15 * 60 * 1000;
  date.setTime(date.getTime() + EXPIRE_WINDOW);

  const params = {
    TableName,
    Key: {
      email: { S: email },
    },
    UpdateExpression: 'SET #token =:token, #expire =:expire',
    ExpressionAttributeNames: {
      '#token': 'token',
      '#expire': 'token_expire',
    },
    ExpressionAttributeValues: {
      ':token': {
        S: token,
      },
      ':expire': {
        S: `${date}`,
      },
    },
  };
  db.updateItem(params, (err) => {
    if (!err) {
      sendLink(email, token, cb);
    } else {
      cb('error generating token');
    }
  });
};

const handleLogin = (event, context, callback) => {
  const params = {
    TableName,
    Key: {
      email: { S: event.email },
    },
  };
  db.getItem(params, (err, data) => {
    if (err) {
      callback(`{ error: ${JSON.stringify(err)} }`);
    }

    if (data.Item.email.S === event.email) {
      generateTempToken(event.email, callback);
    } else {
      callback('email not found');
    }
  });
};

exports.handler = handleLogin;

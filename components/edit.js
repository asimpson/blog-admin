import aws from 'aws-sdk';

const edit = payload => new Promise((resolve, reject) => {
  const auth = JSON.parse(sessionStorage.getItem('aws_token'));
  /* eslint max-len: 0 */
  const creds = new aws.Credentials(auth.perms.Credentials.AccessKeyId, auth.perms.Credentials.SecretAccessKey, auth.perms.Credentials.SessionToken);

  const lambda = new aws.Lambda({
    region: 'us-east-1',
    credentials: creds,
  });

  lambda.invoke({
    FunctionName: 'updatePost',
    Payload: JSON.stringify(payload),
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      lambda.invoke({
        FunctionName: 'buildSearch',
      }, (yerr) => {
        if (yerr) {
          reject(yerr);
        } else {
          resolve();
        }
      });
    }
  });
});

export default edit;

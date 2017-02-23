import aws from 'aws-sdk';

export const buildPosts = () => new Promise((resolve, reject) => {
  const auth = JSON.parse(sessionStorage.getItem('aws_token'));
  /* eslint max-len: 0 */
  const creds = new aws.Credentials(auth.perms.Credentials.AccessKeyId, auth.perms.Credentials.SecretAccessKey, auth.perms.Credentials.SessionToken);

  const lambda = new aws.Lambda({
    region: 'us-east-1',
    credentials: creds,
  });

  lambda.invoke({
    FunctionName: 'buildPosts',
  }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

export const buildIndex = () => new Promise((resolve, reject) => {
  const auth = JSON.parse(sessionStorage.getItem('aws_token'));
  /* eslint max-len: 0 */
  const creds = new aws.Credentials(auth.perms.Credentials.AccessKeyId, auth.perms.Credentials.SecretAccessKey, auth.perms.Credentials.SessionToken);

  const lambda = new aws.Lambda({
    region: 'us-east-1',
    credentials: creds,
  });

  lambda.invoke({
    FunctionName: 'buildIndexPages',
  }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

export const clearCache = slug => new Promise((resolve, reject) => {
  const auth = JSON.parse(sessionStorage.getItem('aws_token'));
  /* eslint max-len: 0 */
  const creds = new aws.Credentials(auth.perms.Credentials.AccessKeyId, auth.perms.Credentials.SecretAccessKey, auth.perms.Credentials.SessionToken);

  const lambda = new aws.Lambda({
    region: 'us-east-1',
    credentials: creds,
  });

  const items = [
    '/index',
  ];

  if (slug) {
    items.push(`/writing/${slug}`);
  }

  lambda.invoke({
    FunctionName: 'invalidate',
    Payload: JSON.stringify({ items }),
  }, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

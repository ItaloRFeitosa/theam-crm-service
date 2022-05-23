const { STAGE } = require("#application/config/constants");
const { S3 } = require("aws-sdk");

const DEFAULT_EXPIRES = 60*60 // 1 hour

const local = {
  region: "us-east-1",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  endpoint: "http://localhost:9000",
  accessKeyId: "minioadmin",
  secretAccessKey: "minioadmin",
};

const s3Config = {
  development: local,
  production: {},
};

const s3client = new S3(s3Config[STAGE]);

const putSignedUrl = async ({
  bucket,
  key,
  contentType,
  expiresIn = DEFAULT_EXPIRES,
}) => {
  const signedUrl = await s3client.getSignedUrlPromise("putObject", {
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
    Expires: expiresIn,
  });
  return signedUrl;
};

const getSignedUrl = async ({
  bucket,
  key,
  expiresIn = DEFAULT_EXPIRES,
}) => {
  const signedUrl = await s3client.getSignedUrlPromise("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: expiresIn,
  });
  return signedUrl;
};

module.exports = { putSignedUrl, getSignedUrl };

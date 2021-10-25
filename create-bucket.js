const AWS = require('aws-sdk');
// Enter copied or downloaded access ID and secret key here
const ID = process.env.Aws_ID;
const SECRET = process.env.Aws_Secret;

// The name of the bucket that you have created
const BUCKET_NAME = process.env.Aws_BUCKET_NAME;

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
      // Set your region here
      LocationConstraint: "eu-west-1"
  }
};

module.exports.createS3Bucket = async () => {
  try {
    return await s3.createBucket(params).promise();
  } catch (err) {
    console.log(`Your previous request to create the named bucket succeeded and you already own it`);
  }
}; 

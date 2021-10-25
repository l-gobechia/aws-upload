const AWS = require('aws-sdk');
const myConfig = require('./config.js')

const s3 = new AWS.S3({
  accessKeyId: myConfig.aws.Id,
  secretAccessKey: myConfig.aws.secret
});

const params = {
  Bucket: myConfig.aws.bucketName,
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

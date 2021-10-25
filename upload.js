require('dotenv').config()
const fs = require('fs');
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4, v4 } = require('uuid');
const myConfig = require('./config.js');

module.exports.uploadFile = async (fileName) => {
    try {
        // Read content from the file
        const fileContent = fs.readFileSync(fileName);
        // Setting up S3 upload parameters
        const params = {
            Bucket: myConfig.aws.bucketName,
            Key: `${v4()}cat.jpg`, // File name you want to save as in S3
            Body: fileContent,
            ACL:'public-read'
        };
        const s3 = new S3();
        // Uploading files to the bucket
        const res = await s3.upload(params).promise();
        return res;
    } catch (err) {
        throw err;
    }
};

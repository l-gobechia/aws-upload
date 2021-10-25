const fs = require('fs');
const S3 = require("aws-sdk/clients/s3");
const { v4: uuidv4, v4 } = require('uuid');
const BUCKET_NAME = 'satestogashveba';

module.exports.uploadFile = async (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${v4()}cat.jpg`, // File name you want to save as in S3
        Body: fileContent,
        ACL:'public-read'
    };
    const s3 = new S3();
    // Uploading files to the bucket
   const res = await s3.upload(params, (err, data) => {
            if (err) {
                console.log(`@here`);
                throw err;
            }
    }).promise();

    return res;
};

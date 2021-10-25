'use strict';
const axios = require('axios');
const Fs = require('fs')
const uploadToS3 = require('./upload.js');
const createBucket = require('./create-bucket.js');
const myConfig = require('./config.js');

const getCatPhoto = async (status) => {
    const imgPath = "catImages/cat.jpeg";
    const res = await axios({ 
      method: "get", 
      url: `${myConfig.aws.url}${status}`,
      responseType: "stream" 
    });

    const writeFile = Fs.createWriteStream(imgPath);
    res.data.pipe(writeFile);

    return new Promise((res, rej) => {
      writeFile.on("finish", () => res(imgPath));
      writeFile.on("error", (err) => rej(err));
    });
};

module.exports.cat = async (event) => {
  try {
    await createBucket.createS3Bucket();
    const res = await getCatPhoto(event.pathParameter);
    let uploadRes;
    if (res) {
      uploadRes = await uploadToS3.uploadFile("catImages/cat.jpeg");
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Go Serverless v2.0! Your function executed successfully!',
          input: `lambda function executed successfully your picture is on ${uploadRes.Location} `,
        },
        null,
        2
      ),
    };
  } catch (error) {
    throw error;
  }
};

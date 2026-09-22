// Helper to upload files to S3 using @aws-sdk/lib-storage Upload
const { Upload } = require("@aws-sdk/lib-storage");

module.exports = async function uploadToS3({ client, params, fileStream }) {
  const upload = new Upload({
    client,
    params: {
      ...params,
      Body: fileStream,
    },
  });
  return upload.done();
};

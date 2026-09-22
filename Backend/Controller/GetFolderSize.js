const { ListObjectsV2Command, S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.REGION,
<<<<<<< HEAD
  endpoint: `https://s3.${process.env.REGION}.amazonaws.com`,
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
  },
});
const BUCKET_NAME = process.env.BUCKET_NAME;

const fetchFolderSize = async (folderPath) => {
  try {
    let continuationToken = undefined;
    let totalSizeInBytes = 0;

    do {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: folderPath.endsWith("/") ? folderPath : folderPath + "/",
        ContinuationToken: continuationToken,
      });

      const response = await s3Client.send(command);

      if (response.Contents) {
        response.Contents.forEach((object) => {
          if (!object.Key.endsWith("/")) {
            totalSizeInBytes += object.Size || 0;
          }
        });
      }

      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } while (continuationToken);

    const sizeInMB = totalSizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(2); // return as string with 2 decimal places
  } catch (error) {
    console.error("Error fetching folder size:", error);
    throw error;
  }
};

module.exports={fetchFolderSize}
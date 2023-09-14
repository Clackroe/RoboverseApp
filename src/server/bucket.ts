import AWS from "aws-sdk";
import { env } from "~/env.mjs";
import fs, { access } from "fs";

const spacesEndpoint = new AWS.Endpoint(env.BUCKET_ENDPOINT);
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: env.BUCKET_KEY,
  secretAccessKey: env.BUCKET_SECRET,
});

export async function listObjects() {
  const params = {
    Bucket: "ml-bots",
  };

  try {
    const data = await s3.listObjects(params).promise();
    console.log("Objects in bucket:", data.Contents);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function uploadFile(
  path: string,
  name: string,
  type:
    | "image/png"
    | "image/jpeg"
    | "image/jpg"
    | "image/gif"
    | "image/svg+xml",
  access: "public-read" | "private" = "public-read"
) {
  const params = {
    Bucket: "ml-bots",
    Key: name,
    Body: fs.readFileSync(path),
    ContentType: type,
    ACL: access,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data.Location);
    fs.rmSync(path);
    return { link: data.Location };
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteFile(name: string) {
  const params = {
    Bucket: "ml-bots",
    Key: name,
  };

  try {
    const data = await s3.deleteObject(params).promise();
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3 } from "../config/s3ClientConfig.js";
import { config } from "../../config.js";

export const putS3Object = async (key, content) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: key,
      Body: content,
      ContentType: "image/jpeg",
    })
  );
};

export const getS3Object = async (key) => {
  const res = await s3.send(
    new GetObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: key,
    })
  );
  return res;
};

export const removeS3Object = async (key) => {
  const res = await s3.send(
    new DeleteObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: key,
    })
  );
  return res;
};

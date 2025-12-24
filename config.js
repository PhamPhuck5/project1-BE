import dotenv from "dotenv";
dotenv.config();

export const config = {
  URL_FE: "http://localhost:3000",
  URL_BE: "http://localhost:" + process.env.PORT,

  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
};

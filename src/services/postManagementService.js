import * as postService from "./baseService/postService.js";
import { putS3Object, removeS3Object, getS3Object } from "../utils/S3Util.js";
import storageServices from "./storageService.js";
import path from "path";
import fs from "fs";
export const postNewImage = async (senderId, eventId, fileInfo) => {
  const { destination, originalname, path: oldPath } = fileInfo;
  let key, filePath, post;

  try {
    filePath = await storageServices.normalizationFile(
      destination,
      originalname,
      oldPath
    );

    post = await postService.create(senderId, eventId, new Date(), "");

    const extname = path.extname(filePath).toLowerCase();
    key = `posts/${eventId}/${post.id}${extname}`;

    const fileContent = await fs.promises.readFile(filePath);
    await putS3Object(key, fileContent);

    post.key = key;
    await post.save();

    return post;
  } catch (e) {
    console.log(e);
    try {
      removeS3Object(key);
    } catch {}
    postService.deleteById(post.id);
  } finally {
    filePath ?? (await fs.promises.unlink(filePath));
  }
};

export const getImageByPostId = async (postId) => {
  const post = await postService.findPostById(postId);

  if (!post) {
    throw new Error("Không tìm thấy bài đăng.");
  }

  // 2. Lấy đối tượng từ S3
  const s3Response = await getS3Object(post.key);

  // Trả về response từ S3 (chứa Body là stream dữ liệu ảnh)
  return s3Response;
};
// posterFile.destination,
// posterFile.originalname,
// posterFile.path

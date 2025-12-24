import * as postManagementService from "../services/postManagementService.js";
import * as postService from "../services/baseService/postService.js";

export const createPost = async (req, res) => {
  try {
    const { senderId, eventId } = req.body;
    const fileInfo = req.file;

    if (!fileInfo) {
      return res.status(400).json({ message: "Vui lòng upload ảnh." });
    }

    const post = await postManagementService.postNewImage(
      senderId,
      eventId,
      fileInfo
    );
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { lastId, limit } = req.query; // Hỗ trợ phân trang

    const posts = await postService.findByEventId(
      eventId,
      lastId,
      parseInt(limit) || 10
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const s3Data = await postManagementService.getImageByPostId(postId);

    // Stream trực tiếp từ S3 về Client để tối ưu RAM
    res.setHeader("Content-Type", s3Data.ContentType || "image/jpeg");
    s3Data.Body.pipe(res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

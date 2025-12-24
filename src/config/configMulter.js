import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const _filename = fileURLToPath(import.meta.url); // Lấy đường dẫn tuyệt đối của file hiện tại
export const storagePath = path.join(dirname(_filename), "..", "temp");

fs.mkdirSync(storagePath, { recursive: true });
fs.mkdirSync(path.join(storagePath, "/posts"), { recursive: true });

let i = 0;
const getIndex = () => {
  i = i + 1;
  if (i > 1e8) {
    i = 0;
  }
  return i;
};
const storage = multer.diskStorage({
  //==> disk |><| memoryStorage => in main memory
  destination: (req, file, cb) => cb(null, path.join(storagePath, "/posts")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // lấy đuôi file gốc (.jpg, .png, ...)
    const uniqueSuffix = Date.now() + "-" + getIndex();
    const fileName = `${uniqueSuffix}${ext}`;
    cb(null, fileName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpeg|png|webp)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only jpeg/png/webp allowed"));
  },
});

export default upload;

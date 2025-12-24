import path from "path";
import fs from "fs";
import sharp from "sharp";

async function convertToJpg(inputPath, outputPath) {
  await sharp(inputPath)
    .jpeg({ quality: 90 }) // nén ảnh JPG, quality tuỳ chỉnh
    .toFile(outputPath);
}

async function normalizationFile(destination, originalName, oldPath) {
  const ext = path.extname(originalName).toLowerCase();
  const baseName = path.basename(originalName, ext);

  const newFileName = `${baseName}.jpg`;
  const newPath = path.join(destination, newFileName);

  if (ext !== ".jpg" && ext !== ".jpeg") {
    await convertToJpg(oldPath, newPath);
    await fs.promises.unlink(oldPath); // xóa file gốc sau khi convert
  } else {
    await fs.promises.rename(oldPath, newPath); // dùng promises
  }
  return newPath;
}

const storageServices = {
  normalizationFile: normalizationFile,
};
export default storageServices;

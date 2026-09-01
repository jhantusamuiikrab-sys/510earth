import sharp from "sharp";
import path from "path";
import fs from "fs";

export const convertToWebp = async (
  fileBuffer,
  destinationFolder
) => {
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, {
      recursive: true,
    });
  }

  const fileName = `image-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.webp`;

  const savePath = path.join(destinationFolder, fileName);

  await sharp(fileBuffer)
    .webp({
      quality: 100,
    })
    .toFile(savePath);

  return fileName;
};
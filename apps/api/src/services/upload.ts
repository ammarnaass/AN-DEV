import sharp from "sharp";
import path from "path";
import fs from "fs";
import crypto from "crypto";

export async function processAndSaveImage(
  fileBuffer: Buffer,
  subDir: string = "projects"
): Promise<{ path: string; width: number; height: number }> {
  const uploadsDir = path.resolve(process.cwd(), "uploads", subDir);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.webp`;
  const targetPath = path.join(uploadsDir, filename);

  const image = sharp(fileBuffer);
  const metadata = await image.metadata();

  // Resize if wider than 1920px and convert to webp with 85% quality
  await image
    .resize({
      width: Math.min(metadata.width || 1920, 1920),
      withoutEnlargement: true
    })
    .webp({ quality: 85 })
    .toFile(targetPath);

  return {
    path: `/uploads/${subDir}/${filename}`,
    width: metadata.width || 0,
    height: metadata.height || 0
  };
}


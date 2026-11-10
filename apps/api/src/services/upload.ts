import path from "path";
import fs from "fs";
import crypto from "crypto";

export async function processAndSaveImage(
  fileBuffer: Buffer,
  subDir: string = "projects"
): Promise<{ path: string; width: number; height: number }> {
  const sharpModule = await import("sharp");
  const sharp = sharpModule.default || sharpModule;
  const image = sharp(fileBuffer);
  const metadata = await image.metadata();

  const resized = image
    .resize({
      width: Math.min(metadata.width || 1920, 1920),
      withoutEnlargement: true
    })
    .webp({ quality: 85 });

  try {
    const uploadsDir = path.resolve(process.cwd(), "uploads", subDir);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.webp`;
    const targetPath = path.join(uploadsDir, filename);
    await resized.toFile(targetPath);

    return {
      path: `/uploads/${subDir}/${filename}`,
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  } catch {
    // Read-only filesystem fallback (e.g. Vercel serverless)
    const webpBuffer = await resized.toBuffer();
    const base64 = webpBuffer.toString("base64");
    return {
      path: `data:image/webp;base64,${base64}`,
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  }
}

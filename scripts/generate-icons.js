import sharp from "sharp";
import path from "path";

const PROJECT_ROOT = "/vercel/share/v0-project";
const SOURCE = path.join(PROJECT_ROOT, "public/icons/source-logo.png");
const OUT_DIR = path.join(PROJECT_ROOT, "public/icons");

async function generateIcons() {
  // Generate 192x192 icon
  await sharp(SOURCE)
    .resize(192, 192, { fit: "cover", position: "centre" })
    .png({ quality: 95 })
    .toFile(path.join(OUT_DIR, "icon-192x192.png"));
  console.log("Created icon-192x192.png");

  // Generate 512x512 icon
  await sharp(SOURCE)
    .resize(512, 512, { fit: "cover", position: "centre" })
    .png({ quality: 95 })
    .toFile(path.join(OUT_DIR, "icon-512x512.png"));
  console.log("Created icon-512x512.png");

  // Generate maskable icon 512 (with safe area padding - 10% on each side)
  const maskableSize = 512;
  const padding = Math.round(maskableSize * 0.1);
  const innerSize = maskableSize - padding * 2;

  const resizedLogo = await sharp(SOURCE)
    .resize(innerSize, innerSize, { fit: "contain", background: { r: 10, g: 15, b: 56, alpha: 1 } })
    .toBuffer();

  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 4,
      background: { r: 10, g: 15, b: 56, alpha: 1 },
    },
  })
    .composite([{ input: resizedLogo, left: padding, top: padding }])
    .png({ quality: 95 })
    .toFile(path.join(OUT_DIR, "icon-maskable-512x512.png"));
  console.log("Created icon-maskable-512x512.png");

  // Generate maskable icon 192
  const maskableSize192 = 192;
  const padding192 = Math.round(maskableSize192 * 0.1);
  const innerSize192 = maskableSize192 - padding192 * 2;

  const resizedLogo192 = await sharp(SOURCE)
    .resize(innerSize192, innerSize192, { fit: "contain", background: { r: 10, g: 15, b: 56, alpha: 1 } })
    .toBuffer();

  await sharp({
    create: {
      width: maskableSize192,
      height: maskableSize192,
      channels: 4,
      background: { r: 10, g: 15, b: 56, alpha: 1 },
    },
  })
    .composite([{ input: resizedLogo192, left: padding192, top: padding192 }])
    .png({ quality: 95 })
    .toFile(path.join(OUT_DIR, "icon-maskable-192x192.png"));
  console.log("Created icon-maskable-192x192.png");

  console.log("All icons generated successfully!");
}

generateIcons();

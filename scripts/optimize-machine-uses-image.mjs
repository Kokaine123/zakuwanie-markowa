import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourcePath = path.join(
  rootDir,
  "public",
  "Projekt bez nazwy (1)",
  "Bez nazwy (630 x 1200 px).png",
);
const outputDir = path.join(rootDir, "public", "gallery", "weze-hydrauliczne");
const imageId = "zakuwamy-weze-01";
const webpQuality = 82;

await fs.mkdir(outputDir, { recursive: true });

const input = sharp(sourcePath).rotate();

await input
  .clone()
  .resize({ width: 630, withoutEnlargement: true })
  .webp({ quality: webpQuality, effort: 5 })
  .toFile(path.join(outputDir, `${imageId}.webp`));

await input
  .clone()
  .resize({ width: 420, withoutEnlargement: true })
  .webp({ quality: webpQuality, effort: 5 })
  .toFile(path.join(outputDir, `${imageId}-mobile.webp`));

const desktopMeta = await sharp(path.join(outputDir, `${imageId}.webp`)).metadata();
const mobileMeta = await sharp(path.join(outputDir, `${imageId}-mobile.webp`)).metadata();

console.log(
  `${imageId}: desktop ${desktopMeta.width}x${desktopMeta.height}, mobile ${mobileMeta.width}x${mobileMeta.height}`,
);

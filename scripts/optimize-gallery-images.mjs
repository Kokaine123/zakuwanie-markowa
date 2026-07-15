import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "public", "Projekt bez nazwy (1)");
const outputDir = path.join(rootDir, "public", "gallery", "weze-hydrauliczne");

const images = [
  { source: "1.png", id: "weze-hydrauliczne-01" },
  { source: "2.png", id: "weze-hydrauliczne-02" },
  { source: "3.png", id: "weze-hydrauliczne-03" },
  { source: "4.png", id: "weze-hydrauliczne-04" },
  { source: "5.png", id: "weze-hydrauliczne-05" },
  { source: "6.png", id: "weze-hydrauliczne-06" },
  { source: "7.png", id: "weze-hydrauliczne-07" },
];

const desktopMaxWidth = 1920;
const mobileMaxWidth = 900;
const webpQuality = 82;

await fs.mkdir(outputDir, { recursive: true });

for (const image of images) {
  const inputPath = path.join(sourceDir, image.source);
  const desktopPath = path.join(outputDir, `${image.id}.webp`);
  const mobilePath = path.join(outputDir, `${image.id}-mobile.webp`);
  const input = sharp(inputPath).rotate();

  await input
    .clone()
    .resize({ width: desktopMaxWidth, withoutEnlargement: true })
    .webp({ quality: webpQuality, effort: 5 })
    .toFile(desktopPath);

  await input
    .clone()
    .resize({ width: mobileMaxWidth, withoutEnlargement: true })
    .webp({ quality: webpQuality, effort: 5 })
    .toFile(mobilePath);

  const desktopMeta = await sharp(desktopPath).metadata();
  const mobileMeta = await sharp(mobilePath).metadata();

  console.log(
    `${image.id}: desktop ${desktopMeta.width}x${desktopMeta.height}, mobile ${mobileMeta.width}x${mobileMeta.height}`,
  );
}

console.log(`Saved ${images.length * 2} WebP files to ${outputDir}`);

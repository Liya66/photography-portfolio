// Imports photos from a folder of category subfolders into photos/, compressed for the web,
// and updates photos/photos.js.
//
//   npm run import-photos -- "/Users/liya/Desktop/portfolio photos"
//
// Source layout: <source>/<Category folder>/<image>.jpg (folder names mapped in FOLDERS below).
// For each image it writes:
//   photos/<category>/<name>.jpg         long edge ≤ 2560px, always < 3 MB (lightbox)
//   photos/<category>/thumbs/<name>.jpg  800px wide (gallery grid)
// Photos are auto-rotated and their metadata (including GPS location) is stripped.
// Already-imported photos are skipped, and existing alt/title text in photos.js is kept,
// so it's safe to rerun after adding new photos.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import sharp from "sharp";

// Source folder name → category key in site.config.js.
const FOLDERS = {
  Animals: "animals",
  City: "city",
  Landscapes: "landscape",
  "Portraits&Events": "portraits-events",
};

const FULL_SIZE = 2560;
const THUMB_WIDTH = 800;
const MAX_BYTES = 3 * 1024 * 1024;
const IMAGE_EXT = /\.(jpe?g|png|webp|tiff?)$/i;

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const photosDir = path.join(root, "photos");
const dataFile = path.join(photosDir, "photos.js");

const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error('Usage: npm run import-photos -- "<folder with category subfolders>"');
  process.exit(1);
}

// Load the current photo list so hand-written alt/title text survives a re-import.
function loadExisting() {
  if (!existsSync(dataFile)) return [];
  const sandbox = { window: {} };
  vm.runInNewContext(readFileSync(dataFile, "utf8"), sandbox);
  return sandbox.window.PHOTOS || [];
}

const slug = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function writeFull(input, out) {
  // Step quality down in the rare case a detailed photo is still over the limit.
  for (const quality of [82, 75, 68, 60]) {
    const buffer = await sharp(input)
      .rotate()
      .resize(FULL_SIZE, FULL_SIZE, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });
    if (buffer.data.length < MAX_BYTES) {
      writeFileSync(out, buffer.data);
      return buffer.info;
    }
  }
  throw new Error(`Could not get ${input} under 3 MB`);
}

async function main() {
  const existing = loadExisting();
  const bySrc = new Map(existing.map((p) => [p.src, p]));
  const seenHashes = new Set();
  const imported = {}; // category → [entries], in source order
  let skippedDuplicates = 0;

  for (const [folder, category] of Object.entries(FOLDERS)) {
    const dir = path.join(source, folder);
    if (!existsSync(dir)) {
      console.warn(`- No "${folder}" folder in source, skipping`);
      continue;
    }
    mkdirSync(path.join(photosDir, category, "thumbs"), { recursive: true });
    imported[category] = [];

    const files = readdirSync(dir).filter((f) => IMAGE_EXT.test(f)).sort();
    for (const file of files) {
      const input = path.join(dir, file);
      const hash = createHash("md5").update(readFileSync(input)).digest("hex");
      if (seenHashes.has(hash)) {
        console.log(`  duplicate skipped: ${folder}/${file}`);
        skippedDuplicates++;
        continue;
      }
      seenHashes.add(hash);

      const name = `${slug(file)}.jpg`;
      const src = `photos/${category}/${name}`;
      const thumb = `photos/${category}/thumbs/${name}`;
      const fullPath = path.join(root, src);
      const thumbPath = path.join(root, thumb);

      let { width, height } = bySrc.get(src) || {};
      const upToDate =
        existsSync(fullPath) && existsSync(thumbPath) && statSync(fullPath).mtimeMs >= statSync(input).mtimeMs;
      if (!upToDate || !width) {
        ({ width, height } = await writeFull(input, fullPath));
        await sharp(input).rotate().resize({ width: THUMB_WIDTH, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true }).toFile(thumbPath);
        console.log(`  ${src}  ${width}×${height}  ${(statSync(fullPath).size / 1024 / 1024).toFixed(2)} MB`);
      }

      const previous = bySrc.get(src) || {};
      imported[category].push({
        src,
        thumb,
        width,
        height,
        alt: previous.alt || "",
        category,
        ...(previous.title ? { title: previous.title } : {}),
      });
    }
  }

  // Keep the existing order for photos already in the list, then add new ones
  // interleaved across categories so the "All" view is mixed.
  const importedBySrc = new Map(Object.values(imported).flat().map((p) => [p.src, p]));
  const ordered = existing.filter((p) => importedBySrc.has(p.src)).map((p) => importedBySrc.get(p.src));
  const known = new Set(ordered.map((p) => p.src));
  const queues = Object.values(imported).map((list) => list.filter((p) => !known.has(p.src)));
  while (queues.some((q) => q.length)) {
    for (const q of queues) if (q.length) ordered.push(q.shift());
  }

  const lines = ordered.map((p) => `  ${JSON.stringify(p)},`).join("\n");
  writeFileSync(
    dataFile,
    `// Gallery photos, shown in this order. Generated by scripts/import-photos.mjs — rerun it after
// adding photos (see README). You can edit "alt" (screen-reader description), add a "title"
// (lightbox caption) or reorder lines by hand; re-importing keeps your edits and order.
window.PHOTOS = [
${lines}
];
`
  );

  const counts = Object.entries(imported).map(([c, l]) => `${c}: ${l.length}`).join(", ");
  console.log(`\n${ordered.length} photos in photos.js (${counts})${skippedDuplicates ? `, ${skippedDuplicates} duplicate(s) skipped` : ""}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

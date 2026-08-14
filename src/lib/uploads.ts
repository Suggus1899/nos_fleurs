import fs from "node:fs/promises";
import path from "node:path";

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

// ponytail: writes to the local filesystem, same as data/products.json.
// Fine for dev; move to real object storage (e.g. S3-compatible bucket)
// alongside the eventual Postgres migration.
export async function saveUploadedImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${crypto.randomUUID()}${ext}`;

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/products/${filename}`;
}

export function isValidImageFile(file: unknown): file is File {
  return (
    file instanceof File &&
    file.size > 0 &&
    file.size <= MAX_IMAGE_SIZE &&
    ALLOWED_IMAGE_TYPES.includes(file.type)
  );
}

// Only removes local uploads (never Pexels/remote URLs) — safe to call with
// any product.image value. Failures are ignored: a missing file shouldn't
// block a product delete/update.
export async function deleteUploadedImage(imagePath: string) {
  if (!imagePath.startsWith("/uploads/products/")) return;
  const filename = path.basename(imagePath);
  await fs.unlink(path.join(UPLOAD_DIR, filename)).catch(() => {});
}

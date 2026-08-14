import fs from "node:fs";
import path from "node:path";

const DATA_PATH = path.join(process.cwd(), "data", "occasions.json");

export function getOccasions(): string[] {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

export function saveOccasions(occasions: string[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(occasions, null, 2) + "\n");
}

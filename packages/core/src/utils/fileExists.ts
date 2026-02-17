import { promises as fs } from "fs";
import path from "path";

export async function fileExists(relativePath: string): Promise<boolean> {
  try {
    // const fullPath = path.resolve(process.cwd(), relativePath)
    const stat = await fs.stat(relativePath);
    return stat.isFile();
  } catch {
    return false;
  }
}
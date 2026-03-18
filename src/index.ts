export * from "./parsePy";
export * from "./parseMd";
export * from "./parseClassicMd";
export * from "./parseMystMd";
export * from "./parseSphinxGallery";
export * from "./notebook";
export * from "./toPy";
export * from "./toClassicMd";
export * from "./toMystMd";
export * from "./toSphinxGallery";

import { parsePy } from "./parsePy";
import { parseMd } from "./parseMd";
import { parseSphinxGallery } from "./parseSphinxGallery";
import { toPy } from "./toPy";
import { toMystMd } from "./toMystMd";
import { toSphinxGallery } from "./toSphinxGallery";
import type { Notebook } from "./notebook";

export function parse(text: string, format: "py" | "md" | "sphinx-gallery"): Notebook {
  if (format === "py") return parsePy(text);
  if (format === "md") return parseMd(text);
  if (format === "sphinx-gallery") return parseSphinxGallery(text);
  throw new Error(`Unknown format: "${format}". Expected "py", "md", or "sphinx-gallery".`);
}

export function serialize(notebook: Notebook, format: "py" | "md" | "sphinx-gallery"): string {
  if (format === "py") return toPy(notebook);
  if (format === "md") return toMystMd(notebook);
  if (format === "sphinx-gallery") return toSphinxGallery(notebook);
  throw new Error(`Unknown format: "${format}". Expected "py", "md", or "sphinx-gallery".`);
}

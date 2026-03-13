export { parsePy } from "./parsePy.js";
export { parseMd } from "./parseMd.js";
export { parseSphinxGallery } from "./parseSphinxGallery.js";
export type { Notebook, Cell, CodeCell, MarkdownCell, RawCell } from "./notebook.js";

import { parsePy } from "./parsePy.js";
import { parseMd } from "./parseMd.js";
import { parseSphinxGallery } from "./parseSphinxGallery.js";
import type { Notebook } from "./notebook.js";

export function parse(text: string, format: "py" | "md" | "sphinx-gallery"): Notebook {
  if (format === "py") return parsePy(text);
  if (format === "md") return parseMd(text);
  if (format === "sphinx-gallery") return parseSphinxGallery(text);
  throw new Error(`Unknown format: "${format}". Expected "py", "md", or "sphinx-gallery".`);
}

# plainb

Convert plain-text notebook files to [Jupyter nbformat 4](https://nbformat.readthedocs.io/) JSON — in the browser or in Node.

## Supported formats

| Format             | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| **`.py` percent**  | VS Code / Spyder / Jupytext percent format — cells delimited by `# %%`                                   |
| **`.md` classic**  | Markdown file where fenced code blocks with a language tag become code cells                             |
| **`.md` MyST**     | [MyST Notebook](https://myst-nb.readthedocs.io/) format — `{code-cell}` directives and `+++` cell breaks |
| **Sphinx Gallery** | [Sphinx-Gallery](https://sphinx-gallery.github.io/) `.py` scripts — RST docstring + `# %%` sections      |

## Install

```sh
npm install plainb
```

## Usage

```ts
import { parse, parsePy, parseMd, parseClassicMd, parseMystMd, parseSphinxGallery } from "plainb";

// Auto-dispatch by format
const notebook = parse(source, "py"); // or 'md' | 'sphinx-gallery'

// Or call parsers directly
const nb1 = parsePy(source); // .py percent format
const nb2 = parseMd(source); // .md classic or MyST (auto-detected)
const nb3 = parseClassicMd(source); // .md classic (explicit)
const nb4 = parseMystMd(source); // .md MyST (explicit)
const nb5 = parseSphinxGallery(source); // Sphinx Gallery
```

The returned object is a valid `nbformat.INotebookContent` (nbformat 4.5) — ready to save as `.ipynb` or pass to any Jupyter rendering library.

## `.py` percent format

```python
# %% [markdown]
# # Introduction
# Some **markdown** text.

# %%
import numpy as np
x = np.linspace(0, 1, 100)

# %% My cell name tags='["hide-input"]'
print(x)
```

- Cell type: `[markdown]`, `[md]`, `[raw]`, or omitted (defaults to code)
- Cell name: free text after the type tag → stored in `metadata.name`
- Tags: `tags='["tag1","tag2"]'` → stored in `metadata.tags`
- Markdown content: line-comment prefix (`# `) or triple-quoted string (`"""`)

## `.md` classic

````markdown
# My Notebook

Some prose text becomes a **markdown cell**.

```python
x = 1 + 1
```

Only fenced blocks with a language identifier become code cells.
Untagged fences stay as markdown.
````

## `.md` MyST

````markdown
---
kernelspec: python3
---

# Title

+++ {"tags": ["hide-input"]}

Markdown cell content.

```{code-cell} ipython3
:tags: ["parameters"]
x = 42
```
````

Supports `{code-cell}`, `{raw-cell}`, `{markdown-cell}` directives and `+++` cell breaks.

## Sphinx Gallery

```python
"""
================
My Gallery Script
================

Module docstring becomes the first markdown cell.
RST headings are converted to Markdown.
"""

# Authors: ...  ← stripped
# SPDX-...      ← stripped

# %%
# Section heading
# ---------------
# Comment block becomes a markdown cell.

import numpy as np   # code follows
```

## API

```ts
parse(text: string, format: 'py' | 'md' | 'sphinx-gallery'): Notebook

parsePy(text: string): Notebook
parseMd(text: string): Notebook          // auto-detects classic vs MyST
parseClassicMd(text: string): Notebook  // classic Markdown (explicit)
parseMystMd(text: string): Notebook     // MyST Notebook (explicit)
parseSphinxGallery(text: string): Notebook

// Types (re-exported from the package)
interface Notebook   { nbformat: 4; nbformat_minor: 5; metadata: …; cells: Cell[] }
type Cell            = CodeCell | MarkdownCell | RawCell
```

## Demo

```sh
git clone https://github.com/notebook-link/plainb
cd plainb
npm install
npm run demo
```

## License

MIT

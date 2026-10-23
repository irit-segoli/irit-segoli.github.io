# Irit Segoli Archive

A digital archive of the writing and curatorial work of Irit Segoli: articles, catalog essays, and exhibitions.

**Website:** https://irit-segoli.github.io/

## Content and rights

The website's source code is released under the [MIT License](LICENSE).

The archive content is **not** covered by that license:

- Texts by Irit Segoli are © Irit Segoli. All rights reserved.
- Artworks, photographs, and scanned publication pages belong to their respective artists, photographers, and publishers, and appear here for archival and research purposes.

To request a correction or the removal of material, use the form on the website.

## Adding material

Each article or exhibition is a Markdown file:

- `src/content/articles/`
- `src/content/exhibitions/`

The fields each entry accepts are defined in `src/content.config.ts`. PDFs go in `public/files/`, images in `public/images/`. Entries marked `pending: true` appear in the lists without a page of their own, and entries marked `draft: true` are not published.

## Development

Requires Node.js 22.12 or later.

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the local dev server at `localhost:4321` |
| `npm run build`   | Build the site to `./dist/`                 |
| `npm run preview` | Preview the build locally                   |

Every push to `master` builds the site and publishes it to GitHub Pages (`.github/workflows/deploy.yml`).

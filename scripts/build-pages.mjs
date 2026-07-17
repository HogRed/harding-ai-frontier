import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "pages-dist");
const workerUrl = pathToFileURL(path.join(root, "dist/server/index.js"));
workerUrl.searchParams.set("pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://hogred.github.io/", {
    headers: {
      accept: "text/html",
      host: "hogred.github.io",
      "x-forwarded-host": "hogred.github.io",
      "x-forwarded-proto": "https",
    },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed: ${response.status}`);

let html = await response.text();
html = html
  .replaceAll('"/assets/', '"./assets/')
  .replaceAll("'/assets/", "'./assets/")
  .replaceAll('"/ai-bison.jpg', '"./ai-bison.jpg')
  .replaceAll('"/joe-faith.png', '"./joe-faith.png')
  .replaceAll("https://hogred.github.io/og.png", "https://hogred.github.io/harding-ai-frontier/og.png");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "dist/client/assets"), path.join(output, "assets"), { recursive: true });
await cp(path.join(root, "public"), output, { recursive: true });
await writeFile(path.join(output, "index.html"), html);
await writeFile(path.join(output, ".nojekyll"), "");

const bundleFiles = await import("node:fs/promises").then(({ readdir }) =>
  readdir(path.join(output, "assets"), { withFileTypes: true }),
);
for (const file of bundleFiles) {
  if (!file.isFile() || !file.name.endsWith(".js")) continue;
  const filePath = path.join(output, "assets", file.name);
  const source = await readFile(filePath, "utf8");
  await writeFile(
    filePath,
    source
      .replaceAll('"/ai-bison.jpg', '"./ai-bison.jpg')
      .replaceAll('"/joe-faith.png', '"./joe-faith.png'),
  );
}

console.log(`GitHub Pages bundle created at ${output}`);

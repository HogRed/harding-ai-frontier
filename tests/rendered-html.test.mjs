import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the Harding AI exploration experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Harding AI — Build What’s Next<\/title>/i);
  assert.match(html, /Build what’s/);
  assert.match(html, /Dedicated AI/);
  assert.match(html, /Artificial Intelligence<span>25/);
  assert.match(html, /class="big-number">25/);
  assert.match(html, /COMP 4390/);
  assert.doesNotMatch(html, /87%|PROGRAM FIT/);
});

test("ships direct, accessible image assets and career mappings", async () => {
  const html = await (await render()).text();
  assert.match(html, /src="\/ai-bison\.jpg" alt="Harding AI Bison"/);
  assert.match(html, /src="\/joe-faith\.png" alt="Joe Faith, AI program guide"/);
  assert.match(html, /WHERE THE DEGREE BUILDS IT/);
  assert.match(html, /YOUR FIRST MISSION/);
  assert.match(html, /WHAT COULD YOU BUILD\?/);
});

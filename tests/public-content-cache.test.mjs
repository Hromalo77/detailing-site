import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { CACHE_ONE_YEAR_SECONDS } from "next/dist/lib/constants.js";

globalThis.AsyncLocalStorage = AsyncLocalStorage;
let now = 0;
const entries = new Map();
// Exercise Next's real cache wrapper with a deterministic cache backend.
globalThis.__incrementalCache = {
  generateCacheKey: async (key) => key,
  get: async (key, options) => {
    assert.equal(options.revalidate, false);
    const entry = entries.get(key);
    return entry ? { value: entry.value, isStale: now >= entry.expires } : null;
  },
  set: async (key, value, options) => {
    // Next serializes its no-timed-revalidation option using this sentinel.
    assert.equal(value.revalidate, CACHE_ONE_YEAR_SECONDS);
    assert.deepEqual(options.tags, ["public-site-content"]);
    entries.set(key, { value, expires: now + value.revalidate });
  },
};
globalThis.cacheTestReads = 0;
const reader = 'data:text/javascript,' + encodeURIComponent('export async function getSiteContent(){globalThis.cacheTestReads++; return {revision:globalThis.cacheTestReads}}');
let js = ts.transpileModule(readFileSync("db/public-content.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
js = js.replace('"next/cache"', JSON.stringify(pathToFileURL(`${process.cwd()}/node_modules/next/cache.js`).href)).replace('"./content"', JSON.stringify(reader));
const { getPublicSiteContent } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
assert.deepEqual(await getPublicSiteContent(), { revision: 1 });
assert.deepEqual(await getPublicSiteContent(), { revision: 1 });
assert.equal(globalThis.cacheTestReads, 1);
now = 60 * 60 * 24 * 30;
assert.deepEqual(await getPublicSiteContent(), { revision: 1 });
assert.equal(globalThis.cacheTestReads, 1);
entries.clear(); // Backend expiration forces the next read, just like tag expiration.
assert.deepEqual(await getPublicSiteContent(), { revision: 2 });
console.log("Real Next cache wrapper: timed revalidation disabled, reuse after 30 days, and refresh after invalidation passed.");

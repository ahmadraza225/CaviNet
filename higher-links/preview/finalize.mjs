// Turns preview/dist/index.html into a page fragment (no doctype/html/head/body)
// for hosts that supply their own document skeleton.
import { readFileSync, writeFileSync } from "node:fs";

const file = new URL("./dist/index.html", import.meta.url);
const html = readFileSync(file, "utf8");
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? "";

const keep = (re) => [...head.matchAll(re)].map((m) => m[0]);
const title = keep(/<title>[\s\S]*?<\/title>/gi);
const links = keep(/<link[^>]+>/gi).filter((l) => !/rel="icon"/.test(l));
const styles = keep(/<style[\s\S]*?<\/style>/gi);
const scripts = keep(/<script[\s\S]*?<\/script>/gi);

const out = [...title, ...links, ...styles, body.trim(), ...scripts].join("\n");
writeFileSync(new URL("./dist/higher-links.html", import.meta.url), out + "\n");
console.log(`preview/dist/higher-links.html  ${(out.length / 1024).toFixed(0)} KB`);

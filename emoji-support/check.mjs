// プラットフォーム標準フォントだけで絵文字がどこまで表示できるかを調べる。
// Webフォントは使わず、ブラウザーの初期設定のフォントフォールバックに任せる。
//
// 使い方: node check.mjs <chromium|firefox|webkit> [emoji-test.txt] [出力ディレクトリ]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium, firefox, webkit } from "playwright";

const [browserName = "chromium", testFile = "emoji-test.txt", outRoot = "out"] =
  process.argv.slice(2);
const platform = process.env.PLATFORM_LABEL ?? `${process.platform}-${os.release()}`;
const label = `${platform}-${browserName}`;
const outDir = path.join(outRoot, label);
await mkdir(outDir, { recursive: true });

// emoji-test.txt から fully-qualified の絵文字を抽出する
const text = await readFile(testFile, "utf8");
const unicodeVersion = text.match(/^# Version: (.+)$/m)?.[1];
const emojis = [];
let group = "";
let subgroup = "";
for (const line of text.split("\n")) {
  let m;
  if ((m = line.match(/^# group: (.+)/))) group = m[1];
  else if ((m = line.match(/^# subgroup: (.+)/))) subgroup = m[1];
  else if (
    (m = line.match(/^([0-9A-F ]+?)\s*;\s*fully-qualified\s*#\s*(\S+)\s+E(\d+\.\d+)\s+(.+)$/))
  ) {
    emojis.push({
      cp: m[1],
      emoji: String.fromCodePoint(...m[1].split(" ").map((h) => parseInt(h, 16))),
      version: m[3],
      name: m[4],
      group,
      subgroup,
    });
  }
}

const browserType = { chromium, firefox, webkit }[browserName];
const browser = await browserType.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.setContent(
  `<!doctype html><meta charset="utf-8"><title>emoji</title><body></body>`,
);

// 判定:
//  1. 同じ文字列を fillStyle を変えて2回 canvas に描く。カラー絵文字グリフは fillStyle を無視するので
//     両者が一致すれば「カラー絵文字として描画された」。豆腐やモノクロのテキストグリフは色が変わる。
//  2. 幅が基準絵文字 (😀) の1.4倍を超えたら、ZWJ合成や国旗が成立せず部品に分解されたとみなす。
const results = await page.evaluate(async (list) => {
  const family = getComputedStyle(document.body).fontFamily; // 初期設定のフォント
  const size = 40;
  const W = size * 4;
  const H = size * 2;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.font = `${size}px ${family}`;
  ctx.textBaseline = "middle";
  const draw = (s, color) => {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = color;
    ctx.fillText(s, 4, H / 2);
    return ctx.getImageData(0, 0, W, H).data;
  };
  const probe = (s) => {
    const a = draw(s, "#ff0000");
    const b = draw(s, "#0000ff");
    let ink = 0;
    let diff = 0;
    for (let i = 0; i < a.length; i += 4) {
      if (a[i + 3] > 32 || b[i + 3] > 32) {
        ink++;
        if (
          Math.abs(a[i] - b[i]) > 24 ||
          Math.abs(a[i + 1] - b[i + 1]) > 24 ||
          Math.abs(a[i + 2] - b[i + 2]) > 24
        )
          diff++;
      }
    }
    return { ink, colorGlyph: ink > 0 && diff / ink < 0.02, width: ctx.measureText(s).width };
  };
  const ref = probe("\u{1F600}");
  return {
    family,
    ref,
    items: list.map((e) => {
      const p = probe(e.emoji);
      const ratio = p.width / ref.width;
      const status = !p.ink
        ? "blank"
        : !p.colorGlyph
          ? "tofu_or_mono"
          : ratio > 1.4
            ? "split"
            : "ok";
      return { ...e, status, ratio: Math.round(ratio * 100) / 100 };
    }),
  };
}, emojis);

// バージョン別集計
const byVersion = {};
for (const r of results.items) {
  const v = (byVersion[r.version] ??= { total: 0, ok: 0, split: 0, tofu_or_mono: 0, blank: 0 });
  v.total++;
  v[r.status]++;
}

const summary = {
  label,
  platform,
  browser: browserName,
  browserVersion: browser.version(),
  os: `${os.type()} ${os.release()} ${os.arch()}`,
  unicodeEmojiVersion: unicodeVersion,
  defaultFontFamily: results.family,
  reference: results.ref,
  byVersion,
};
await writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
await writeFile(path.join(outDir, "results.json"), JSON.stringify(results.items));

// 目視確認用ページ。初期フォントのまま描画し、判定NGは赤枠で示す。
const esc = (s) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
const sortedVersions = Object.keys(byVersion).sort((a, b) => parseFloat(b) - parseFloat(a));
const section = (v) => {
  const items = results.items.filter((r) => r.version === v);
  const s = byVersion[v];
  return `<h2>Emoji ${v} — ${s.ok}/${s.total} ok</h2><div class="g">${items
    .map(
      (r) =>
        `<span class="${r.status}" title="${esc(`${r.cp} ${r.name} [${r.status}]`)}">${r.emoji}</span>`,
    )
    .join("")}</div>`;
};
const html = (versions, extra = "") => `<!doctype html><meta charset="utf-8">
<style>
  body { margin: 12px; }
  h1, h2 { font: bold 16px system-ui; margin: 12px 0 4px; }
  .g { display: flex; flex-wrap: wrap; font-size: 32px; line-height: 1.25; }
  .g span { min-width: 44px; text-align: center; border: 2px solid transparent; }
  .g .split { border-color: orange; }
  .g .tofu_or_mono, .g .blank { border-color: red; }
  .big { font-size: 64px; }
</style>
<h1>${esc(label)} / ${esc(summary.browserVersion)} / default font: ${esc(results.family)}</h1>
<p style="font:13px system-ui">赤枠 = 豆腐またはモノクロ / 橙枠 = 合成されず分解表示</p>
${extra}${versions.map(section).join("")}`;

const flags = ["🇯🇵", "🇺🇸", "🇺🇳", "🇪🇺", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🏴󠁧󠁢󠁥󠁮󠁧󠁿"];
const highlight = `<h2>Flags</h2><div class="big">${flags.join(" ")}</div>
<h2>Emoji ${sortedVersions[0]} (latest)</h2><div class="big">${results.items
  .filter((r) => r.version === sortedVersions[0])
  .map((r) => r.emoji)
  .join(" ")}</div>`;

await page.setContent(
  html(sortedVersions.filter((v) => parseFloat(v) >= 13), highlight),
);
await page.screenshot({ path: path.join(outDir, "recent.png"), fullPage: true });
await page.setContent(html(sortedVersions));
await page.screenshot({ path: path.join(outDir, "all.png"), fullPage: true });

await browser.close();

console.log(`${label} (${summary.browserVersion}) font=${results.family}`);
for (const v of sortedVersions) {
  const s = byVersion[v];
  console.log(
    `E${v.padEnd(5)} ok ${String(s.ok).padStart(4)}/${String(s.total).padEnd(4)} split ${s.split} tofu/mono ${s.tofu_or_mono} blank ${s.blank}`,
  );
}

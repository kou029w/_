// 各ジョブの summary.json / results.json を集めて Markdown のレポートを作る。
// 使い方: node report.mjs <out ディレクトリ> > report.md
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.argv[2] ?? "out";
const runs = [];
for (const dir of (await readdir(root, { recursive: true })).filter((f) =>
  f.endsWith("summary.json"),
)) {
  const d = path.join(root, path.dirname(dir));
  runs.push({
    summary: JSON.parse(await readFile(path.join(d, "summary.json"), "utf8")),
    items: JSON.parse(await readFile(path.join(d, "results.json"), "utf8")),
  });
}
runs.sort((a, b) => a.summary.label.localeCompare(b.summary.label));

const versions = [...new Set(runs.flatMap((r) => Object.keys(r.summary.byVersion)))].sort(
  (a, b) => parseFloat(b) - parseFloat(a),
);

const out = [];
out.push(`# 絵文字表示サポート (Unicode Emoji ${runs[0]?.summary.unicodeEmojiVersion})`);
out.push("");
out.push("プラットフォーム標準フォント・ブラウザー初期設定、Webフォントなし。数値は ok / 総数。");
out.push("");
out.push(`| Emoji | ${runs.map((r) => r.summary.label).join(" | ")} |`);
out.push(`|---|${runs.map(() => "---:").join("|")}|`);
for (const v of versions) {
  out.push(
    `| ${v} | ${runs
      .map((r) => {
        const s = r.summary.byVersion[v];
        if (!s) return "-";
        const pct = Math.round((s.ok / s.total) * 100);
        const mark = pct === 100 ? "✅" : pct === 0 ? "❌" : "⚠️";
        return `${mark} ${s.ok}/${s.total}`;
      })
      .join(" | ")} |`,
  );
}

const pick = (r, test) => r.items.find(test);
out.push("");
out.push("## 代表例");
out.push("");
const samples = [
  ["🇯🇵 国旗", (e) => e.cp === "1F1EF 1F1F5"],
  ["🏳️‍🌈 ZWJ旗", (e) => e.cp === "1F3F3 FE0F 200D 1F308"],
  ["🏴󠁧󠁢󠁥󠁮󠁧󠁿 タグ旗", (e) => e.cp.startsWith("1F3F4 E0067")],
];
out.push(`| 例 | ${runs.map((r) => r.summary.label).join(" | ")} |`);
out.push(`|---|${runs.map(() => "---").join("|")}|`);
for (const [name, test] of samples) {
  out.push(`| ${name} | ${runs.map((r) => pick(r, test)?.status ?? "-").join(" | ")} |`);
}

out.push("");
out.push("## 環境");
out.push("");
out.push("| label | browser | OS | default font |");
out.push("|---|---|---|---|");
for (const { summary: s } of runs) {
  out.push(`| ${s.label} | ${s.browser} ${s.browserVersion} | ${s.os} | \`${s.defaultFontFamily}\` |`);
}

out.push("");
out.push("## 表示できなかった絵文字 (Emoji 15.0 以降)");
for (const r of runs) {
  const ng = r.items.filter((e) => parseFloat(e.version) >= 15 && e.status !== "ok");
  out.push("");
  out.push(`<details><summary>${r.summary.label}: ${ng.length} 件</summary>`);
  out.push("");
  for (const e of ng) out.push(`- E${e.version} ${e.emoji} \`${e.cp}\` ${e.name} — ${e.status}`);
  out.push("");
  out.push("</details>");
}

console.log(out.join("\n"));

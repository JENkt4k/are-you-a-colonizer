import { writeFileSync } from "node:fs";
import { classifyHistorical } from "../src/history/classify";
import type { Answers } from "../src/history/types";

const tri: ("yes"|"no"|"unknown")[] = ["yes","no","unknown"];
const rows: string[] = [];
rows.push([
  "indigenous","forced","arrived","participation","post_entrench","origin_after",
  "code","label"
].join(","));

for (const indigenous_lineage of tri)
for (const enslaved_or_forced of tri)
for (const arrived_during_colonial of tri)
for (const direct_participation of tri)
for (const post_entrenchment of tri)
for (const origin_colonized_after_left of tri) {
  const a: Answers = { indigenous_lineage, enslaved_or_forced, arrived_during_colonial,
    direct_participation, post_entrenchment, origin_colonized_after_left };
  const r = classifyHistorical(a);
  rows.push([indigenous_lineage,enslaved_or_forced,arrived_during_colonial,
    direct_participation,post_entrenchment,origin_colonized_after_left,r.code,r.label.replace(/,/g,";")
  ].join(","));
}

writeFileSync("historical-map.csv", rows.join("\n"));
console.log("Wrote historical-map.csv");

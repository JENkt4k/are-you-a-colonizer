import { writeFileSync } from "node:fs";
import { scoreWoke } from "../src/woke/score";
import type { WokeAnswers } from "../src/woke/types";

const tri: ("yes"|"no"|"unknown")[] = ["yes","no","unknown"];
const motives = ["opportunity","mixed","survival","unknown"] as const;
const infra = [0,1,2,3,4] as const;

const rows: string[] = [];
rows.push([
  "wealth","role","constrained","compelled","noBenefit","motive","infra",
  "code","B","T","flags"
].join(","));

for (const wealth_extractive of tri)
for (const role_extractive of tri)
for (const constrained of tri)
for (const compelled_lineage of tri)
for (const no_benefit_from_settlers of tri)
for (const migration_motive of motives)
for (const i of infra) {
  const a: WokeAnswers = { wealth_extractive, role_extractive, constrained,
    compelled_lineage, no_benefit_from_settlers, migration_motive, infra2: i };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = scoreWoke(a) as any;
  rows.push([
    wealth_extractive, role_extractive, constrained, compelled_lineage, no_benefit_from_settlers,
    migration_motive, String(i), r.code, String(r.B), String(r.T),
    JSON.stringify(r.flags || {}).replace(/,/g,";")
  ].join(","));
}

writeFileSync("woke-map.csv", rows.join("\n"));
console.log("Wrote woke-map.csv");

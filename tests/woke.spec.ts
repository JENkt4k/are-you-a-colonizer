import { describe, it, expect } from "vitest";
import { scoreWoke } from "../src/woke/score";
import type { WokeAnswers } from "../src/woke/types";

const tri: ("yes"|"no"|"unknown")[] = ["yes","no","unknown"];
const motives = ["opportunity","mixed","survival","unknown"] as const;
const infra = [0,1,2,3,4] as const;

function* allWoke(): Generator<WokeAnswers> {
  for (const wealth_extractive of tri)
  for (const role_extractive of tri)
  for (const constrained of tri)
  for (const compelled_lineage of tri)
  for (const no_benefit_from_settlers of tri)
  for (const migration_motive of motives)
  for (const i of infra) {
    yield { wealth_extractive, role_extractive, constrained, compelled_lineage,
            no_benefit_from_settlers, migration_motive, infra2: i };
  }
}

describe("Woke classifier – motive red flag & invariants", () => {
  it("opportunity+makes-extraction => EXPLOITER (deterministic red-flag)", () => {
    const a: WokeAnswers = {
      wealth_extractive: "yes", role_extractive: "no",
      constrained: "no", compelled_lineage: "no",
      no_benefit_from_settlers: "no", migration_motive: "opportunity", infra2: 2
    };
    expect(scoreWoke(a).code).toBe("EXPLOITER");
  });

  it("opportunity without extraction => Beneficiary with motive badge", () => {
    const a: WokeAnswers = {
      wealth_extractive: "no", role_extractive: "no",
      constrained: "no", compelled_lineage: "no",
      no_benefit_from_settlers: "no", migration_motive: "opportunity", infra2: 2
    };
    const r = scoreWoke(a);
    expect(r.code === "BENEFICIARY" || r.code === "PARTICIPANT").toBe(true);
    expect(r.flags?.motiveOnlyFlag).toBe(true);
  });

  it("survival motive + constraints tend to COMPELLED/PARTICIPANT", () => {
    const a: WokeAnswers = {
      wealth_extractive: "no", role_extractive: "no",
      constrained: "yes", compelled_lineage: "yes",
      no_benefit_from_settlers: "no", migration_motive: "survival", infra2: 2
    };
    const r = scoreWoke(a);
    expect(["COMPELLED","PARTICIPANT"].includes(r.code)).toBe(true);
  });

  it("whole state space reachable", () => {
    const seen = new Set<string>();
    for (const a of allWoke()) seen.add(scoreWoke(a).code);
    for (const k of ["EXPLOITER","BENEFICIARY","COMPELLED","PARTICIPANT"]) {
      expect(seen.has(k)).toBe(true);
    }
  });
});

import { describe, it, expect } from "vitest";
import { classifyHistorical } from "../src/history/classify";
import type { Answers } from "../src/history/types";

const tri: ("yes"|"no"|"unknown")[] = ["yes","no","unknown"];

function* allHistorical(): Generator<Answers> {
  for (const indigenous_lineage of tri)
  for (const enslaved_or_forced of tri)
  for (const arrived_during_colonial of tri)
  for (const direct_participation of tri)
  for (const post_entrenchment of tri)
  for (const origin_colonized_after_left of tri) {
    yield { indigenous_lineage, enslaved_or_forced, arrived_during_colonial,
            direct_participation, post_entrenchment, origin_colonized_after_left };
  }
}

describe("Historical classifier – precedence & reachability", () => {
  it("forced migration overrides everything", () => {
    for (const a of allHistorical()) {
      const b = { ...a, enslaved_or_forced: "yes" as const };
      const r = classifyHistorical(b);
      expect(r.code).toBe("FORCED");
    }
  });

  it("indigenous precedence over others (when not forced)", () => {
    for (const a of allHistorical()) {
      if (a.enslaved_or_forced === "yes") continue;
      const b = { ...a, indigenous_lineage: "yes" as const };
      const r = classifyHistorical(b);
      expect(r.code).toBe("INDIGENOUS");
    }
  });

  it("participation OR colonial-arrival rules hit colonizer paths", () => {
    // arrived yes & (participated yes/unknown) -> COLONIZER_FOUNDATIONAL
    {
      const a: Answers = {
        indigenous_lineage: "no",
        enslaved_or_forced: "no",
        arrived_during_colonial: "yes",
        direct_participation: "unknown",
        post_entrenchment: "unknown",
        origin_colonized_after_left: "unknown",
      };
      expect(classifyHistorical(a).code).toBe("COLONIZER_FOUNDATIONAL");
    }
    // arrived yes & participated no -> COLONIZER_ARRIVAL
    {
      const a: Answers = {
        indigenous_lineage: "no", enslaved_or_forced: "no",
        arrived_during_colonial: "yes", direct_participation: "no",
        post_entrenchment: "unknown", origin_colonized_after_left: "unknown",
      };
      expect(classifyHistorical(a).code).toBe("COLONIZER_ARRIVAL");
    }
    // arrived no & participated yes -> COLONIZER_PARTICIPATORY
    {
      const a: Answers = {
        indigenous_lineage: "no", enslaved_or_forced: "no",
        arrived_during_colonial: "no", direct_participation: "yes",
        post_entrenchment: "unknown", origin_colonized_after_left: "unknown",
      };
      expect(classifyHistorical(a).code).toBe("COLONIZER_PARTICIPATORY");
    }
  });

  it("immigrant branches when not colonizer/forced/indigenous", () => {
    const a: Answers = {
      indigenous_lineage: "no", enslaved_or_forced: "no",
      arrived_during_colonial: "no", direct_participation: "no",
      post_entrenchment: "yes", origin_colonized_after_left: "no",
    };
    expect(classifyHistorical(a).code).toBe("IMMIGRANT_ENTRENCHED");
  });

  it("full space is reachable (sanity distribution)", () => {
    const counts = new Map<string, number>();
    for (const a of allHistorical()) {
      const r = classifyHistorical(a);
      counts.set(r.code, (counts.get(r.code) ?? 0) + 1);
    }
    // All key codes should appear at least once
    for (const k of [
      "INDIGENOUS","FORCED",
      "COLONIZER_FOUNDATIONAL","COLONIZER_ARRIVAL","COLONIZER_PARTICIPATORY",
      "IMMIGRANT_ENTRENCHED","IMMIGRANT_ORIGIN_LATER","INCONCLUSIVE"
    ]) {
      expect(counts.get(k)).toBeGreaterThan(0);
    }
  });
});

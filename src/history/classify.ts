import type { Answers } from "./types";

export function classifyHistorical(a: Answers) {
  const y = (k: keyof Answers) => a[k] === "yes";
  const n = (k: keyof Answers) => a[k] === "no";
  const u = (k: keyof Answers) => a[k] === "unknown" || a[k] === undefined;

  // Indigenous takes precedence (belongs to a colonized nation)
  if (y("indigenous_lineage")) {
    return {
      label: "Indigenous (sovereignty-centered)",
      explanation:
        "Belongs to an Indigenous nation; analysis centers sovereignty and ongoing colonial impacts.",
      color: "bg-sky-50 border-sky-200",
      code: "INDIGENOUS",
    } as const;
  }

  // Forced migration overrides everything
  if (y("enslaved_or_forced")) {
    return {
      label: "Enslaved / Forced Migration (distinct category)",
      explanation:
        "Lineage transported without agency; not colonizer or immigrant. Historical harms differ categorically.",
      color: "bg-amber-50 border-amber-200",
      code: "FORCED",
    } as const;
  }

  // Colonizer logic — combine arrival and/or participation
  const arrived = y("arrived_during_colonial");
  const participated = y("direct_participation");
  const partUnknown = u("direct_participation");

  if (arrived && (participated || partUnknown)) {
    return {
      label: "Colonizer (foundational/participatory)",
      explanation:
        "Arrival during the colonial project plus material enablement/enforcement (or plausible benefit).",
      color: "bg-red-50 border-red-200",
      code: "COLONIZER_FOUNDATIONAL",
    } as const;
  }

  if (arrived && n("direct_participation")) {
    return {
      label: "Colonizer (arrival during colonial period)",
      explanation:
        "Arrival occurred while colonization was ongoing; part of settler expansion even without office.",
      color: "bg-rose-50 border-rose-200",
      code: "COLONIZER_ARRIVAL",
    } as const;
  }

  if (!arrived && participated) {
    return {
      label: "Colonizer (participatory without arrival timing)",
      explanation:
        "Direct material enablement/enforcement counts even if arrival occurred later or timing is unknown.",
      color: "bg-rose-50 border-rose-200",
      code: "COLONIZER_PARTICIPATORY",
    } as const;
  }

  // Immigrant branches
  if (y("post_entrenchment")) {
    return {
      label: "Immigrant (to a settler-colonial state)",
      explanation:
        "Arrival after colonial structures were entrenched or post-independence; not founder/enforcer.",
      color: "bg-green-50 border-green-200",
      code: "IMMIGRANT_ENTRENCHED",
    } as const;
  }

  if (y("origin_colonized_after_left")) {
    return {
      label: "Immigrant (origin colonized elsewhere later)",
      explanation:
        "Origin colonized others only after ancestors left; lineage not implicated.",
      color: "bg-emerald-50 border-emerald-200",
      code: "IMMIGRANT_ORIGIN_LATER",
    } as const;
  }

  return {
    label: "Inconclusive (need more data)",
    explanation:
      "Add dates/locations, legal status, roles. Colonial period boundaries vary by region.",
    color: "bg-slate-50 border-slate-200",
    code: "INCONCLUSIVE",
  } as const;
}

import type { WokeAnswers } from "./types";

export function scoreWoke(a: WokeAnswers) {
  let B = 0; // Benefit/Extraction score

  const wealthYes = a.wealth_extractive === "yes";
  const roleYes = a.role_extractive === "yes";

  // Extractive benefits/roles
  if (wealthYes) B += 2;
  if (roleYes)   B += 2;

  // Constraints & compelled histories
  if (a.constrained === "yes") B -= 2;
  if (a.compelled_lineage === "yes") B -= 2;
  if (a.no_benefit_from_settlers === "yes") B -= 1;

  // Motive (opportunity vs survival)
  // Stronger emphasis per your request:
  if (a.migration_motive === "opportunity") B += 2;  // was +1
  else if (a.migration_motive === "survival") B -= 2;
  else if (a.migration_motive === "mixed") B -= 1;

  B = Math.max(-4, Math.min(6, B));
  const T = a.infra2 ?? 2; // Transformation stance 0–4

  // --- Red-flag colonizer by motive (deterministic) -----------------
  const motiveColonizer = a.migration_motive === "opportunity" && (wealthYes || roleYes);

  // --- Classification mapping ---------------------------------------
  if (motiveColonizer || (B >= 3 && T <= 1)) {
    return {
      code: "EXPLOITER",
      label: "Present-Day Colonizer (Exploitative Actor)",
      explanation:
        motiveColonizer
          ? "Elective immigration for advantage paired with extractive benefit/role."
          : "High extractive benefit with low support for transformation.",
      color: "bg-fuchsia-50 border-fuchsia-200",
      B, T,
      flags: { motiveColonizer, motiveOnlyFlag: false }
    } as const;
  }

  if (B >= 2) {
    const motiveOnlyFlag = a.migration_motive === "opportunity" && !wealthYes && !roleYes;
    return {
      code: "BENEFICIARY",
      label: "Inherited Beneficiary",
      explanation:
        "Material advantages without clear extraction or enforced roles; consider supporting transformation.",
      color: "bg-indigo-50 border-indigo-200",
      B, T,
      flags: { motiveColonizer: false, motiveOnlyFlag } // <-- add warning badge
    } as const;
  }

  if (B <= -2) {
    return {
      code: "COMPELLED",
      label: "Compelled Participant / Survivor",
      explanation:
        "Participation under historical disadvantage or survival constraints (including migration under duress).",
      color: "bg-amber-50 border-amber-200",
      B, T,
      flags: { motiveColonizer: false, motiveOnlyFlag: false }
    } as const;
  }

  return {
    code: "PARTICIPANT",
    label: "Participant Under Constraint",
    explanation:
      "Surviving inside the system without extractive benefit is not colonization.",
    color: "bg-slate-50 border-slate-200",
    B, T,
    flags: { motiveColonizer: false, motiveOnlyFlag: false }
  } as const;
}

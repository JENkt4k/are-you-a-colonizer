import type { WokeAnswers } from "./types";

export function scoreWoke(a: WokeAnswers) {
  let B = 0; // Benefit/Extraction
  if (a.wealth_extractive === "yes") B += 2;
  if (a.role_extractive === "yes") B += 2;
  if (a.constrained === "yes") B -= 2;
  if (a.compelled_lineage === "yes") B -= 2;
  if (a.no_benefit_from_settlers === "yes") B -= 1;
  B = Math.max(-3, Math.min(4, B));
  const T = a.infra2 ?? 2; // Transformation stance

  if (B >= 3 && T <= 1)
    return {
      code: "EXPLOITER",
      label: "Present-Day Colonizer (Exploitative Actor)",
      explanation:
        "High extractive benefit with low support for transforming the system.",
      color: "bg-fuchsia-50 border-fuchsia-200",
      B,
      T,
    } as const;

  if (B >= 2)
    return {
      code: "BENEFICIARY",
      label: "Inherited Beneficiary",
      explanation:
        "Material benefits derive from property/extraction; consider supporting transformation.",
      color: "bg-indigo-50 border-indigo-200",
      B,
      T,
    } as const;

  if (B <= -2)
    return {
      code: "COMPELLED",
      label: "Compelled Participant / Survivor",
      explanation:
        "Participation under historical disadvantage or survival constraints.",
      color: "bg-amber-50 border-amber-200",
      B,
      T,
    } as const;

  return {
    code: "PARTICIPANT",
    label: "Participant Under Constraint",
    explanation:
      "Surviving inside the system without extractive benefit is not colonization.",
    color: "bg-slate-50 border-slate-200",
    B,
    T,
  } as const;
}

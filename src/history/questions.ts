import type { Answer } from "./types";

export const QUESTIONS: {
  id:
    | "indigenous_lineage"
    | "enslaved_or_forced"
    | "arrived_during_colonial"
    | "direct_participation"
    | "post_entrenchment"
    | "origin_colonized_after_left";
  q: string;
  help: string;
}[] = [
  {
    id: "indigenous_lineage",
    q: "Do you have Indigenous lineage tied to this land (citizenship/membership/kinship recognized by the nation/community)?",
    help:
      "Affiliation may include citizenship or community-recognized kinship with the Indigenous nation.",
  },
  {
    id: "enslaved_or_forced",
    q: "Were your ancestors enslaved, indentured under coercive terms, or forcibly transported?",
    help: "Forced migration is treated as a distinct category.",
  },
  {
    id: "arrived_during_colonial",
    q: "Did direct ancestors arrive during an active colonial period (settlement, land seizure, foreign rule)?",
    help:
      "Example (US mainland British settler colonization): ~1607–1776; ranges vary by region.",
  },
  {
    id: "direct_participation",
    q: "Did those ancestors materially enable or enforce colonization (land grants, militia, administration, capital)?",
    help:
      "Participation/enrichment counts even if arrival timing is uncertain.",
  },
  {
    id: "post_entrenchment",
    q: "If arrival was later, did it occur only after independence or after colonial structures were fully entrenched?",
    help: "E.g., immigrated to an already-formed settler state.",
  },
  {
    id: "origin_colonized_after_left",
    q: "Did the origin country start its own external colonization only after your ancestors had emigrated?",
    help:
      "If colonization began later, the lineage is not implicated in those ventures.",
  },
];

export type AnswerValue = Answer | undefined;

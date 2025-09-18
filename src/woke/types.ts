export type Tri = "yes" | "no" | "unknown";

export type Motive = "opportunity" | "mixed" | "survival" | "unknown";

export type WokeAnswers = Partial<{
  wealth_extractive: Tri;          // W1
  role_extractive: Tri;            // W2
  constrained: Tri;                // W3
  compelled_lineage: Tri;          // W4
  no_benefit_from_settlers: Tri;   // W5
  infra2: 0 | 1 | 2 | 3 | 4;       // W6
  migration_motive: Motive;        // W7 (NEW): if immigrant, was entry elective for gain or constrained for survival?
}>;

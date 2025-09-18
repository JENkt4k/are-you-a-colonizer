export type Tri = "yes" | "no" | "unknown";

export type WokeAnswers = Partial<{
  wealth_extractive: Tri;          // W1: inherited/ongoing wealth from property/speculation/resource rights
  role_extractive: Tri;            // W2: decision-making roles in lending/landlord/dev/extraction/insurance
  constrained: Tri;                // W3: paycheck-to-paycheck, no significant inheritance, heavy burdens
  compelled_lineage: Tri;          // W4: enslavement/indenture/famine/genocide survival migration
  no_benefit_from_settlers: Tri;   // W5: ancestor settlers but no material benefit reached this line
  infra2: 0 | 1 | 2 | 3 | 4;       // W6: stance on Infrastructure 2.0 (0 oppose … 4 strongly support)
}>;

export type Answer = "yes" | "no" | "unknown";

export type Answers = Partial<{
  indigenous_lineage: Answer;
  enslaved_or_forced: Answer;
  arrived_during_colonial: Answer;
  direct_participation: Answer;
  post_entrenchment: Answer;
  origin_colonized_after_left: Answer;
}>;

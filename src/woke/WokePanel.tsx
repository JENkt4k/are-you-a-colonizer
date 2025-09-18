import { useMemo } from "react";
import type { WokeAnswers, Tri } from "./types";
import { scoreWoke } from "./score";
import { RadioRow } from "../components/RadioRow";
import { SectionCard } from "../components/SectionCard";

export function WokePanel({
  value,
  onChange,
}: {
  value: WokeAnswers;
  onChange: (patch: Partial<WokeAnswers>) => void;
}) {
  const result = useMemo(() => scoreWoke(value), [value]);

  return (
    <div className="space-y-4">
      <SectionCard
        title="Bonus Game: Woke Edition"
        note="Playful present-day framing: we distinguish extraction from survival. We do not judge by ancestry or skin color. What matters is whether benefits come from property/extraction vs. labor, your constraints, and your stance on Infrastructure 2.0 (decoupling life support from land so more land returns to wildlife)."
        className={`${result.color}`}
      >
        <div className="text-sm text-slate-700">
          <p>
            <span className="font-medium">{result.label}</span> — {result.explanation}
          </p>
          {result.T >= 3 && (
            <p className="mt-2 inline-block rounded-lg border px-2 py-1 text-xs bg-white">
              Badge: <strong>Transformation Ally (Infra 2.0)</strong>
            </p>
          )}
        </div>
      </SectionCard>

      <div className="grid md:grid-cols-2 gap-4">
        <SectionCard
          title="W1. Source of (Family) Wealth"
          note="Any meaningful inherited wealth or current income from property speculation/rent extraction, land grants, or resource rights (oil/mining/water/forestry)?"
        >
          <RadioRow
            name="wealth_extractive"
            value={value.wealth_extractive}
            onChange={(v: Tri) => onChange({ wealth_extractive: v })}
          />
        </SectionCard>

        <SectionCard
          title="W2. Direct Role in Extractive Institutions"
          note="You/parents/grandparents in decision-making/profit roles in lending, large-scale development, landlord portfolios, resource extraction, or insurance underwriting?"
        >
          <RadioRow
            name="role_extractive"
            value={value.role_extractive}
            onChange={(v: Tri) => onChange({ role_extractive: v })}
          />
        </SectionCard>

        <SectionCard
          title="W3. Participant Under Constraint"
          note="Paycheck-to-paycheck, no significant inheritance, heavy housing/medical/insurance/credit burdens?"
        >
          <RadioRow
            name="constrained"
            value={value.constrained}
            onChange={(v: Tri) => onChange({ constrained: v })}
          />
        </SectionCard>

        <SectionCard
          title="W4. Compelled Lineage"
          note="Lineage arrived due to enslavement, indenture, famine/genocide, or comparable survival duress?"
        >
          <RadioRow
            name="compelled_lineage"
            value={value.compelled_lineage}
            onChange={(v: Tri) => onChange({ compelled_lineage: v })}
          />
        </SectionCard>

        <SectionCard
          title="W5. Founding Ancestors Without Benefit"
          note="Ancestor settlers/officials but no land/wealth benefit reached your line (lost, confiscated, or never inherited)?"
        >
          <RadioRow
            name="no_benefit_from_settlers"
            value={value.no_benefit_from_settlers}
            onChange={(v: Tri) => onChange({ no_benefit_from_settlers: v })}
          />
        </SectionCard>

        <SectionCard
          title="W6. Infrastructure 2.0"
          note="Support decoupling housing/food/energy from private land ownership (vertical farms, stacked fabrication, commons utilities) to return significant land to wildlife?"
        >
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={4}
              value={value.infra2 ?? 2}
              onChange={(e) => onChange({ infra2: Number(e.currentTarget.value) as 0|1|2|3|4 })}
              className="w-full"
            />
            <span className="text-xs text-slate-600 w-28 text-right">
              {["Oppose","Skeptical","Neutral","Support","Strongly"][value.infra2 ?? 2]}
            </span>
          </div>
        </SectionCard>

        {/* NEW: W7 Migration Motive */}
        <SectionCard
          title="W7. Migration Motive (if immigrant)"
          note="If you immigrated (or your parents did), was entry mainly elective for financial opportunity, mixed, or driven by survival needs (war, famine, persecution, climate)?"
        >
          <div className="flex flex-wrap gap-3 items-center">
            {[
              ["opportunity","Opportunity"],
              ["mixed","Mixed"],
              ["survival","Survival"],
              ["unknown","Unknown"],
            ].map(([val, label]) => (
              <label key={val} className="inline-flex items-center gap-1">
                <input
                  type="radio"
                  className="accent-black"
                  name="migration_motive"
                  checked={value.migration_motive === (val as any)}
                  onChange={() => onChange({ migration_motive: val as any })}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

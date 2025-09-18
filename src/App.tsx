import { useMemo, useState } from "react";
import { SectionCard } from "./components/SectionCard";
import { RadioRow } from "./components/RadioRow";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { QUESTIONS } from "./history/questions";
import type { Answers } from "./history/types";
import { classifyHistorical } from "./history/classify";

import type { WokeAnswers } from "./woke/types";
import { WokePanel } from "./woke/WokePanel";

function ShareButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Intentionally ignore clipboard errors
    }
  };
  return (
    <button
      onClick={doCopy}
      className="px-3 py-2 rounded-xl border border-slate-300 shadow-sm hover:shadow"
      title="Copy a summary to clipboard"
    >
      {copied ? "Copied!" : "Copy Summary"}
    </button>
  );
}

export default function App() {
  // Historical state
  const [answers, setAnswers] = useLocalStorage<Answers>(
    "colonizer-app-answers-v3",
    {}
  );
  const hist = useMemo(() => classifyHistorical(answers), [answers]);

  // Woke panel state
  const [woke, setWoke] = useLocalStorage<WokeAnswers>(
    "colonizer-app-woke-v1",
    {}
  );

  const reset = () => setAnswers({});
  const shareText = useMemo(() => {
    const q = new URLSearchParams(
      Object.entries(answers)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return `Are You a Colonizer?\nHistorical: ${hist.label}\nAnswers: ${q || "(none)"}\nBonus (Woke): see in-app panel.`;
  }, [answers, hist.label]);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Are You a Colonizer?</h1>
          <a href="#about" className="text-sm underline decoration-dotted decoration-1">
            About
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Historical result */}
        <SectionCard className={`${hist.color}`} title="Result (Historical)">
          <p className="mt-1 text-sm text-slate-700">
            <span className="font-medium">{hist.label}</span> — {hist.explanation}
          </p>
          <p className="mt-2 text-xs text-slate-600">
            Scope: historical lineage and structural participation. This classifies position in systems; it isn't a moral score.
          </p>
        </SectionCard>

        {/* Historical questions */}
        <div className="mt-5 grid md:grid-cols-2 gap-4">
          {QUESTIONS.map((item) => (
            <SectionCard key={item.id} title={item.q} note={item.help}>
              <RadioRow
                name={item.id}
                value={answers[item.id]}
                onChange={(v) =>
                  setAnswers((s) => ({ ...s, [item.id]: v }))
                }
              />
            </SectionCard>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-2 flex-wrap">
          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl border border-slate-300 shadow-sm hover:shadow"
          >
            Reset Historical
          </button>
          <ShareButton text={shareText} />
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-200" />

        {/* Woke Edition: visually distinct, responsive */}
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="md:col-span-2">
            <WokePanel
              value={woke}
              onChange={(patch) => setWoke((s) => ({ ...s, ...patch }))}
            />
          </div>
        </div>

        <section id="about" className="mt-10 border-t pt-6 text-sm text-slate-700 space-y-3">
          <p>
            <strong>Historical definitions.</strong> Colonizer refers to lineages that
            arrived during and materially contributed to a colonial project. Immigrant refers
            to lineages arriving after entrenchment/independence. Forced migration is categorized separately.
          </p>
          <p>
            <strong>Woke Edition.</strong> Modern framing distinguishes <em>extractive benefit</em>
            (property/speculation/resource rights) from <em>survival participation</em> (wages, no inheritance),
            recognizes <em>non-benefited descendants</em>, and adds a stance on <em>Infrastructure 2.0</em> (decoupling
            life support from land; returning land to wildlife).
          </p>
        </section>

        <footer className="py-10 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Are You a Colonizer. Offline-ready once installed.</p>
        </footer>
      </main>
    </div>
  );
}

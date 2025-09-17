import { useMemo, useState, useEffect } from "react";


type Answer = "yes" | "no" | "unknown";

const QUESTIONS = [
  {
    id: "arrived_during_colonial",
    q: "Did any direct ancestors arrive in the territory during its active colonial period (e.g., initial settlement, land seizure, imposition of foreign rule)?",
    help: "Examples (US): ~1607–1776 for British settler colonization on the mainland; local ranges vary by region.",
  },
  {
    id: "direct_participation",
    q: "Did those ancestors directly participate in, materially enable, or legally enforce the colonial project (e.g., land grants, militia, administration)?",
    help: "Benefiting as an origin-layer settler, grantee, or colonial officer counts as participation.",
  },
  {
    id: "post_entrenchment",
    q: "If ancestors arrived later, did they arrive only after independence or after colonial structures were fully entrenched?",
    help: "E.g., immigrated to an already-formed settler state.",
  },
  {
    id: "enslaved_or_forced",
    q: "Were your ancestors enslaved, indentured under coercive terms, or forcibly transported (no meaningful agency)?",
    help: "Forced transport is categorized separately from colonizer/immigrant.",
  },
  {
    id: "origin_colonized_after_left",
    q: "Did the country of origin begin its own external colonization only after your ancestors had already emigrated?",
    help: "E.g., if Germany began colonial ventures after your family left, they did not participate in those ventures.",
  },
] as const;

type Answers = Partial<Record<(typeof QUESTIONS)[number]["id"], Answer>>;

function classify(a: Answers) {
  const y = (k: keyof Answers) => a[k] === "yes";

  if (y("enslaved_or_forced")) {
    return {
      label: "Enslaved / Forced Migration (distinct category)",
      explanation:
        "Lineage was transported without agency; this does not fit colonizer or immigrant. Historical harms differ categorically.",
      color: "bg-amber-50 border-amber-200",
    } as const;
  }

  if (y("arrived_during_colonial")) {
    if (y("direct_participation")) {
      return {
        label: "Colonizer (foundational/participatory)",
        explanation:
          "Ancestors arrived during the colonial project and materially enabled or enforced it.",
        color: "bg-red-50 border-red-200",
      } as const;
    }
    return {
      label: "Colonizer (arrival during colonial period)",
      explanation:
        "Ancestors arrived while colonization was ongoing. Even without formal office, they were part of settler expansion.",
      color: "bg-rose-50 border-rose-200",
    } as const;
  }

  if (y("post_entrenchment")) {
    return {
      label: "Immigrant (to a settler-colonial state)",
      explanation:
        "Arrival occurred after colonial structures were established or post-independence; did not found or enforce colonization.",
      color: "bg-green-50 border-green-200",
    } as const;
  }

  if (y("origin_colonized_after_left")) {
    return {
      label: "Immigrant (origin colonized elsewhere later)",
      explanation:
        "Country of origin undertook separate colonization only after your ancestors left; lineage not implicated in those ventures.",
      color: "bg-emerald-50 border-emerald-200",
    } as const;
  }

  return {
    label: "Inconclusive (need more data)",
    explanation:
      "Provide dates/locations of arrival, legal status, and roles. Local colonial period boundaries vary by region.",
    color: "bg-slate-50 border-slate-200",
  } as const;
}

function RadioRow({
  value,
  onChange,
  label,
}: {
  value: Answer | undefined;
  onChange: (v: Answer) => void;
  label: string;
}) {
  return (
    <div className="flex gap-3 items-center">
      {(["yes", "no", "unknown"] as Answer[]).map((opt) => (
        <label key={opt} className="inline-flex items-center gap-1">
          <input
            type="radio"
            className="accent-black"
            name={label}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span className="capitalize">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? (JSON.parse(s) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch { /* empty */ }
  }, [key, state]);
  return [state, setState] as const;
}

export default function App() {
  const [answers, setAnswers] = useLocalStorage<Answers>(
    "colonizer-app-answers",
    {}
  );

  const result = useMemo(() => classify(answers), [answers]);
  const reset = () => setAnswers({});

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">Are You a Colonizer?</h1>
          <a
            href="#about"
            className="text-sm underline decoration-dotted decoration-1"
          >
            About
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <section className={`border rounded-2xl p-4 mb-6 ${result.color}`}>
          <h2 className="text-lg font-semibold">Result</h2>
          <p className="mt-1 text-sm text-slate-700">
            <span className="font-medium">{result.label}</span> — {result.explanation}
          </p>
          <div className="mt-3 text-xs text-slate-600">
            <p>
              Note: This tool applies historical criteria. It does not assess personal
              beliefs or present-day ethics.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          {QUESTIONS.map((item) => (
            <div key={item.id} className="border rounded-2xl p-4">
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="text-sm text-slate-600">{item.help}</p>
                </div>
                <RadioRow
                  value={answers[item.id]}
                  onChange={(v) => setAnswers((s) => ({ ...s, [item.id]: v }))}
                  label={item.id}
                />
              </div>
            </div>
          ))}
        </section>

        <div className="mt-6 flex gap-2 flex-wrap">
          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl border border-slate-300 shadow-sm hover:shadow"
          >
            Reset
          </button>
          <ShareButton answers={answers} />
        </div>

        <section id="about" className="mt-10 border-t pt-6 text-sm text-slate-700 space-y-3">
          <p>
            <strong>Definitions used.</strong> Colonizer: lineage that arrived during and
            materially contributed to a colonial project (settler expansion, administration,
            or enforcement). Immigrant: lineage that arrived after colonial structures were
            entrenched or post-independence; not founders of the project. Forced migration
            is a distinct category.
          </p>
          <p>
            <strong>Regional variation.</strong> Colonial period boundaries vary by region
            (e.g., U.S. mainland British settler colonization roughly 1607–1776; other regions differ).
            For precise assessment, plug in specific places and dates.
          </p>
        </section>
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-10 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Are You a Colonizer. Offline-ready once installed.</p>
      </footer>
    </div>
  );
}

function ShareButton({ answers }: { answers: Answers }) {
  const [copied, setCopied] = useState(false);
  const text = useMemo(() => {
    const pairs = Object.entries(answers)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");
    const summary = `Are You a Colonizer? My answers: ${pairs || "(none)"}.`;
    return summary;
  }, [answers]);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* empty */ }
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

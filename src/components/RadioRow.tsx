import { memo } from "react";

export type Tri = "yes" | "no" | "unknown";

export const RadioRow = memo(function RadioRow({
  name,
  value,
  onChange,
  options = ["yes", "no", "unknown"],
}: {
  name: string;
  value?: Tri;
  onChange: (v: Tri) => void;
  options?: Tri[];
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {options.map((opt) => (
        <label key={opt} className="inline-flex items-center gap-1">
          <input
            type="radio"
            className="accent-black"
            name={name}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span className="capitalize">{opt}</span>
        </label>
      ))}
    </div>
  );
});

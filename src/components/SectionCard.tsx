import type { PropsWithChildren } from "react";

export function SectionCard({
  title,
  note,
  className = "",
  children,
}: PropsWithChildren<{ title?: string; note?: string; className?: string }>) {
  return (
    <section className={`border rounded-2xl p-4 ${className}`}>
      {title && <h3 className="font-semibold">{title}</h3>}
      {note && <p className="text-sm text-slate-600 mt-1">{note}</p>}
      <div className={title || note ? "mt-3" : ""}>{children}</div>
    </section>
  );
}

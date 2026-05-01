import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function Panel({
  title,
  icon,
  actions,
  className = "",
  children,
}: PanelProps) {
  return (
    <section
      className={`flex-1 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm ${className}`}
    >
      <header className="flex items-center justify-between gap-4 bg-gradient-to-r from-violet-100/70 via-slate-100 to-blue-50 px-6 py-4">
        <div className="flex items-center gap-3 text-lg font-semibold text-slate-700">
          {icon}
          <span>{title}</span>
        </div>
        {actions}
      </header>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
}

interface StatBarProps {
  label: string;
  leftValue: string;
  rightValue: string;
  centerValue: string;
  gradientClassName?: string;
}

export default function StatBar({
  label,
  leftValue,
  rightValue,
  centerValue,
  gradientClassName = "from-violet-500 via-indigo-500 to-slate-500",
}: StatBarProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-600">{label}</p>
      <div className="flex flex-wrap items-center gap-4">
        <span className="min-w-[72px] rounded-full bg-violet-100 px-4 py-2 text-center text-sm font-semibold text-violet-700">
          {leftValue}
        </span>
        <div className="relative h-10 flex-1 rounded-full bg-slate-100">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradientClassName}`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-white/80 px-4 py-1 text-xs font-semibold text-slate-700 shadow">
              {centerValue}
            </span>
          </div>
        </div>
        <span className="min-w-[72px] rounded-full bg-sky-100 px-4 py-2 text-center text-sm font-semibold text-sky-600">
          {rightValue}
        </span>
      </div>
    </div>
  );
}

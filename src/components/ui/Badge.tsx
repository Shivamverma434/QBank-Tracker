import type { ReactNode } from "react";

const variants = {
  lavender: "bg-violet-100 text-violet-700",
  sky: "bg-sky-100 text-sky-600",
  slate: "bg-slate-100 text-slate-600",
  indigo: "bg-indigo-600 text-white",
  violet: "bg-violet-600 text-white",
  blue: "bg-blue-600 text-white",
  softViolet: "bg-violet-50 text-violet-700",
  softBlue: "bg-blue-50 text-blue-700",
};

const sizes = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
};

interface BadgeProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

export default function Badge({
  children,
  variant = "slate",
  size = "md",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

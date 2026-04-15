import { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";

type RAGStatus = "victory" | "safe" | "danger" | "defeat";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: number; label: string };
  status: RAGStatus;
  formula?: { label: string; breakdown: string[] };
  icon?: React.ReactNode;
  lastUpdated?: string;
}

const statusBorder: Record<RAGStatus, string> = {
  victory: "border-victory/20 hover:border-victory/50",
  safe: "border-safe/20 hover:border-safe/50",
  danger: "border-danger/20 hover:border-danger/50",
  defeat: "border-defeat/20 hover:border-defeat/50",
};

const statusGlow: Record<RAGStatus, string> = {
  victory: "hover:shadow-[0_4px_20px_hsl(145_100%_32%/0.1)]",
  safe: "hover:shadow-[0_4px_20px_hsl(42_100%_42%/0.1)]",
  danger: "hover:shadow-[0_4px_20px_hsl(26_100%_45%/0.1)]",
  defeat: "hover:shadow-[0_4px_20px_hsl(0_100%_42%/0.1)]",
};

const statusStyles: Record<RAGStatus, string> = {
  victory: "rag-victory",
  safe: "rag-safe",
  danger: "rag-danger",
  defeat: "rag-defeat",
};

export function KPICard({ title, value, subtitle, trend, status, formula, icon, lastUpdated }: KPICardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative gradient-card rounded-lg border ${statusBorder[status]} ${statusGlow[status]} p-5 transition-all duration-300`}>
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-victory animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground">{lastUpdated || "LIVE"}</span>
      </div>

      <div className="flex items-start gap-3 mb-3">
        {icon && (
          <div className="p-2 rounded-md bg-saffron/10 text-saffron">
            {icon}
          </div>
        )}
        <div>
          <p className="text-xs font-heading tracking-wider text-muted-foreground uppercase">{title}</p>
          {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-3">
        <span className="text-3xl font-mono font-bold text-foreground font-mono-data">{value}</span>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-mono ${trend.value >= 0 ? 'text-victory' : 'text-defeat'}`}>
            {trend.value >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-heading tracking-wider uppercase ${statusStyles[status]}`}>
          {status === "victory" ? "✅ Victory Zone" : status === "safe" ? "⚠️ Safe Zone" : status === "danger" ? "🔶 Danger Zone" : "🔴 Defeat Zone"}
        </span>
        {formula && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[10px] text-saffron hover:text-saffron/80 transition-colors font-mono"
          >
            Show Math {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {formula && expanded && (
        <div className="mt-3 pt-3 border-t border-border animate-fade-in-up">
          <p className="text-[10px] font-heading tracking-wider text-saffron mb-2 uppercase">{formula.label}</p>
          <div className="space-y-1">
            {formula.breakdown.map((line, i) => (
              <p key={i} className="text-[11px] font-mono text-muted-foreground">{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { LucideIcon } from "lucide-react";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
  status?: "active" | "warning" | "critical" | "danger";
}

const statusDot: Record<string, string> = {
  active: "bg-victory",
  warning: "bg-safe",
  critical: "bg-defeat",
  danger: "bg-danger",
};

export function ModuleCard({ title, description, icon: Icon, count, status = "active" }: ModuleCardProps) {
  return (
    <button className="group relative gradient-card rounded-lg border border-border hover:border-saffron/40 p-4 text-left transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-md bg-saffron/10 text-saffron group-hover:bg-saffron/15 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1.5">
          {count !== undefined && (
            <span className="text-xs font-mono text-muted-foreground font-mono-data">{count.toLocaleString()}</span>
          )}
          <span className={`w-2 h-2 rounded-full ${statusDot[status]}`} />
        </div>
      </div>
      <h3 className="text-sm font-heading tracking-wider text-foreground mb-1">{title}</h3>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
}

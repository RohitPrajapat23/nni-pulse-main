type HierarchyLevel = "state" | "constituency" | "cluster" | "ward" | "mohalla" | "page";

interface HierarchyBadgeProps {
  level: HierarchyLevel;
  label: string;
}

const levelConfig: Record<HierarchyLevel, { color: string; bg: string; border: string }> = {
  state: { color: "text-level-state", bg: "bg-level-state/10", border: "border-level-state/30" },
  constituency: { color: "text-level-constituency", bg: "bg-level-constituency/10", border: "border-level-constituency/30" },
  cluster: { color: "text-level-cluster", bg: "bg-level-cluster/10", border: "border-level-cluster/30" },
  ward: { color: "text-level-ward", bg: "bg-level-ward/10", border: "border-level-ward/30" },
  mohalla: { color: "text-level-mohalla", bg: "bg-level-mohalla/10", border: "border-level-mohalla/30" },
  page: { color: "text-level-page", bg: "bg-level-page/10", border: "border-level-page/30" },
};

export function HierarchyBadge({ level, label }: HierarchyBadgeProps) {
  const config = levelConfig[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-heading tracking-wider uppercase border ${config.color} ${config.bg} ${config.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.bg.replace('/10', '')}`} style={{ backgroundColor: 'currentColor' }} />
      {label}
    </span>
  );
}

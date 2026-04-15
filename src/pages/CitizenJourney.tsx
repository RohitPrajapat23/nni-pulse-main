import { HierarchyBadge } from "@/components/HierarchyBadge";

const stages = [
  { name: "Aware", count: 269380, pct: 100, color: "bg-info" },
  { name: "Interested", count: 188566, pct: 70, color: "bg-level-constituency" },
  { name: "Enrolled", count: 134690, pct: 50, color: "bg-level-cluster" },
  { name: "Benefited", count: 94283, pct: 35, color: "bg-level-ward" },
  { name: "Satisfied", count: 67345, pct: 25, color: "bg-victory" },
  { name: "Loyal", count: 40401, pct: 15, color: "bg-safe" },
  { name: "Voted", count: 26938, pct: 10, color: "bg-saffron" },
];

const CitizenJourney = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2 Constituency" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Citizen Journey Funnel</h1>
      <p className="text-xs text-muted-foreground">Awareness → Vote — 7 stage conversion waterfall</p>

      <div className="max-w-3xl mx-auto space-y-1">
        {stages.map((s, i) => {
          const dropoff = i > 0 ? stages[i - 1].count - s.count : 0;
          const dropPct = i > 0 ? Math.round((dropoff / stages[i - 1].count) * 100) : 0;
          return (
            <div key={s.name}>
              {i > 0 && dropoff > 0 && (
                <div className="flex items-center justify-center gap-2 py-1">
                  <span className="text-[9px] font-mono text-danger">▼ {dropoff.toLocaleString()} dropped ({dropPct}%)</span>
                  <button className="text-[8px] text-info hover:text-saffron transition-colors">Recovery →</button>
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-xs font-mono text-muted-foreground">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-heading tracking-wider text-foreground">{s.name}</span>
                    <span className="text-xs font-mono text-muted-foreground">{s.count.toLocaleString()}</span>
                  </div>
                  <div className="h-8 bg-secondary/50 rounded overflow-hidden">
                    <div className={`h-full ${s.color} rounded transition-all duration-700 flex items-center px-3`} style={{ width: `${s.pct}%` }}>
                      <span className="text-[10px] font-mono text-primary-foreground font-bold">{s.pct}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CitizenJourney;

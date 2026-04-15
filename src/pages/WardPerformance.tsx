import { HierarchyBadge } from "@/components/HierarchyBadge";
import { TrendingUp, TrendingDown, Trophy, Medal } from "lucide-react";

const wards = Array.from({ length: 15 }, (_, i) => {
  const nni = Math.round(Math.random() * 60 + 20);
  return {
    rank: i + 1,
    name: `Ward ${i + 1}`,
    coordinator: `समन्वयक ${i + 1}`,
    nni,
    change: Math.round((Math.random() - 0.4) * 10 * 10) / 10,
    tickets: Math.floor(Math.random() * 20),
    visits: Math.floor(Math.random() * 200 + 50),
    enrollments: Math.floor(Math.random() * 50),
    zone: nni >= 65 ? 'victory' : nni >= 50 ? 'safe' : nni >= 35 ? 'danger' : 'defeat',
    topIssue: ['Water', 'Road', 'Health', 'Electricity', 'Sanitation'][i % 5],
  };
}).sort((a, b) => a.nni - b.nni); // Worst first per spec

const zoneText: Record<string, string> = { victory: 'text-victory', safe: 'text-safe', danger: 'text-warning', defeat: 'text-danger' };
const zoneBg: Record<string, string> = { victory: 'rag-victory', safe: 'rag-safe', danger: 'rag-danger', defeat: 'rag-defeat' };

const WardPerformance = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="cluster" label="L3 Cluster" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Ward Performance Board</h1>
      <p className="text-xs text-muted-foreground">Sorted by NNI — worst first for immediate action focus</p>

      <div className="space-y-2">
        {wards.map((w, i) => (
          <div key={w.name} className={`p-3 rounded-lg border gradient-card transition-all hover:border-saffron/30 ${i < 3 ? 'border-defeat/30' : 'border-border'}`}>
            <div className="flex items-center gap-4">
              <div className="w-8 text-center">
                {i === wards.length - 1 ? <Trophy className="w-5 h-5 text-gold-light mx-auto" /> :
                 i === wards.length - 2 ? <Medal className="w-5 h-5 text-muted-foreground mx-auto" /> :
                 <span className="text-sm font-mono text-muted-foreground">{i + 1}</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-heading text-foreground">{w.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-heading ${zoneBg[w.zone]}`}>{w.zone.toUpperCase()}</span>
                  <span className="text-[9px] text-muted-foreground font-devanagari">{w.coordinator}</span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-[9px] text-muted-foreground">
                  <span>Tickets: {w.tickets}</span>
                  <span>Visits: {w.visits}</span>
                  <span>Enrollments: {w.enrollments}</span>
                  <span>Top Issue: {w.topIssue}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-mono font-bold font-mono-data ${zoneText[w.zone]}`}>{w.nni}</div>
                <div className={`text-[9px] font-mono flex items-center justify-end gap-0.5 ${w.change >= 0 ? 'text-victory' : 'text-danger'}`}>
                  {w.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {w.change > 0 ? '+' : ''}{w.change}
                </div>
              </div>
              <div className="flex gap-1">
                <button className="px-2 py-1 rounded text-[8px] font-heading bg-saffron/10 text-saffron border border-saffron/20 hover:bg-saffron/20">Send Team</button>
                <button className="px-2 py-1 rounded text-[8px] font-heading bg-secondary text-secondary-foreground hover:bg-secondary/80">Call</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardPerformance;

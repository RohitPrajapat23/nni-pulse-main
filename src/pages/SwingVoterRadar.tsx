import { HierarchyBadge } from "@/components/HierarchyBadge";
import { Eye, Target, Phone, UserCheck, TrendingUp } from "lucide-react";

const swingVoters = Array.from({ length: 20 }, (_, i) => {
  const vcs = Math.round((Math.random() * 0.3 + 0.35) * 100) / 100;
  const influence = Math.round(Math.random() * 80 + 20);
  const distance = Math.abs(vcs - 0.5);
  const priority = Math.round(distance * influence);
  return {
    id: `V-${20000 + i}`,
    name: `मतदाता ${100 + i}`,
    vcs,
    influence,
    distance: distance.toFixed(2),
    priority,
    ward: `Ward ${Math.floor(i / 4) + 1}`,
    topIssue: ['Road', 'Water', 'Health', 'Jobs', 'Education'][i % 5],
    lastContact: Math.floor(Math.random() * 30) + 5,
    worker: `कार्यकर्ता ${Math.floor(i / 3) + 1}`,
    persuasion: ['Scheme benefit', 'Personal visit', 'Community event', 'WhatsApp outreach'][i % 4],
  };
}).sort((a, b) => b.priority - a.priority);

const SwingVoterRadar = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground flex items-center gap-2">
        <Eye className="w-6 h-6 text-saffron" /> Swing Voter Radar
      </h1>
      <p className="text-xs text-muted-foreground">Top swing voters ranked by (distance from 50% VCS) × influence score — highest conversion potential first</p>

      <div className="gradient-card rounded-lg border border-saffron/20 p-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-mono font-bold text-saffron font-mono-data">{swingVoters.length}</span>
          <span className="text-xs text-muted-foreground ml-2">swing voters identified</span>
        </div>
        <div className="flex gap-4 text-center">
          <div><div className="text-sm font-mono text-victory">8</div><div className="text-[8px] text-muted-foreground">Converted</div></div>
          <div><div className="text-sm font-mono text-safe">7</div><div className="text-[8px] text-muted-foreground">In Progress</div></div>
          <div><div className="text-sm font-mono text-danger">5</div><div className="text-[8px] text-muted-foreground">Untouched</div></div>
        </div>
      </div>

      <div className="space-y-2">
        {swingVoters.map((v, i) => (
          <div key={v.id} className="p-3 rounded-lg border gradient-card border-border hover:border-saffron/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-8 text-center">
                <span className="text-xs font-mono text-saffron">#{i + 1}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-saffron/10 border border-saffron/30 flex items-center justify-center text-xs font-heading text-saffron">{v.name.slice(-2)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-devanagari text-foreground">{v.name}</span>
                  <span className="text-[9px] font-mono text-muted-foreground">{v.id}</span>
                  <span className="text-[9px] text-muted-foreground">· {v.ward}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground mt-0.5">
                  <span>VCS: <span className={`font-mono font-bold ${v.vcs >= 0.5 ? 'text-safe' : 'text-warning'}`}>{v.vcs.toFixed(2)}</span></span>
                  <span>Influence: <span className="font-mono font-bold text-info">{v.influence}</span></span>
                  <span>Issue: {v.topIssue}</span>
                  <span>Best approach: <span className="text-saffron">{v.persuasion}</span></span>
                  <span>Last contact: {v.lastContact}d ago</span>
                </div>
              </div>
              <div className="text-right mr-2">
                <div className="text-xs font-mono text-muted-foreground">Priority</div>
                <div className="text-lg font-mono font-bold text-saffron">{v.priority}</div>
              </div>
              <button className="px-3 py-2 rounded-lg text-[9px] font-heading gradient-saffron text-primary-foreground flex items-center gap-1">
                <Target className="w-3 h-3" /> ASSIGN VISIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwingVoterRadar;

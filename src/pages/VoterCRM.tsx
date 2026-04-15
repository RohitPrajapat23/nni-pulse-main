import { useState } from "react";
import { Search, Phone, MapPin, Star, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { HierarchyBadge } from "@/components/HierarchyBadge";

const voters = Array.from({ length: 30 }, (_, i) => {
  const vcs = Math.round((Math.random() * 0.8 + 0.15) * 100) / 100;
  const segments = ['Grateful', 'Neutral', 'At-Risk', 'Opposition'] as const;
  const segment = vcs > 0.7 ? 'Grateful' : vcs > 0.45 ? 'Neutral' : vcs > 0.25 ? 'At-Risk' : 'Opposition';
  return {
    id: `V-${10000 + i}`,
    name: `मतदाता ${i + 1}`,
    phone: `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    age: Math.floor(Math.random() * 50 + 20),
    gender: ['M', 'F', 'O'][i % 3],
    ward: `Ward ${Math.floor(i / 5) + 1}`,
    vcs,
    segment,
    lastContact: Math.floor(Math.random() * 60),
    schemes: Math.floor(Math.random() * 4),
    topIssue: ['Road', 'Water', 'Health', 'Jobs', 'Education'][i % 5],
  };
});

const segColors: Record<string, string> = {
  Grateful: 'text-victory', Neutral: 'text-safe', 'At-Risk': 'text-warning', Opposition: 'text-danger',
};
const segBg: Record<string, string> = {
  Grateful: 'bg-victory/10 border-victory/20', Neutral: 'bg-safe/10 border-safe/20', 'At-Risk': 'bg-danger/10 border-danger/20', Opposition: 'bg-defeat/10 border-defeat/20',
};

const VoterCRM = () => {
  const [search, setSearch] = useState('');
  const [segFilter, setSegFilter] = useState<string | null>(null);

  const filtered = voters.filter(v => {
    if (search && !v.name.includes(search) && !v.phone.includes(search) && !v.id.includes(search)) return false;
    if (segFilter && v.segment !== segFilter) return false;
    return true;
  });

  const segCounts = { Grateful: voters.filter(v => v.segment === 'Grateful').length, Neutral: voters.filter(v => v.segment === 'Neutral').length, 'At-Risk': voters.filter(v => v.segment === 'At-Risk').length, Opposition: voters.filter(v => v.segment === 'Opposition').length };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Voter CRM Database</h1>

      {/* Segment donut cards */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(segCounts).map(([seg, count]) => (
          <button key={seg} onClick={() => setSegFilter(segFilter === seg ? null : seg)} className={`p-3 rounded-lg border text-center transition-all ${segFilter === seg ? segBg[seg] + ' border' : 'gradient-card border-border hover:border-saffron/30'}`}>
            <div className={`text-xl font-mono font-bold font-mono-data ${segColors[seg]}`}>{count}</div>
            <div className="text-[9px] font-heading tracking-wider text-muted-foreground">{seg.toUpperCase()}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, or voter ID..." className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-saffron" />
      </div>

      {/* Voter list */}
      <div className="space-y-2">
        {filtered.map(v => (
          <div key={v.id} className={`p-3 rounded-lg border gradient-card border-border hover:border-saffron/30 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-heading text-foreground">{v.gender}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-devanagari text-foreground">{v.name}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">{v.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-heading border ${segBg[v.segment]} ${segColors[v.segment]}`}>{v.segment}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-muted-foreground mt-0.5">
                    <span><Phone className="w-2.5 h-2.5 inline" /> {v.phone}</span>
                    <span><MapPin className="w-2.5 h-2.5 inline" /> {v.ward}</span>
                    <span>Age: {v.age}</span>
                    <span>Issue: {v.topIssue}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-mono font-bold ${v.vcs >= 0.7 ? 'text-victory' : v.vcs >= 0.45 ? 'text-safe' : v.vcs >= 0.25 ? 'text-warning' : 'text-danger'}`}>{v.vcs.toFixed(2)}</div>
                <div className="text-[8px] text-muted-foreground">VCS • Last: {v.lastContact}d ago • Schemes: {v.schemes}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoterCRM;

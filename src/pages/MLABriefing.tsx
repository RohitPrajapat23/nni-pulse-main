import { useState } from "react";
import { HierarchyBadge } from "@/components/HierarchyBadge";
import { Sun, TrendingDown, TrendingUp, AlertTriangle, Target, Star, UserCheck, ChevronDown, ChevronUp } from "lucide-react";
import { touchPointData } from "@/lib/mockData";

const sentimentColor: Record<string, string> = {
  Positive: "text-victory bg-victory/10 border-victory/20",
  Neutral: "text-safe bg-safe/10 border-safe/20",
  Negative: "text-defeat bg-defeat/10 border-defeat/20",
};

const MLABriefing = () => {
  const [touchExpanded, setTouchExpanded] = useState(false);

  const totalVisits = touchPointData.reduce((s, v) => s + v.visits, 0);
  const avgVisits = (totalVisits / touchPointData.length).toFixed(1);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2" />
        <span className="text-[10px] font-mono text-muted-foreground">Auto-generated at 6:00 AM</span>
      </div>

      <div className="gradient-card rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border gradient-saffron">
          <h1 className="text-2xl font-heading tracking-wider text-primary-foreground">शुभ प्रभात, MLA साहेब!</h1>
          <div className="flex items-center gap-3 mt-2 text-primary-foreground/80">
            <span className="text-sm font-body">14 April 2026 · Monday</span>
            <span className="text-sm">Worli Constituency</span>
            <span className="flex items-center gap-1 text-sm"><Sun className="w-4 h-4" /> 32°C Sunny</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* NNI Pulse */}
          <div>
            <h2 className="text-sm font-heading tracking-wider text-saffron mb-3">NNI PULSE</h2>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold font-mono-data text-safe">52.4</div>
                <div className="text-[9px] text-muted-foreground">TODAY</div>
              </div>
              <TrendingUp className="w-6 h-6 text-victory" />
              <div className="text-center">
                <div className="text-lg font-mono text-muted-foreground">49.1</div>
                <div className="text-[9px] text-muted-foreground">YESTERDAY</div>
              </div>
              <div className="flex-1 h-12 bg-muted rounded-lg flex items-end px-1 gap-0.5">
                {[42, 44, 43, 46, 49, 49, 52].map((v, i) => (
                  <div key={i} className="flex-1 bg-saffron/60 rounded-t transition-all" style={{ height: `${(v / 60) * 100}%` }} />
                ))}
              </div>
              <span className="text-[9px] text-muted-foreground font-mono">7-day</span>
            </div>
          </div>

          {/* Top 3 Issues */}
          <div>
            <h2 className="text-sm font-heading tracking-wider text-saffron mb-3">TOP 3 ISSUES TODAY</h2>
            <div className="space-y-2">
              {[
                { issue: "Water supply disruption — Ward 5, Prabhadevi", tickets: 8, status: "3 resolved" },
                { issue: "Road pothole cluster — Ward 2, Worli Naka", tickets: 5, status: "In progress" },
                { issue: "Electricity fluctuation — Ward 7, Lower Parel", tickets: 4, status: "Dept contacted" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-muted/50 rounded-lg flex items-center justify-between border border-border">
                  <div>
                    <div className="text-xs text-foreground">{item.issue}</div>
                    <div className="text-[9px] text-muted-foreground">{item.tickets} tickets · {item.status}</div>
                  </div>
                  <span className="text-[9px] font-mono text-warning">#{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MLA Engagement Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-card border border-border rounded-xl shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-heading tracking-wider text-saffron">MLA ENGAGEMENT SCORE</h2>
                  <p className="text-[10px] text-muted-foreground">Visits and touch points show engagement intensity.</p>
                </div>
                <span className="text-3xl font-mono font-bold text-saffron">{touchPointData.reduce((sum, item) => sum + item.visits, 0)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg border border-border text-center">
                  <div className="text-lg font-bold text-foreground">{touchPointData.length}</div>
                  <div className="text-[9px] text-muted-foreground">Unique Personas</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg border border-border text-center">
                  <div className="text-lg font-bold text-foreground">{(touchPointData.reduce((sum, item) => sum + item.visits, 0) / touchPointData.length).toFixed(1)}</div>
                  <div className="text-[9px] text-muted-foreground">Avg Visits</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-card border border-border rounded-xl shadow-soft">
              <h3 className="text-sm font-heading tracking-wider text-foreground mb-3">Top Engaged Persona</h3>
              <div className="bg-muted/50 rounded-xl border border-border p-4">
                <div className="text-[12px] text-muted-foreground uppercase tracking-[0.22em] mb-2">{touchPointData.sort((a, b) => b.visits - a.visits)[0]?.persona || "Predominant"}</div>
                <div className="text-lg font-bold text-foreground">{touchPointData.sort((a, b) => b.visits - a.visits)[0]?.voterName || "N/A"}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{touchPointData.sort((a, b) => b.visits - a.visits)[0]?.household}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-[10px] rounded-full bg-saffron/10 text-saffron border border-saffron/20">Visits: {touchPointData.sort((a, b) => b.visits - a.visits)[0]?.visits}</span>
                  <span className="px-3 py-1 text-[10px] rounded-full bg-safe/10 text-safe border border-safe/20">{touchPointData.sort((a, b) => b.visits - a.visits)[0]?.sentiment}</span>
                </div>
              </div>
            </div>
          </div>

          {/* At-Risk Wards */}
          <div>
            <h2 className="text-sm font-heading tracking-wider text-danger mb-3 flex items-center gap-1"><AlertTriangle className="w-4 h-4" /> AT-RISK WARDS</h2>
            <div className="space-y-2">
              {[
                { ward: "Kasba Peth", nni: 29, drop: -8, action: "Emergency scheme camp needed" },
                { ward: "Prabhadevi", nni: 33, drop: -5, action: "Daily MLA visit recommended" },
                { ward: "Lower Parel", nni: 38, drop: -3, action: "Resolve 4 overdue tickets" },
              ].map((w, i) => (
                <div key={i} className="p-3 bg-defeat/5 border border-defeat/15 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading text-foreground">{w.ward}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-bold text-danger">{w.nni}</span>
                      <span className="text-[9px] font-mono text-danger flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />{w.drop}</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-saffron mt-1">→ {w.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wins */}
          <div>
            <h2 className="text-sm font-heading tracking-wider text-victory mb-3 flex items-center gap-1"><Star className="w-4 h-4" /> WINS THIS WEEK</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Tickets Resolved", value: "23" },
                { label: "Scheme Enrollments", value: "156" },
                { label: "Grateful Voters +", value: "89" },
              ].map(w => (
                <div key={w.label} className="p-3 bg-victory/5 border border-victory/15 rounded-lg text-center">
                  <div className="text-xl font-mono font-bold text-victory">{w.value}</div>
                  <div className="text-[9px] text-muted-foreground">{w.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== TOUCH POINTS — MLA Visits Tracker ===== */}
          <div>
            <button
              onClick={() => setTouchExpanded(!touchExpanded)}
              className="w-full flex items-center justify-between mb-3"
            >
              <h2 className="text-sm font-heading tracking-wider text-saffron flex items-center gap-1">
                <UserCheck className="w-4 h-4" /> MLA TOUCH POINTS (VISITS)
              </h2>
              {touchExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="p-3 bg-saffron/5 border border-saffron/15 rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-saffron">{totalVisits}</div>
                <div className="text-[9px] text-muted-foreground">Total Visits</div>
              </div>
              <div className="p-3 bg-muted/50 border border-border rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-foreground">{touchPointData.length}</div>
                <div className="text-[9px] text-muted-foreground">Unique Voters</div>
              </div>
              <div className="p-3 bg-muted/50 border border-border rounded-lg text-center">
                <div className="text-xl font-mono font-bold text-foreground">{avgVisits}</div>
                <div className="text-[9px] text-muted-foreground">Avg per Voter</div>
              </div>
            </div>

            {/* Detailed list */}
            {touchExpanded && (
              <div className="border border-border rounded-lg overflow-hidden animate-fade-in-up">
                <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-muted/50 text-[9px] font-heading tracking-wider text-muted-foreground">
                  <div className="col-span-4">VOTER</div>
                  <div className="col-span-3">HOUSEHOLD</div>
                  <div className="col-span-1 text-center">VISITS</div>
                  <div className="col-span-2">LAST VISIT</div>
                  <div className="col-span-2 text-center">SENTIMENT</div>
                </div>
                {touchPointData.sort((a, b) => b.visits - a.visits).map(v => (
                  <div key={v.id} className="grid grid-cols-12 gap-2 px-3 py-2.5 border-t border-border text-xs hover:bg-muted/30 transition-colors items-center">
                    <div className="col-span-4 text-foreground font-body truncate">{v.voterName}</div>
                    <div className="col-span-3 text-muted-foreground font-mono text-[10px] truncate">{v.household}</div>
                    <div className="col-span-1 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-saffron/10 text-saffron font-mono font-bold text-xs">{v.visits}</span>
                    </div>
                    <div className="col-span-2 text-[10px] font-mono text-muted-foreground">{v.lastVisit}</div>
                    <div className="col-span-2 text-center">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border font-heading tracking-wider ${sentimentColor[v.sentiment]}`}>
                        {v.sentiment}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Priority Action */}
          <div className="p-4 rounded-lg gradient-saffron">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary-foreground" />
              <h2 className="text-sm font-heading tracking-wider text-primary-foreground">YOUR PRIORITY ACTION TODAY</h2>
            </div>
            <p className="text-sm font-body text-primary-foreground/90">
              <strong>FOCUS ON: Kasba Peth water supply</strong> — 8 open tickets, trust dropping fast. Visit the ward, meet 5 affected families, and ensure PWD department action by evening.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLABriefing;

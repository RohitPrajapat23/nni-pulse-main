import { HierarchyBadge } from "@/components/HierarchyBadge";
import { Bell, AlertTriangle, CheckCircle, Eye, Zap } from "lucide-react";

const alerts = {
  critical: [
    { id: 1, type: "NNI Drop", metric: "Kasba Peth NNI", value: "29", threshold: "<35", since: "2h ago", escalation: "4h remaining" },
    { id: 2, type: "Overdue Tickets", metric: "Ward 7 Open Tickets", value: "18", threshold: ">10 for 48h", since: "6h ago", escalation: "2h remaining" },
    { id: 3, type: "Trust Decay", metric: "Page 42 Trust Score", value: "22", threshold: "<40", since: "12h ago", escalation: "Auto-alert sent" },
  ],
  warning: [
    { id: 4, type: "Scheme Drop", metric: "Enrollment Rate", value: "42%", threshold: "<50%", since: "1d ago" },
    { id: 5, type: "Low Visits", metric: "Field Activity Ward 3", value: "12 visits", threshold: "<20/day", since: "3h ago" },
    { id: 6, type: "Opposition", metric: "Social Media Mentions", value: "+45%", threshold: ">30% spike", since: "5h ago" },
  ],
  healthy: [
    { id: 7, metric: "NNI improved 5 pts in Kopri Ward", performer: "कार्यकर्ता राजेश पाटिल" },
    { id: 8, metric: "100% ticket resolution in Ward 2 this week", performer: "वार्ड समन्वयक सुनीता" },
    { id: 9, metric: "15 new grateful voters added today", performer: "पेज प्रमुख अमित" },
  ],
};

const AlertCommandCenter = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Alert Command Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Critical */}
        <div className="rounded-lg border border-defeat/30 overflow-hidden">
          <div className="px-4 py-3 bg-defeat/10 border-b border-defeat/20 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" />
            <h2 className="text-sm font-heading tracking-wider text-danger">CRITICAL ({alerts.critical.length})</h2>
          </div>
          <div className="p-3 space-y-3">
            {alerts.critical.map(a => (
              <div key={a.id} className="p-3 rounded-lg bg-defeat/5 border border-defeat/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-heading tracking-wider text-danger">{a.type}</span>
                  <span className="text-[9px] font-mono text-muted-foreground">{a.since}</span>
                </div>
                <div className="text-xs text-foreground mb-1">{a.metric}: <span className="font-mono font-bold text-danger">{a.value}</span></div>
                <div className="text-[9px] text-muted-foreground mb-2">Threshold: {a.threshold}</div>
                <div className="text-[9px] font-mono text-danger animate-pulse mb-2">⏰ {a.escalation}</div>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 rounded text-[9px] font-heading gradient-saffron text-primary-foreground">ASSIGN</button>
                  <button className="flex-1 py-1.5 rounded text-[9px] font-heading bg-victory/20 text-victory border border-victory/30">RESOLVE</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="rounded-lg border border-safe/30 overflow-hidden">
          <div className="px-4 py-3 bg-safe/10 border-b border-safe/20 flex items-center gap-2">
            <Eye className="w-4 h-4 text-safe" />
            <h2 className="text-sm font-heading tracking-wider text-safe">WARNING ({alerts.warning.length})</h2>
          </div>
          <div className="p-3 space-y-3">
            {alerts.warning.map(a => (
              <div key={a.id} className="p-3 rounded-lg bg-safe/5 border border-safe/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-heading tracking-wider text-safe">{a.type}</span>
                  <span className="text-[9px] font-mono text-muted-foreground">{a.since}</span>
                </div>
                <div className="text-xs text-foreground mb-1">{a.metric}: <span className="font-mono font-bold text-safe">{a.value}</span></div>
                <div className="text-[9px] text-muted-foreground mb-2">Threshold: {a.threshold}</div>
                <button className="w-full py-1.5 rounded text-[9px] font-heading bg-secondary text-secondary-foreground border border-border hover:border-safe/40">MONITOR</button>
              </div>
            ))}
          </div>
        </div>

        {/* Healthy */}
        <div className="rounded-lg border border-victory/30 overflow-hidden">
          <div className="px-4 py-3 bg-victory/10 border-b border-victory/20 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-victory" />
            <h2 className="text-sm font-heading tracking-wider text-victory">HEALTHY — WINS</h2>
          </div>
          <div className="p-3 space-y-3">
            {alerts.healthy.map(a => (
              <div key={a.id} className="p-3 rounded-lg bg-victory/5 border border-victory/20">
                <div className="text-xs text-foreground mb-1">🎉 {a.metric}</div>
                <div className="text-[9px] text-victory font-devanagari">⭐ {a.performer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCommandCenter;

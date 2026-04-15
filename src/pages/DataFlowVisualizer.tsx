import { HierarchyBadge } from "@/components/HierarchyBadge";
import { Radio, MessageSquare, Wifi, Database, Cpu, FileText, Bell, BarChart3, Zap, Mail } from "lucide-react";

const inputNodes = [
  { name: "WhatsApp Bot", icon: MessageSquare, volume: "2,340 msgs", lastSync: "2 min ago", color: "bg-victory" },
  { name: "IVR Toll-free", icon: Radio, volume: "186 calls", lastSync: "5 min ago", color: "bg-info" },
  { name: "Tablet Forms", icon: FileText, volume: "89 submissions", lastSync: "12 min ago", color: "bg-level-cluster" },
  { name: "MahaDBT API", icon: Database, volume: "1,200 records", lastSync: "1h ago", color: "bg-safe" },
  { name: "Aapla Davakhana", icon: Zap, volume: "342 patients", lastSync: "30 min ago", color: "bg-level-ward" },
  { name: "Weekly IVR Survey", icon: Radio, volume: "200 responses", lastSync: "Sun 11pm", color: "bg-level-state" },
];

const processNodes = [
  { name: "Deduplication", records: "4,157", errors: 3, time: "2.1s" },
  { name: "Ward Mapping", records: "4,154", errors: 0, time: "0.8s" },
  { name: "Scoring Engine", records: "4,154", errors: 0, time: "4.2s" },
];

const outputNodes = [
  { name: "NNI Score Update", icon: BarChart3, triggered: 288, lastTrigger: "00:01 AM" },
  { name: "Auto WhatsApp", icon: MessageSquare, triggered: 47, lastTrigger: "10:32 AM" },
  { name: "MLA Alert", icon: Bell, triggered: 3, lastTrigger: "09:15 AM" },
  { name: "Morning Brief PDF", icon: FileText, triggered: 1, lastTrigger: "06:00 AM" },
  { name: "Voter Segment Update", icon: Cpu, triggered: 4154, lastTrigger: "00:05 AM" },
  { name: "Resource Optimizer", icon: Zap, triggered: 12, lastTrigger: "00:10 AM" },
];

const DataFlowVisualizer = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Data Flow Visualizer</h1>
      <p className="text-xs text-muted-foreground">Live pipeline: Collection → Processing → Output</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Layer 1 - Collection */}
        <div className="rounded-lg border border-info/20 overflow-hidden">
          <div className="px-4 py-3 bg-info/10 border-b border-info/20">
            <h2 className="text-sm font-heading tracking-wider text-info">LAYER 1 — COLLECTION</h2>
          </div>
          <div className="p-3 space-y-2">
            {inputNodes.map(n => (
              <div key={n.name} className="p-3 bg-secondary/50 rounded-lg flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${n.color}/20 flex items-center justify-center`}>
                  <n.icon className="w-4 h-4 text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-body text-foreground">{n.name}</div>
                  <div className="text-[9px] font-mono text-muted-foreground">{n.volume} · {n.lastSync}</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-victory animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2 - Processing */}
        <div className="rounded-lg border border-safe/20 overflow-hidden">
          <div className="px-4 py-3 bg-safe/10 border-b border-safe/20">
            <h2 className="text-sm font-heading tracking-wider text-safe">LAYER 2 — PROCESSING</h2>
          </div>
          <div className="p-3 space-y-2">
            {processNodes.map((n, i) => (
              <div key={n.name} className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-heading text-foreground">{n.name}</span>
                  <Cpu className="w-4 h-4 text-safe" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-mono font-bold text-foreground">{n.records}</div>
                    <div className="text-[8px] text-muted-foreground">Processed</div>
                  </div>
                  <div>
                    <div className={`text-sm font-mono font-bold ${n.errors > 0 ? 'text-danger' : 'text-victory'}`}>{n.errors}</div>
                    <div className="text-[8px] text-muted-foreground">Errors</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono font-bold text-info">{n.time}</div>
                    <div className="text-[8px] text-muted-foreground">Time</div>
                  </div>
                </div>
                {i < processNodes.length - 1 && <div className="text-center mt-2 text-safe">↓</div>}
              </div>
            ))}

            {/* Animated flow dots */}
            <div className="flex justify-center py-2">
              <div className="flex gap-1">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Layer 3 - Outputs */}
        <div className="rounded-lg border border-victory/20 overflow-hidden">
          <div className="px-4 py-3 bg-victory/10 border-b border-victory/20">
            <h2 className="text-sm font-heading tracking-wider text-victory">LAYER 3 — OUTPUTS</h2>
          </div>
          <div className="p-3 space-y-2">
            {outputNodes.map(n => (
              <div key={n.name} className="p-3 bg-secondary/50 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-victory/20 flex items-center justify-center">
                  <n.icon className="w-4 h-4 text-victory" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-body text-foreground">{n.name}</div>
                  <div className="text-[9px] font-mono text-muted-foreground">{n.triggered} triggered · {n.lastTrigger}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowVisualizer;

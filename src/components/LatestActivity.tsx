import { useState, useMemo } from "react";
import { Clock } from "lucide-react";
import { ActivityItem, generateMockActivities, PAGE_SIZE, statusConfig } from "@/lib/mockData";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

interface LatestActivityProps {
  items?: ActivityItem[];
  title?: string;
  maxItems?: number;
}

export function LatestActivity({ items, title = "Latest Activity", maxItems = 50 }: LatestActivityProps) {
  const data = useMemo(() => {
    const source = items || generateMockActivities(maxItems);
    return [...source].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [items, maxItems]);

  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = data.slice(0, visible);

  return (
    <div className="gradient-card rounded-lg border border-border">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-heading tracking-wider text-foreground">{title}</h3>
        <span className="text-[10px] font-mono text-muted-foreground">{data.length} total</span>
      </div>
      <div className="divide-y divide-border">
        {shown.map((item) => {
          const cfg = statusConfig[item.status];
          return (
            <div key={item.id} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/50 transition-colors">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-body text-foreground truncate">{item.userName}</span>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full border font-heading tracking-wider ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{item.activityType}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono flex-shrink-0">
                <Clock className="w-3 h-3" />
                {timeAgo(item.timestamp)}
              </div>
            </div>
          );
        })}
      </div>
      {visible < data.length && (
        <div className="px-5 py-3 border-t border-border">
          <button
            onClick={() => setVisible(v => Math.min(v + PAGE_SIZE, data.length))}
            className="w-full py-2 rounded-lg text-xs font-heading tracking-wider text-saffron border border-saffron/30 hover:bg-saffron/5 transition-colors"
          >
            Load More ({data.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

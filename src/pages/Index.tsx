import { KPICard } from "@/components/KPICard";
import { NNIGauge } from "@/components/NNIGauge";
import { HierarchyBadge } from "@/components/HierarchyBadge";
import { ModuleCard } from "@/components/ModuleCard";
import { LatestActivity } from "@/components/LatestActivity";
import {
  Users, Vote, Ticket, BarChart3, Shield, Eye,
  FileText, Map, Bell, TrendingUp, Target, Phone,
  Radio, Zap, Clock
} from "lucide-react";

const WarRoom = () => {
  return (
    <div className="space-y-6">
      {/* Section: NNI + KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3 gradient-card rounded-lg border border-border p-5 flex flex-col items-center justify-center">
          <NNIGauge score={72} label="Worli Constituency" />
          <button className="mt-4 text-[10px] font-mono text-saffron hover:text-saffron/80 transition-colors flex items-center gap-1">
            <Target className="w-3 h-3" /> Open NNI Calculator →
          </button>
        </div>

        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <KPICard title="Voter Coverage" value="68.4%" subtitle="Registered vs Total Eligible" trend={{ value: 2.3, label: "vs last month" }} status="safe" icon={<Users className="w-4 h-4" />} formula={{ label: "Coverage Formula", breakdown: ["Coverage = (Registered / Eligible) × 100", "Registered: 1,84,320", "Eligible: 2,69,380", "= (184320 / 269380) × 100 = 68.4%"] }} />
          <KPICard title="Scheme Penetration" value="43.2%" subtitle="Active Enrollments" trend={{ value: 5.1, label: "vs last quarter" }} status="danger" icon={<FileText className="w-4 h-4" />} formula={{ label: "Penetration Formula", breakdown: ["Penetration = (Enrolled / Eligible) × 100", "Enrolled: 79,584", "Eligible: 1,84,320", "= 43.2%"] }} />
          <KPICard title="Grievance Resolution" value="87.1%" subtitle="Resolved within SLA" trend={{ value: -1.2, label: "vs last week" }} status="victory" icon={<Ticket className="w-4 h-4" />} formula={{ label: "Resolution Rate", breakdown: ["Rate = (Resolved in SLA / Total) × 100", "Resolved: 2,341 / Total: 2,688", "SLA: 72 hours for general, 24 for urgent"] }} />
          <KPICard title="Field Activity" value="1,247" subtitle="Visits logged today" trend={{ value: 12.5, label: "vs yesterday" }} status="victory" icon={<Map className="w-4 h-4" />} />
          <KPICard title="Swing Voter Capture" value="31.8%" subtitle="Converted from opposition" trend={{ value: -3.4, label: "vs target" }} status="danger" icon={<TrendingUp className="w-4 h-4" />} formula={{ label: "Swing Capture Formula", breakdown: ["Capture = (Converted / Identified Swing) × 100", "Converted: 8,420", "Identified: 26,478", "Target: 35% by Dec 2028"] }} />
        </div>
      </div>

      {/* Section: Module Grid */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-heading tracking-wider text-foreground">Operations Hub</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          <ModuleCard title="Jan Connect" description="Citizen complaint tracking & resolution" icon={Ticket} count={142} status="warning" />
          <ModuleCard title="Voter CRM" description="Complete voter intelligence database" icon={Users} count={184320} status="active" />
          <ModuleCard title="Scheme Engine" description="Government scheme enrollment & tracking" icon={FileText} count={24} status="active" />
          <ModuleCard title="Field Ops" description="Page Pramukh visit logs & tracking" icon={Map} count={1247} status="active" />
          <ModuleCard title="Alert Center" description="Critical alerts & escalations" icon={Bell} count={7} status="critical" />
          <ModuleCard title="Opposition Intel" description="Opposition move detection & analysis" icon={Eye} count={3} status="warning" />
          <ModuleCard title="Performance" description="Ward & worker leaderboards" icon={BarChart3} status="active" />
          <ModuleCard title="Swing Radar" description="Identify & convert swing voters" icon={Radio} count={26478} status="danger" />
          <ModuleCard title="NNI Calculator" description="Interactive Net Neta Index engine" icon={Target} status="active" />
          <ModuleCard title="Data Flow" description="Real-time data pipeline visualizer" icon={TrendingUp} status="active" />
          <ModuleCard title="Security" description="Access control & audit trails" icon={Shield} status="active" />
          <ModuleCard title="Helpline" description="Citizen helpline call management" icon={Phone} count={58} status="active" />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-heading tracking-wider text-foreground">Quick Actions</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "📋 Register New Voter", primary: true },
            { label: "🎫 Create Ticket" },
            { label: "📊 Morning Briefing" },
            { label: "🏘️ Ward Report" },
            { label: "📱 Push Alert" },
          ].map((action) => (
            <button
              key={action.label}
              className={`px-4 py-2.5 rounded-lg text-xs font-heading tracking-wider transition-all duration-200 ${
                action.primary
                  ? "gradient-saffron text-primary-foreground glow-saffron hover:opacity-90"
                  : "bg-muted border border-border text-foreground hover:border-saffron/40 hover:text-saffron"
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Latest Activity Feed */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-lg font-heading tracking-wider text-foreground">Latest Activity</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        <LatestActivity />
      </div>

      {/* Footer status */}
      <footer className="border-t border-border pt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>🟢 All Systems Operational</span>
          <span>|</span>
          <span>Data Refresh: 30s</span>
          <span>|</span>
          <span>Users Online: 342</span>
        </div>
        <span className="font-devanagari">शिवसेना सेवा ग्रिड — 2029 विधानसभा</span>
      </footer>
    </div>
  );
};

export default WarRoom;

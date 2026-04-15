import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Map, Target, Users, UserPlus, Ticket,
  FileText, BarChart3, Bell, Radio, TrendingUp, Smartphone,
  BookOpen, Eye, ChevronLeft, ChevronRight, Zap, Clock, AlertTriangle
} from "lucide-react";

const navItems = [
  { path: "/state", label: "State Command", icon: LayoutDashboard, level: "L1" },
  { path: "/", label: "War Room", icon: Map, level: "L2" },
  { path: "/nni", label: "NNI Calculator", icon: Target, level: "L2" },
  { path: "/crm", label: "Voter CRM", icon: Users, level: "L2" },
  { path: "/register", label: "Voter Registration", icon: UserPlus, level: "L2" },
  { path: "/tickets", label: "Jan Connect", icon: Ticket, level: "L4" },
  { path: "/funnel", label: "Citizen Journey", icon: TrendingUp, level: "L2" },
  { path: "/schemes", label: "Scheme Catalogue", icon: FileText, level: "L4" },
  { path: "/alerts", label: "Alert Center", icon: Bell, level: "L2" },
  { path: "/briefing", label: "MLA Briefing", icon: BookOpen, level: "L2" },
  { path: "/wards", label: "Ward Performance", icon: BarChart3, level: "L3" },
  { path: "/dataflow", label: "Data Flow", icon: Radio, level: "L2" },
  { path: "/swing", label: "Swing Radar", icon: Eye, level: "L2" },
  { path: "/page-pramukh", label: "Page Pramukh", icon: Smartphone, level: "L6" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className={`${collapsed ? 'w-16' : 'w-64'} bg-sidebar border-r border-sidebar-border shadow-sm flex flex-col transition-all duration-300 fixed h-full z-40`}>
        <div className="h-14 flex items-center gap-2 px-3 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded gradient-saffron flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-xs font-heading tracking-wider text-sidebar-foreground leading-none">SHAKHA 2.0</div>
              <div className="text-[9px] font-mono text-gold-light tracking-widest">SEVA GRID</div>
            </div>
          )}
        </div>

        <nav className="flex-1 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 mx-2 px-3 py-2 rounded-md text-xs transition-all duration-200 group ${
                  isActive
                    ? 'bg-saffron/15 text-saffron border-l-2 border-saffron'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-l-2 border-transparent'
                }`}
              >
                <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-saffron' : ''}`} />
                {!collapsed && (
                  <>
                    <span className="font-body truncate">{item.label}</span>
                    <span className="ml-auto text-[9px] font-mono text-sidebar-foreground/50">{item.level}</span>
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-3 border-t border-sidebar-border">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-victory animate-pulse" />
              <span className="text-[9px] font-heading tracking-wider text-sidebar-foreground/60">LIVE FEED</span>
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              <p className="text-[9px] text-victory font-mono">14:32 — Ticket #4821 resolved</p>
              <p className="text-[9px] text-defeat font-mono">14:28 — Kasba Peth NNI → 29</p>
              <p className="text-[9px] text-safe font-mono">14:15 — 12 voters registered</p>
            </div>
          </div>
        )}

        {!collapsed && (
          <div className="p-3">
            <button className="w-full py-2 rounded-md bg-defeat/20 border border-defeat/40 text-defeat text-[10px] font-heading tracking-wider hover:bg-defeat/30 transition-colors flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-3 h-3" /> WAR ROOM MODE
            </button>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-10 flex items-center justify-center border-t border-sidebar-border text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main content — light background */}
      <main className={`flex-1 ${collapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-victory/10 border border-victory/20">
              <span className="w-1.5 h-1.5 rounded-full bg-victory animate-pulse" />
              <span className="text-[10px] font-mono text-victory tracking-wider">LIVE</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">Maharashtra • Worli - 181</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>14 Apr 2026, 10:42 IST</span>
            </div>
            <div className="w-7 h-7 rounded-full gradient-saffron flex items-center justify-center text-[10px] font-heading text-primary-foreground">CM</div>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

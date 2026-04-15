import { useState } from "react";
import { Search, Filter, Ticket, Clock, AlertTriangle, CheckCircle, Phone, MapPin, ChevronRight } from "lucide-react";
import { HierarchyBadge } from "@/components/HierarchyBadge";

const tickets = Array.from({ length: 20 }, (_, i) => {
  const statuses = ['open', 'in_progress', 'resolved', 'overdue'] as const;
  const categories = ['Road/Pothole', 'Water Supply', 'Electricity', 'Health', 'Scheme App', 'Sanitation'];
  const status = statuses[i % 4];
  const hours = status === 'overdue' ? 48 + Math.floor(Math.random() * 48) : Math.floor(Math.random() * 40);
  return {
    id: `JC-${4800 + i}`,
    category: categories[i % categories.length],
    citizen: `नागरिक ${i + 1}`,
    phone: `98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
    location: `Ward ${Math.floor(i / 4) + 1} > Booth ${i + 1}`,
    status,
    hours,
    assignedTo: `कार्यकर्ता ${Math.floor(i / 3) + 1}`,
    mlaCreditSent: status === 'resolved' && Math.random() > 0.3,
    description: ['सड़क में गड्ढा', 'पानी नहीं आ रहा', 'बिजली कटौती', 'दवाखाना बंद', 'योजना का फॉर्म अटका', 'नाला सफाई'][i % 6],
  };
});

const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
  open: { bg: 'bg-info/10 border-info/30', text: 'text-info', label: 'OPEN' },
  in_progress: { bg: 'bg-safe/10 border-safe/30', text: 'text-safe', label: 'IN PROGRESS' },
  resolved: { bg: 'bg-victory/10 border-victory/30', text: 'text-victory', label: 'RESOLVED' },
  overdue: { bg: 'bg-defeat/10 border-defeat/30', text: 'text-danger', label: 'OVERDUE' },
};

const JanConnectTickets = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<typeof tickets[0] | null>(null);

  const filtered = filter ? tickets.filter(t => t.status === filter) : tickets;
  const counts = { open: tickets.filter(t => t.status === 'open').length, in_progress: tickets.filter(t => t.status === 'in_progress').length, resolved: tickets.filter(t => t.status === 'resolved').length, overdue: tickets.filter(t => t.status === 'overdue').length };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="ward" label="L4 Ward" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Jan Connect — जन कनेक्ट</h1>

      {/* Funnel stats */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(counts).map(([key, count]) => {
          const s = statusStyles[key];
          return (
            <button key={key} onClick={() => setFilter(filter === key ? null : key)} className={`p-3 rounded-lg border text-center transition-all ${filter === key ? s.bg + ' border' : 'gradient-card border-border hover:border-saffron/30'}`}>
              <div className={`text-2xl font-mono font-bold font-mono-data ${s.text}`}>{count}</div>
              <div className="text-[9px] font-heading tracking-wider text-muted-foreground">{s.label}</div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-5">
        {/* Ticket List */}
        <div className="flex-1 space-y-2">
          {filtered.map(t => {
            const s = statusStyles[t.status];
            return (
              <button key={t.id} onClick={() => setSelectedTicket(t)} className={`w-full text-left p-3 rounded-lg border transition-all ${selectedTicket?.id === t.id ? 'border-saffron/50 bg-saffron/5' : 'border-border gradient-card hover:border-saffron/30'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-saffron">{t.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-heading tracking-wider border ${s.bg} ${s.text}`}>{s.label}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-body text-foreground">{t.category}</span>
                  <span className="text-[9px] text-muted-foreground">— {t.description}</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground">
                  <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{t.location}</span>
                  <span className="flex items-center gap-0.5"><Phone className="w-2.5 h-2.5" />{t.citizen}</span>
                  <span className={`flex items-center gap-0.5 font-mono ${t.hours > 48 ? 'text-danger' : t.hours > 24 ? 'text-warning' : 'text-victory'}`}>
                    <Clock className="w-2.5 h-2.5" />{t.hours}h
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Ticket Detail Panel */}
        {selectedTicket && (
          <div className="w-80 gradient-card rounded-lg border border-border p-4 space-y-4 sticky top-20 h-fit">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-saffron font-bold">{selectedTicket.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-heading border ${statusStyles[selectedTicket.status].bg} ${statusStyles[selectedTicket.status].text}`}>{statusStyles[selectedTicket.status].label}</span>
            </div>

            <h3 className="text-sm font-heading text-foreground">{selectedTicket.category}</h3>
            <p className="text-xs text-muted-foreground font-devanagari">{selectedTicket.description}</p>

            {/* Timeline */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-heading tracking-wider text-gold-light">TICKET TIMELINE</h4>
              {[
                { label: 'CREATED', time: '14:32', text: `Reported by ${selectedTicket.citizen}`, color: 'bg-info' },
                { label: 'ACKNOWLEDGED', time: '14:45', text: `Assigned to ${selectedTicket.assignedTo}`, color: 'bg-safe' },
                ...(selectedTicket.status !== 'open' ? [{ label: 'IN PROGRESS', time: '15:20', text: 'Department contacted', color: 'bg-safe' as const }] : []),
                ...(selectedTicket.status === 'resolved' ? [{ label: 'RESOLVED', time: '18:00', text: 'Issue fixed. Photo proof uploaded.', color: 'bg-victory' as const }] : []),
                ...(selectedTicket.mlaCreditSent ? [{ label: 'CREDIT SENT', time: '18:05', text: 'WhatsApp attribution sent to citizen', color: 'bg-gold' as const }] : []),
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    {i < 3 && <div className="w-px h-6 bg-border" />}
                  </div>
                  <div>
                    <div className="text-[9px] font-heading tracking-wider text-muted-foreground">{item.label} — {item.time}</div>
                    <div className="text-[10px] text-foreground">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg text-[10px] font-heading tracking-wider gradient-saffron text-primary-foreground">RESOLVE</button>
              <button className="flex-1 py-2 rounded-lg text-[10px] font-heading tracking-wider bg-defeat/20 text-danger border border-defeat/30">ESCALATE</button>
            </div>

            {/* MLA Credit Toggle */}
            <div className="p-2 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-between">
              <span className="text-[10px] text-gold-light font-heading">Send MLA Credit?</span>
              <div className={`w-10 h-5 rounded-full bg-victory cursor-pointer`}>
                <div className="w-4 h-4 rounded-full bg-foreground translate-x-5 mt-0.5" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JanConnectTickets;

import { HierarchyBadge } from "@/components/HierarchyBadge";
import { FileText, ChevronRight, Users, Check } from "lucide-react";

const schemes = [
  { name: "लाडकी बहीण योजना", category: "Women", benefit: "₹1,500/month", eligibility: "Women 21-65, income < ₹2.5L", enrolled: 12400, target: 18000, method: "Aadhaar + Bank" },
  { name: "PM आवास योजना (Urban)", category: "Housing", benefit: "₹2.5L subsidy", eligibility: "No pucca house, EWS/LIG", enrolled: 3200, target: 5000, method: "Online portal" },
  { name: "आयुष्मान भारत PM-JAY", category: "Health", benefit: "₹5L/year cover", eligibility: "Annual income < ₹5L", enrolled: 8900, target: 15000, method: "Aadhaar + Ration" },
  { name: "PM किसान सम्मान निधि", category: "Agriculture", benefit: "₹6,000/year", eligibility: "Land-owning farmer", enrolled: 4500, target: 6000, method: "PM Kisan portal" },
  { name: "उज्ज्वला योजना 2.0", category: "Energy", benefit: "Free LPG connection", eligibility: "BPL household, no LPG", enrolled: 2100, target: 3500, method: "BPL card + Aadhaar" },
  { name: "फुले छात्रवृत्ति", category: "Education", benefit: "Tuition + stipend", eligibility: "SC/ST/OBC student", enrolled: 1800, target: 2500, method: "School application" },
  { name: "मुद्रा योजना (शिशु)", category: "Business", benefit: "Up to ₹50,000 loan", eligibility: "Small business owner", enrolled: 950, target: 2000, method: "Bank branch" },
];

const SchemeCatalogue = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="ward" label="L4-L6" />
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">Scheme Catalogue — योजना सूची</h1>

      {/* Eligibility wizard prompt */}
      <div className="gradient-card rounded-lg border border-saffron/20 p-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-heading text-foreground">🔍 ELIGIBILITY WIZARD</h3>
          <p className="text-[10px] text-muted-foreground">Answer 5 questions → See all eligible schemes ranked by value</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-xs font-heading gradient-saffron text-primary-foreground">START WIZARD</button>
      </div>

      <div className="space-y-3">
        {schemes.map(s => {
          const pct = Math.round((s.enrolled / s.target) * 100);
          return (
            <div key={s.name} className="gradient-card rounded-lg border border-border p-4 hover:border-saffron/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-devanagari text-foreground">{s.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] bg-info/10 text-info border border-info/20">{s.category}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-2">
                    <span className="text-saffron font-mono font-bold">{s.benefit}</span>
                    <span>Eligibility: {s.eligibility}</span>
                    <span>Method: {s.method}</span>
                  </div>
                  {/* Enrollment progress */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${pct >= 70 ? 'bg-victory' : pct >= 40 ? 'bg-safe' : 'bg-danger'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{s.enrolled.toLocaleString()} / {s.target.toLocaleString()} ({pct}%)</span>
                  </div>
                </div>
                <button className="ml-4 px-3 py-2 rounded-lg text-[10px] font-heading gradient-saffron text-primary-foreground flex items-center gap-1">
                  APPLY <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchemeCatalogue;

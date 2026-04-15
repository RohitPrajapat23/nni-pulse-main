import { useState } from "react";
import { HierarchyBadge } from "@/components/HierarchyBadge";
import { Home, AlertTriangle, Star, Check, MapPin, Phone } from "lucide-react";

const households = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `परिवार ${i + 1}`,
  address: `${100 + i}, गली ${Math.floor(i / 3) + 1}`,
  visited: i < 3,
  priority: i === 4 || i === 7,
  overdue: i === 5,
}));

const PagePramukh = () => {
  const [screen, setScreen] = useState<'home' | 'select' | 'survey' | 'confirm'>('home');
  const [selectedHH, setSelectedHH] = useState<typeof households[0] | null>(null);

  const visitedCount = households.filter(h => h.visited).length;

  return (
    <div className="max-w-sm mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="page" label="L6 Page" />
        <span className="text-[10px] font-mono text-muted-foreground">Page #42</span>
      </div>

      {screen === 'home' && (
        <div className="space-y-4">
          <h1 className="text-xl font-heading tracking-wider text-foreground font-devanagari">आज का कार्य — Today's Tasks</h1>

          {/* Progress Ring */}
          <div className="gradient-card rounded-lg border border-border p-6 flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(213,25%,20%)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(21,100%,45%)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset={`${2 * Math.PI * 42 * (1 - visitedCount / 50)}`} className="transition-all duration-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-mono font-bold text-saffron">{visitedCount}</span>
                <span className="text-[9px] text-muted-foreground">of 50</span>
              </div>
            </div>
            <span className="text-xs font-devanagari text-muted-foreground mt-2">घर भेंट शेष</span>
          </div>

          {/* Priority alerts */}
          {households.filter(h => h.priority).length > 0 && (
            <div className="p-3 rounded-lg bg-danger/10 border border-danger/20">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <span className="text-xs font-heading text-danger">PRIORITY — तुरंत संपर्क करें</span>
              </div>
              {households.filter(h => h.priority).map(h => (
                <div key={h.id} className="text-xs text-foreground font-devanagari">{h.name} — {h.address}</div>
              ))}
            </div>
          )}

          {/* Overdue */}
          {households.filter(h => h.overdue).length > 0 && (
            <div className="p-3 rounded-lg bg-safe/10 border border-safe/20">
              <span className="text-xs font-heading text-safe">⏰ OVERDUE FOLLOW-UPS</span>
              {households.filter(h => h.overdue).map(h => (
                <div key={h.id} className="text-xs text-foreground font-devanagari mt-1">{h.name}</div>
              ))}
            </div>
          )}

          {/* Big green button */}
          <button onClick={() => setScreen('select')} className="w-full py-5 rounded-xl text-lg font-heading tracking-wider gradient-saffron text-primary-foreground glow-saffron flex items-center justify-center gap-2">
            <Home className="w-6 h-6" /> भेंट दर्ज करें — LOG A VISIT
          </button>

          {/* Daily score */}
          <div className="gradient-card rounded-lg border border-border p-3 flex items-center justify-between">
            <span className="text-xs font-devanagari text-muted-foreground">आज का स्कोर</span>
            <div className="flex items-center gap-1">
              {[1,2,3].map(s => <Star key={s} className={`w-5 h-5 ${s <= visitedCount / 4 ? 'text-safe fill-safe' : 'text-muted-foreground/30'}`} />)}
            </div>
          </div>
        </div>
      )}

      {screen === 'select' && (
        <div className="space-y-3">
          <h2 className="text-lg font-heading tracking-wider text-foreground font-devanagari">परिवार चुनें — Select Household</h2>
          <div className="space-y-2">
            {households.map(h => (
              <button key={h.id} onClick={() => { setSelectedHH(h); setScreen('survey'); }} disabled={h.visited}
                className={`w-full p-3 rounded-lg border text-left transition-all ${h.visited ? 'bg-victory/5 border-victory/20 opacity-60' : h.priority ? 'bg-danger/5 border-danger/20' : 'gradient-card border-border hover:border-saffron/30'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-devanagari text-foreground">{h.name}</span>
                    <div className="text-[9px] text-muted-foreground flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{h.address}</div>
                  </div>
                  {h.visited && <Check className="w-5 h-5 text-victory" />}
                  {h.priority && !h.visited && <AlertTriangle className="w-4 h-4 text-danger" />}
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setScreen('home')} className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground text-xs font-heading">← BACK</button>
        </div>
      )}

      {screen === 'survey' && (
        <div className="space-y-4">
          <h2 className="text-lg font-heading tracking-wider text-foreground">Quick Survey — {selectedHH?.name}</h2>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs font-devanagari text-foreground mb-2">1. क्या परिवार घर पर है?</p>
              <div className="flex gap-2">
                <button className="flex-1 py-3 rounded-lg text-sm font-heading gradient-saffron text-primary-foreground">हाँ</button>
                <button className="flex-1 py-3 rounded-lg text-sm font-heading bg-secondary text-secondary-foreground">नहीं</button>
              </div>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs font-devanagari text-foreground mb-2">2. कोई समस्या बताई?</p>
              <div className="grid grid-cols-3 gap-2">
                {['🛣️ सड़क', '💧 पानी', '💡 बिजली', '🏥 स्वास्थ्य', '📚 शिक्षा', '❌ नहीं'].map(icon => (
                  <button key={icon} className="py-2 rounded-lg text-[10px] bg-secondary text-foreground hover:bg-saffron/10 hover:border-saffron/30 border border-border">{icon}</button>
                ))}
              </div>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs font-devanagari text-foreground mb-2">3. कितने संतुष्ट हैं?</p>
              <div className="flex gap-2 justify-center">
                {[1,2,3,4,5].map(s => <button key={s} className="text-2xl text-muted-foreground/30 hover:text-safe transition-colors">★</button>)}
              </div>
            </div>
          </div>
          <button onClick={() => setScreen('confirm')} className="w-full py-4 rounded-xl text-sm font-heading gradient-saffron text-primary-foreground glow-saffron">NEXT →</button>
        </div>
      )}

      {screen === 'confirm' && (
        <div className="space-y-4 text-center py-6">
          <div className="w-20 h-20 rounded-full bg-victory/20 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-victory" />
          </div>
          <h2 className="text-xl font-heading text-foreground font-devanagari">भेंट दर्ज!</h2>
          <p className="text-sm font-devanagari text-muted-foreground">Visit logged! कल की भेंट सूची अपडेट होगी।</p>
          <div className="flex gap-2">
            {[1,2,3].map(s => <Star key={s} className="w-6 h-6 text-safe fill-safe mx-auto" />)}
          </div>
          <button onClick={() => { setScreen('home'); setSelectedHH(null); }} className="w-full py-4 rounded-xl text-sm font-heading gradient-saffron text-primary-foreground">← HOME</button>
        </div>
      )}
    </div>
  );
};

export default PagePramukh;

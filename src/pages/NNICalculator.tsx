import { useState } from "react";
import { Target, Info } from "lucide-react";
import { NNIGauge } from "@/components/NNIGauge";
import { HierarchyBadge } from "@/components/HierarchyBadge";

const components = [
  { key: 'PTHL', label: 'Trust Index', weight: 0.30, source: 'Days since contact decay: e^(-days/90) × base_trust', freq: 'Daily at midnight', color: 'text-info' },
  { key: 'GNPS', label: 'Gov NPS', weight: 0.25, source: 'IVR weekly survey: 200 random voters, Rate 1-10', freq: 'Weekly Sunday 11pm', color: 'text-info' },
  { key: 'GXI', label: 'Grassroots', weight: 0.20, source: 'Page Pramukh visit logs ÷ total voters × 100', freq: 'Daily at midnight', color: 'text-info' },
  { key: 'VLV', label: 'Voter Value', weight: 0.15, source: 'Scheme benefits count × scheme_weight + influence_score', freq: 'On scheme receipt', color: 'text-info' },
  { key: 'CJM', label: 'Journey Stage', weight: 0.10, source: 'Avg funnel stage across all voters ÷ 7 × 100', freq: 'Daily at midnight', color: 'text-info' },
];

const NNICalculator = () => {
  const [values, setValues] = useState<Record<string, number>>({
    PTHL: 52, GNPS: 44, GXI: 38, VLV: 61, CJM: 35,
  });

  const nni = components.reduce((sum, c) => sum + values[c.key] * c.weight, 0);
  const nniRounded = Math.round(nni * 10) / 10;
  const winProb = Math.min(95, Math.max(5, Math.round(nni * 1.12 + 0.5)));
  const extraVotes = Math.max(0, Math.round((nni - 35) * 450));
  const zone = nni >= 65 ? 'Victory' : nni >= 50 ? 'Safe' : nni >= 35 ? 'Danger' : 'Defeat';
  const zoneColor = nni >= 65 ? 'text-victory' : nni >= 50 ? 'text-safe' : nni >= 35 ? 'text-warning' : 'text-danger';

  const getActions = () => {
    if (nni >= 65) return ["Maintain contact frequency", "Expand grateful voter base", "Prepare election day GOTV"];
    if (nni >= 50) return ["Increase scheme enrollment by 15%", "Resolve all overdue tickets", "Weekly ward visits for bottom wards"];
    if (nni >= 35) return ["Emergency scheme camps in weak wards", "Daily MLA visibility events", "Aggressive ticket resolution"];
    return ["CM intervention required", "Full organizational restructure", "Emergency resource deployment"];
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HierarchyBadge level="constituency" label="L2 Constituency" />
        <span className="text-muted-foreground text-xs">Worli - 181</span>
      </div>
      <h1 className="text-2xl font-heading tracking-wider text-foreground">NNI Live Calculator</h1>
      <p className="text-xs text-muted-foreground">Interactive Net Neta Index — See how every input affects the score</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Column 1 - Inputs */}
        <div className="gradient-card rounded-lg border border-info/20 overflow-hidden">
          <div className="px-4 py-3 bg-info/10 border-b border-info/20">
            <h2 className="text-sm font-heading tracking-wider text-info">INPUTS — Field Data</h2>
          </div>
          <div className="p-4 space-y-5">
            {components.map(c => (
              <div key={c.key}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-heading tracking-wider text-foreground">{c.key}</span>
                    <span className="text-[10px] text-muted-foreground">— {c.label}</span>
                  </div>
                  <span className="text-lg font-mono font-bold font-mono-data text-info">{values[c.key]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values[c.key]}
                  onChange={(e) => setValues({ ...values, [c.key]: Number(e.target.value) })}
                  className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-info"
                  style={{ accentColor: 'hsl(200, 100%, 46%)' }}
                />
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[9px] text-muted-foreground font-mono">0</span>
                  <span className="text-[8px] text-muted-foreground">{c.source}</span>
                  <span className="text-[9px] text-muted-foreground font-mono">100</span>
                </div>
                <div className="text-[8px] text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Info className="w-2.5 h-2.5" /> {c.freq} • Weight: {c.weight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 - Formula */}
        <div className="gradient-card rounded-lg border border-safe/20 overflow-hidden">
          <div className="px-4 py-3 bg-safe/10 border-b border-safe/20">
            <h2 className="text-sm font-heading tracking-wider text-safe">FORMULA — How Inputs Combine</h2>
          </div>
          <div className="p-4 space-y-4">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-[10px] font-mono text-safe mb-2">NNI = (PTHL × 0.30) + (GNPS × 0.25) + (GXI × 0.20) + (VLV × 0.15) + (CJM × 0.10)</p>
            </div>

            {/* Contribution breakdown */}
            <div className="space-y-2">
              {components.map(c => {
                const contribution = values[c.key] * c.weight;
                const pct = nni > 0 ? (contribution / nni) * 100 : 0;
                return (
                  <div key={c.key}>
                    <div className="flex items-center justify-between text-[10px] mb-0.5">
                      <span className="font-mono text-foreground">
                        {c.key}: {values[c.key]} × {c.weight} = <span className="text-saffron font-bold">{contribution.toFixed(1)}</span>
                      </span>
                      <span className="text-muted-foreground">{pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-saffron rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key driver */}
            <div className="flex gap-2 mt-3">
              {(() => {
                const sorted = components.map(c => ({ ...c, contribution: values[c.key] * c.weight })).sort((a, b) => b.contribution - a.contribution);
                return (
                  <>
                    <div className="flex-1 p-2 rounded bg-victory/10 border border-victory/20 text-center">
                      <div className="text-[8px] text-victory font-heading tracking-wider">KEY DRIVER</div>
                      <div className="text-sm font-mono font-bold text-victory">{sorted[0].key}</div>
                    </div>
                    <div className="flex-1 p-2 rounded bg-defeat/10 border border-defeat/20 text-center">
                      <div className="text-[8px] text-danger font-heading tracking-wider">BIGGEST OPPORTUNITY</div>
                      <div className="text-sm font-mono font-bold text-danger">{sorted[sorted.length - 1].key}</div>
                    </div>
                  </>
                );
              })()}
            </div>

            {/* Running Total */}
            <div className="p-3 bg-secondary/50 rounded-lg text-center">
              <div className="text-[9px] font-heading tracking-wider text-muted-foreground mb-1">RUNNING TOTAL</div>
              <div className="text-3xl font-mono font-bold font-mono-data text-saffron">{nniRounded}</div>
            </div>
          </div>
        </div>

        {/* Column 3 - Output */}
        <div className="gradient-card rounded-lg border border-victory/20 overflow-hidden">
          <div className="px-4 py-3 bg-victory/10 border-b border-victory/20">
            <h2 className="text-sm font-heading tracking-wider text-victory">OUTPUTS — What The Score Produces</h2>
          </div>
          <div className="p-4 space-y-4">
            {/* NNI Gauge */}
            <div className="flex justify-center">
              <NNIGauge score={Math.round(nni)} label="Worli Constituency" />
            </div>

            {/* Zone */}
            <div className={`p-3 rounded-lg text-center ${nni >= 65 ? 'rag-victory' : nni >= 50 ? 'rag-safe' : nni >= 35 ? 'rag-danger' : 'rag-defeat'}`}>
              <div className="text-lg font-heading tracking-wider">{zone} Zone</div>
            </div>

            {/* Win Probability */}
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <div className="text-[9px] font-heading tracking-wider text-muted-foreground">WIN PROBABILITY</div>
                <div className="text-xl font-mono font-bold font-mono-data text-foreground">{winProb}%</div>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-secondary flex items-center justify-center" style={{ borderColor: `hsl(${winProb > 60 ? '145, 100%, 39%' : winProb > 45 ? '51, 100%, 50%' : '0, 100%, 42%'})` }}>
                <span className="text-sm font-mono font-bold">{winProb}%</span>
              </div>
            </div>

            {/* Extra Votes */}
            <div className="p-3 bg-secondary/50 rounded-lg">
              <div className="text-[9px] font-heading tracking-wider text-muted-foreground">EXTRA VOTES WON</div>
              <div className="text-xl font-mono font-bold text-victory">↑ {extraVotes.toLocaleString()}</div>
              <div className="text-[8px] text-muted-foreground">vs baseline of NNI=35</div>
            </div>

            {/* Action Required */}
            <div className={`p-3 rounded-lg ${nni >= 65 ? 'bg-victory/10' : nni >= 50 ? 'bg-safe/10' : nni >= 35 ? 'bg-danger/10' : 'bg-defeat/10'}`}>
              <div className={`text-[9px] font-heading tracking-wider mb-2 ${zoneColor}`}>ACTION REQUIRED</div>
              <ul className="space-y-1">
                {getActions().map((a, i) => (
                  <li key={i} className="text-[10px] text-foreground flex items-start gap-1">
                    <Target className="w-3 h-3 mt-0.5 flex-shrink-0 text-saffron" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NNICalculator;

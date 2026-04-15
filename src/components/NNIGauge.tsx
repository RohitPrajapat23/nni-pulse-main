interface NNIGaugeProps {
  score: number;
  label?: string;
}

export function NNIGauge({ score, label }: NNIGaugeProps) {
  const getStatus = (s: number) => {
    if (s >= 75) return { color: "hsl(145, 100%, 32%)", label: "Victory Zone", class: "text-victory" };
    if (s >= 55) return { color: "hsl(42, 100%, 42%)", label: "Safe Zone", class: "text-safe" };
    if (s >= 40) return { color: "hsl(26, 100%, 45%)", label: "Danger Zone", class: "text-warning" };
    return { color: "hsl(0, 100%, 42%)", label: "Defeat Zone", class: "text-danger" };
  };

  const status = getStatus(score);
  const circumference = 2 * Math.PI * 60;
  const dashOffset = circumference - (score / 100) * circumference * 0.75;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-[135deg]">
          <circle cx="70" cy="70" r="60" fill="none" stroke="hsl(220, 13%, 91%)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * 0.25} />
          <circle cx="70" cy="70" r="60" fill="none" stroke={status.color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} className="transition-all duration-1000 ease-out" style={{ filter: `drop-shadow(0 0 6px ${status.color})` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-mono font-bold font-mono-data text-foreground">{score}</span>
          <span className="text-[10px] font-heading tracking-wider text-muted-foreground">NNI SCORE</span>
        </div>
      </div>
      <span className={`mt-2 text-xs font-heading tracking-wider uppercase ${status.class}`}>{status.label}</span>
      {label && <span className="text-[10px] text-muted-foreground mt-0.5">{label}</span>}
    </div>
  );
}

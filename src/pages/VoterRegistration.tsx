import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Cpu, User, ClipboardList, FileText, Star } from "lucide-react";
import { HierarchyBadge } from "@/components/HierarchyBadge";

const steps = [
  { label: "Demographics", icon: User },
  { label: "Eligibility", icon: FileText },
  { label: "Behaviour Survey", icon: ClipboardList },
  { label: "Analysis", icon: Cpu },
];

const schemes = [
  { name: "लाडकी बहीण योजना", category: "Women", question: "Is there a woman aged 21-60 in household?", benefit: "₹1,500/month" },
  { name: "PM आवास योजना", category: "Housing", question: "Does family lack pucca house?", benefit: "₹2.5L subsidy" },
  { name: "आयुष्मान भारत", category: "Health", question: "Annual income < ₹5 lakh?", benefit: "₹5L/year cover" },
  { name: "PM किसान सम्मान", category: "Agriculture", question: "Does family own farmland?", benefit: "₹6,000/year" },
  { name: "उज्ज्वला योजना", category: "Energy", question: "No LPG connection?", benefit: "Free LPG" },
  { name: "फुले छात्रवृत्ति", category: "Education", question: "Student in family?", benefit: "Tuition + stipend" },
  { name: "मुद्रा योजना", category: "Business", question: "Self-employed or micro-business?", benefit: "Up to ₹50,000" },
];

const constituencies = ["Worli", "Prabhadevi", "Lower Parel", "Kasba Peth", "Dadar", "Mahim"];
const occupations = ["Farmer", "Shop Owner", "Service", "Homemaker", "Student", "Daily Wage", "Self-Employed", "Retired"];
const casteCategories = ["General", "SC", "ST", "OBC", "EWS"];
const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"];

interface TouchPointsData {
  sms: number;
  calls: number;
  rallies: number;
}

interface VoterFormData {
  name: string;
  age: number;
  gender: string;
  voterId: string;
  phone: string;
  constituency: string;
  ward: string;
  occupation: string;
  caste: string;
  religion: string;
  schemes: Record<string, boolean>;
  survey: Record<string, string | string[]>;
  mlaVisits: number;
  touchPoints: TouchPointsData;
}

interface BehaviourQuestion {
  id: string;
  text: string;
  type: "multi" | "choice" | "rating" | "nps" | "text";
  options: string[];
  weight: number;
  scoringMap?: Record<string, number>;
}

const behaviorQuestions: BehaviourQuestion[] = [
  {
    id: "B1",
    text: "What is the biggest issue in your area?",
    type: "multi",
    options: ["Roads", "Water", "Employment", "Health", "Education", "Safety", "Other"],
    weight: 0.1,
    scoringMap: { Roads: 0.5, Water: 0.6, Employment: 0.4, Health: 0.6, Education: 0.7, Safety: 0.4, Other: 0.5 },
  },
  {
    id: "B2",
    text: "Has the citizen received any government scheme benefit in the last 2 years?",
    type: "choice",
    options: ["Yes", "No", "Not sure"],
    weight: 0.15,
    scoringMap: { Yes: 1.0, No: 0.3, "Not sure": 0.4 },
  },
  {
    id: "B3",
    text: "Who solved the last local issue for the citizen?",
    type: "choice",
    options: ["MLA", "Municipal", "Central Govt", "No one", "Don’t know"],
    weight: 0.2,
    scoringMap: { MLA: 1.0, Municipal: 0.6, "Central Govt": 0.4, "No one": 0.1, "Don’t know": 0.3 },
  },
  {
    id: "B4",
    text: "How satisfied are you with local services?",
    type: "rating",
    options: ["1", "2", "3", "4", "5"],
    weight: 0.15,
  },
  {
    id: "B5",
    text: "How often does the MLA or worker visit your area?",
    type: "choice",
    options: ["Never", "Once every 6 months", "Monthly", "Weekly"],
    weight: 0.1,
    scoringMap: { Never: 0.1, "Once every 6 months": 0.4, Monthly: 0.7, Weekly: 1.0 },
  },
  {
    id: "B6",
    text: "Have you used or heard about the local health program?",
    type: "choice",
    options: ["Used it", "Heard but not used", "Never heard"],
    weight: 0.1,
    scoringMap: { "Used it": 1.0, "Heard but not used": 0.5, "Never heard": 0.2 },
  },
  {
    id: "B7",
    text: "How likely are you to recommend your MLA to a friend? (1-10)",
    type: "nps",
    options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    weight: 0.2,
  },
  {
    id: "B8",
    text: "What is the top priority you want the MLA to address?",
    type: "text",
    options: [],
    weight: 0.1,
  },
];

function calculateVCS(survey: Record<string, string | string[]>, mlaVisits: number, touchPoints: TouchPointsData) {
  let totalScore = 0;
  let totalWeight = 0;

  for (const q of behaviorQuestions) {
    const answer = survey[q.id];
    if (!answer) continue;

    let qScore = 0.5;

    if (q.type === "rating") {
      qScore = (Number(answer) - 1) / 4;
    } else if (q.type === "nps") {
      qScore = (Number(answer) - 1) / 9;
    } else if (q.type === "text") {
      qScore = typeof answer === "string" && answer.trim().length > 0 ? 0.65 : 0.35;
    } else if (q.scoringMap) {
      const key = Array.isArray(answer) ? answer[0] : answer;
      qScore = q.scoringMap[key] ?? 0.5;
    }

    totalScore += qScore * q.weight;
    totalWeight += q.weight;
  }

  const surveyScore = totalWeight ? totalScore / totalWeight : 0.5;
  const visitScore = Math.min(mlaVisits / 12, 1);
  const touchScore = Math.min((touchPoints.sms + touchPoints.calls + touchPoints.rallies) / 15, 1);
  const combined = surveyScore * 0.68 + visitScore * 0.2 + touchScore * 0.12;

  return Math.min(1, Math.max(0, Math.round(combined * 100) / 100));
}

function classifyVoter(vcs: number): { segment: string; color: string; description: string } {
  if (vcs >= 0.75) return { segment: "Supporter", color: "text-victory", description: "High trust, strong party alignment, and frequent positive contact." };
  if (vcs >= 0.5) return { segment: "Persuadable", color: "text-safe", description: "Open to outreach — targeted follow-up will move them toward support." };
  if (vcs >= 0.3) return { segment: "Neutral", color: "text-warning", description: "Undecided. Needs relationship-building and service delivery." };
  return { segment: "Opposed", color: "text-danger", description: "Low trust — requires long-term issue resolution and outreach." };
}

function getTopIssues(survey: Record<string, string | string[]>): string[] {
  const issue = survey["B1"];
  return issue ? [Array.isArray(issue) ? issue[0] : issue] : ["Issue not specified"];
}

function getTrustLevel(survey: Record<string, string | string[]>): string {
  const nps = Number(survey["B7"] || 5);
  if (nps >= 8) return "High";
  if (nps >= 5) return "Medium";
  return "Low";
}

function getEngagementType(survey: Record<string, string | string[]>): string {
  const freq = survey["B5"];
  if (freq === "Weekly") return "Active — Weekly contact";
  if (freq === "Monthly") return "Regular — Monthly contact";
  if (freq === "Once every 6 months") return "Passive — Bi-annual contact";
  return "Dormant — No contact";
}

function getTotalTouchPoints(touchPoints: TouchPointsData) {
  return touchPoints.sms + touchPoints.calls + touchPoints.rallies;
}

const VoterRegistration = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<VoterFormData>({
    name: "",
    age: 35,
    gender: "",
    voterId: "",
    phone: "",
    constituency: "",
    ward: "",
    occupation: "",
    caste: "",
    religion: "",
    schemes: {},
    survey: {},
    mlaVisits: 0,
    touchPoints: { sms: 0, calls: 0, rallies: 0 },
  });

  const vcs = useMemo(() => calculateVCS(formData.survey, formData.mlaVisits, formData.touchPoints), [formData.survey, formData.mlaVisits, formData.touchPoints]);
  const classification = useMemo(() => classifyVoter(vcs), [vcs]);

  const nextStep = () => {
    setStep(prevStep => {
      if (prevStep < steps.length - 1) {
        setSubmitted(false);
        return prevStep + 1;
      }

      setSubmitted(true);
      return prevStep;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <HierarchyBadge level="constituency" label="L2" />
          <span className="text-xs text-muted-foreground">Worli Constituency • 181</span>
        </div>
        <div className="text-sm text-muted-foreground">4-step registration wizard — demographics, eligibility, survey, analysis</div>
      </div>

      <div className="bg-card border border-border rounded-[30px] shadow-soft p-6">
        <div className="grid grid-cols-4 gap-3">
          {steps.map((item, index) => (
            <div key={item.label} className="flex items-center gap-3 col-span-4 sm:col-span-1">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-heading transition-all ${index === step ? "bg-saffron text-primary-foreground shadow-lg" : index < step ? "bg-victory text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-[11px] font-semibold ${index === step ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</p>
                <p className="text-[9px] text-muted-foreground">Step {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-[30px] shadow-soft p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading tracking-wider text-foreground">Step 1 — Demographics</h1>
                <p className="text-sm text-muted-foreground">Collect voter identity details before eligibility review.</p>
              </div>
              <span className="text-[11px] uppercase text-muted-foreground tracking-[0.16em]">Demographic card</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Full Name</label>
                  <input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Voter ID Number</label>
                  <input
                    value={formData.voterId}
                    onChange={e => setFormData({ ...formData, voterId: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                    placeholder="ABCDE1234F"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Phone Number</label>
                  <input
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                    placeholder="10-digit mobile"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Constituency</label>
                  <select
                    value={formData.constituency}
                    onChange={e => setFormData({ ...formData, constituency: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  >
                    <option value="">Select constituency</option>
                    {constituencies.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Age</label>
                  <input
                    type="number"
                    min={18}
                    max={100}
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Ward / Mohalla</label>
                  <input
                    value={formData.ward}
                    onChange={e => setFormData({ ...formData, ward: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                    placeholder="Ward or Mohalla"
                  />
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Occupation</label>
                  <select
                    value={formData.occupation}
                    onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  >
                    <option value="">Select occupation</option>
                    {occupations.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Caste Category</label>
                  <select
                    value={formData.caste}
                    onChange={e => setFormData({ ...formData, caste: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  >
                    <option value="">Select caste</option>
                    {casteCategories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Religion</label>
                  <select
                    value={formData.religion}
                    onChange={e => setFormData({ ...formData, religion: e.target.value })}
                    className="w-full rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  >
                    <option value="">Select religion</option>
                    {religions.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading tracking-wider text-foreground">Step 2 — Eligibility</h1>
                <p className="text-sm text-muted-foreground">Keep the existing scheme eligibility logic intact and mark eligibility clearly.</p>
              </div>
              <span className="text-[11px] uppercase text-muted-foreground tracking-[0.16em]">Scheme check</span>
            </div>
            <div className="space-y-4">
              {schemes.map(s => (
                <div key={s.name} className={`p-4 rounded-3xl border transition-all ${formData.schemes[s.name] ? 'bg-victory/10 border-victory/30' : 'bg-muted/60 border-border'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-foreground">{s.name}</span>
                        <span className="text-[9px] rounded-full bg-muted px-2 py-1 text-muted-foreground">{s.category}</span>
                        <span className="text-[9px] font-mono text-saffron">{s.benefit}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{s.question}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, schemes: { ...formData.schemes, [s.name]: !formData.schemes[s.name] } })}
                      className={`relative inline-flex h-9 w-14 shrink-0 items-center rounded-full transition-colors ${formData.schemes[s.name] ? 'bg-victory' : 'bg-muted'}`}
                    >
                      <span className={`absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-card shadow transform transition-transform ${formData.schemes[s.name] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  {formData.schemes[s.name] && (
                    <div className="mt-3 rounded-2xl bg-victory/10 p-3 text-[12px] text-victory border border-victory/20">✅ Eligible for this scheme — follow up within 7 days.</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading tracking-wider text-foreground">Step 3 — Behaviour Survey</h1>
                <p className="text-sm text-muted-foreground">Collect opinions, satisfaction, engagement, and contact history for a better VCS.</p>
              </div>
              <span className="text-[11px] uppercase text-muted-foreground tracking-[0.16em]">Survey + touchpoints</span>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="rounded-3xl border border-border bg-muted/50 p-5 shadow-sm">
                <h2 className="text-sm font-heading tracking-wider text-foreground mb-3">MLA Visit Count</h2>
                <input
                  type="number"
                  min={0}
                  value={formData.mlaVisits}
                  onChange={e => setFormData({ ...formData, mlaVisits: Number(e.target.value) })}
                  className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                  placeholder="Number of visits"
                />
                <p className="text-[10px] text-muted-foreground mt-2">Visits recorded in the last 30 days for this voter.</p>
              </div>
              <div className="rounded-3xl border border-border bg-muted/50 p-5 shadow-sm">
                <h2 className="text-sm font-heading tracking-wider text-foreground mb-3">Historical Touch Points</h2>
                <div className="space-y-3">
                  {[
                    { key: "sms", label: "SMS" },
                    { key: "calls", label: "Calls" },
                    { key: "rallies", label: "Rallies" },
                  ].map(item => (
                    <div key={item.key} className="flex items-center gap-3">
                      <label className="w-24 text-xs text-muted-foreground">{item.label}</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.touchPoints[item.key as keyof TouchPointsData]}
                        onChange={e => setFormData({
                          ...formData,
                          touchPoints: {
                            ...formData.touchPoints,
                            [item.key]: Number(e.target.value),
                          },
                        })}
                        className="w-full rounded-2xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-3">Track outreach history through SMS, calls and rallies.</p>
              </div>
            </div>

            <div className="space-y-4">
              {behaviorQuestions.map(q => (
                <div key={q.id} className="rounded-3xl border border-border bg-muted/50 p-5 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-saffron/10 px-3 py-1 text-[10px] font-mono text-saffron">{q.id}</span>
                    <p className="text-sm font-semibold text-foreground">{q.text}</p>
                  </div>

                  {q.type === 'text' ? (
                    <textarea
                      value={(formData.survey[q.id] as string) || ''}
                      onChange={e => setFormData({ ...formData, survey: { ...formData.survey, [q.id]: e.target.value } })}
                      className="w-full min-h-[120px] rounded-3xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
                      placeholder="Write the citizen's view here..."
                    />
                  ) : q.type === 'nps' ? (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map(o => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setFormData({ ...formData, survey: { ...formData.survey, [q.id]: o } })}
                          className={`rounded-2xl border px-3 py-2 text-xs transition-all ${formData.survey[q.id] === o ? 'bg-saffron text-primary-foreground border-saffron' : 'bg-card border-border text-foreground hover:border-saffron/50'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  ) : q.type === 'rating' ? (
                    <div className="flex items-center gap-2">
                      {q.options.map(o => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setFormData({ ...formData, survey: { ...formData.survey, [q.id]: o } })}
                          className={`rounded-full p-3 transition-all ${Number(o) <= Number(formData.survey[q.id] || 0) ? 'bg-saffron text-primary-foreground shadow-md' : 'bg-card text-muted-foreground hover:bg-saffron/10'}`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      ))}
                      {formData.survey[q.id] && <span className="text-xs font-mono text-muted-foreground ml-2">{formData.survey[q.id]}/5</span>}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map(o => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => setFormData({ ...formData, survey: { ...formData.survey, [q.id]: o } })}
                          className={`px-3 py-1.5 rounded-full text-xs transition-all ${formData.survey[q.id] === o ? 'bg-saffron text-primary-foreground shadow-sm' : 'bg-card border border-border text-foreground hover:border-saffron/40'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading tracking-wider text-foreground">Step 4 — Analysis</h1>
                <p className="text-sm text-muted-foreground">Review the real-time VCS, segment, and the insights panel before final save.</p>
              </div>
              <span className="text-[11px] uppercase text-muted-foreground tracking-[0.16em]">Summary</span>
            </div>

            <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
              <div className="rounded-[30px] border border-border bg-muted/50 p-6 text-center shadow-sm">
                <div className="relative mx-auto mb-4 h-44 w-44">
                  <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke={vcs >= 0.75 ? "hsl(var(--victory-green))" : vcs >= 0.5 ? "hsl(var(--safe-amber))" : vcs >= 0.3 ? "hsl(var(--danger-orange))" : "hsl(var(--defeat-red))"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 52}
                      strokeDashoffset={2 * Math.PI * 52 * (1 - vcs)}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-mono font-bold text-foreground">{vcs.toFixed(2)}</span>
                    <span className="text-[10px] uppercase text-muted-foreground tracking-[0.24em]">VCS</span>
                  </div>
                </div>

                <div className={`mx-auto inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${classification.color} ${vcs >= 0.75 ? 'bg-victory/10 border-victory/30' : vcs >= 0.5 ? 'bg-safe/10 border-safe/30' : vcs >= 0.3 ? 'bg-warning/10 border-warning/30' : 'bg-defeat/10 border-defeat/30'}`}>
                  {classification.segment}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 rounded-[30px] border border-border bg-card p-4 shadow-sm">
                  <div className="rounded-2xl border border-border bg-muted/70 p-4 text-center">
                    <div className="text-base font-bold text-foreground">{getTopIssues(formData.survey)[0]}</div>
                    <p className="text-[10px] text-muted-foreground mt-2">Top issue</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/70 p-4 text-center">
                    <div className="text-base font-bold text-foreground">{getTrustLevel(formData.survey)}</div>
                    <p className="text-[10px] text-muted-foreground mt-2">Trust level</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/70 p-4 text-center">
                    <div className="text-base font-bold text-foreground">{getEngagementType(formData.survey)}</div>
                    <p className="text-[10px] text-muted-foreground mt-2">Engagement type</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-muted/70 p-4 text-center">
                    <div className="text-base font-bold text-foreground">{getTotalTouchPoints(formData.touchPoints)}</div>
                    <p className="text-[10px] text-muted-foreground mt-2">Total touch points</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-border bg-muted/50 p-4">
                    <h3 className="text-xs font-heading uppercase tracking-[0.18em] text-muted-foreground mb-3">MLA Visits</h3>
                    <div className="text-3xl font-bold text-foreground">{formData.mlaVisits}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">Recorded visits included in score.</p>
                  </div>
                  <div className="rounded-3xl border border-border bg-muted/50 p-4">
                    <h3 className="text-xs font-heading uppercase tracking-[0.18em] text-muted-foreground mb-3">Touch Points</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-foreground">
                        <span>SMS</span>
                        <span>{formData.touchPoints.sms}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-foreground">
                        <span>Calls</span>
                        <span>{formData.touchPoints.calls}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-foreground">
                        <span>Rallies</span>
                        <span>{formData.touchPoints.rallies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center py-8">
            <div className="w-20 h-20 rounded-full bg-victory/10 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-victory" />
            </div>
            <h2 className="text-lg font-heading tracking-wider text-foreground">पंजीकरण सफल! Registration Complete</h2>
            <div className="max-w-md mx-auto p-4 bg-victory/5 border border-victory/20 rounded-lg">
              <p className="text-sm font-devanagari text-foreground">
                धन्यवाद {formData.name || '[Name]'} जी! आपका पंजीकरण हो गया है। आपका VCS Score: <strong className="text-saffron">{vcs.toFixed(2)}</strong> ({classification.segment})। 7 दिनों में हम आपसे संपर्क करेंगे। — सेवा ग्रिड
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">✅ WhatsApp sent • ✅ CRM updated • ✅ VCS calculated • ✅ Segment: {classification.segment}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            setStep(Math.max(0, step - 1));
            setSubmitted(false);
          }}
          disabled={step === 0}
          className="px-4 py-2 rounded-lg text-xs font-heading tracking-wider bg-muted text-muted-foreground disabled:opacity-30 hover:bg-muted/80 transition-all flex items-center gap-1 border border-border"
        >
          <ChevronLeft className="w-4 h-4" /> BACK
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 rounded-lg text-xs font-heading tracking-wider bg-saffron text-primary-foreground shadow-sm hover:bg-saffron/90 transition-all flex items-center gap-1"
        >
          {step === steps.length - 1 ? "SAVE" : "NEXT"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {submitted && (
        <div className="rounded-3xl border border-saffron/20 bg-saffron/10 p-4 text-sm text-foreground">
          Voter details have been saved and the VCS is ready for CRM update.
        </div>
      )}
    </div>
  );
};

export default VoterRegistration;

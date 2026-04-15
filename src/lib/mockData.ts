export interface ActivityItem {
  id: string;
  userName: string;
  activityType: string;
  timestamp: string;
  status: "completed" | "in_progress" | "pending" | "failed";
}

export const PAGE_SIZE = 10;

export const statusConfig: Record<ActivityItem["status"], { dot: string; label: string; badge: string }> = {
  completed: { dot: "bg-victory", label: "Completed", badge: "bg-victory/10 text-victory border-victory/20" },
  in_progress: { dot: "bg-info", label: "In Progress", badge: "bg-info/10 text-info border-info/20" },
  pending: { dot: "bg-safe", label: "Pending", badge: "bg-safe/10 text-safe border-safe/20" },
  failed: { dot: "bg-defeat", label: "Failed", badge: "bg-defeat/10 text-defeat border-defeat/20" },
};

const types = [
  "Voter Registered",
  "Ticket Resolved",
  "Scheme Enrolled",
  "Field Visit Logged",
  "Alert Escalated",
  "NNI Recalculated",
  "Complaint Filed",
  "Survey Completed",
];

const names = [
  "Priya Sharma",
  "Rajesh Patil",
  "Amit Deshmukh",
  "Sneha Jadhav",
  "Vikram Shinde",
  "Pooja Kulkarni",
  "Rahul More",
  "Anita Chavan",
  "Suresh Pawar",
  "Kavita Gaikwad",
];

const statuses: ActivityItem["status"][] = ["completed", "in_progress", "pending", "failed"];

export function generateMockActivities(count = 50): ActivityItem[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => ({
    id: `act-${i + 1}`,
    userName: names[i % names.length],
    activityType: types[i % types.length],
    timestamp: new Date(now - i * 1000 * 60 * (3 + Math.random() * 15)).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
}

export interface TouchPointRecord {
  id: string;
  voterName: string;
  household: string;
  visits: number;
  lastVisit: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  persona: string;
}

export const touchPointData: TouchPointRecord[] = [
  { id: "v1", voterName: "Smt. Meena Deshmukh", household: "Prabhadevi W5-12", visits: 7, lastVisit: "12 Apr 2026", sentiment: "Positive", persona: "Senior Citizen" },
  { id: "v2", voterName: "Shri Ramesh Patil", household: "Worli Naka W2-08", visits: 5, lastVisit: "11 Apr 2026", sentiment: "Neutral", persona: "Shop Owner" },
  { id: "v3", voterName: "Smt. Kavita Jadhav", household: "Lower Parel W7-03", visits: 4, lastVisit: "10 Apr 2026", sentiment: "Positive", persona: "Working Professional" },
  { id: "v4", voterName: "Shri Sunil Shinde", household: "Kasba Peth W1-15", visits: 2, lastVisit: "8 Apr 2026", sentiment: "Negative", persona: "Daily Wage Worker" },
  { id: "v5", voterName: "Smt. Anita Pawar", household: "Worli Sea Face W3-22", visits: 6, lastVisit: "13 Apr 2026", sentiment: "Positive", persona: "Educator" },
  { id: "v6", voterName: "Shri Prakash More", household: "Prabhadevi W5-09", visits: 1, lastVisit: "2 Apr 2026", sentiment: "Neutral", persona: "Small Business Owner" },
  { id: "v7", voterName: "Smt. Sunita Gaikwad", household: "Lower Parel W7-18", visits: 3, lastVisit: "9 Apr 2026", sentiment: "Negative", persona: "Young Voter" },
  { id: "v8", voterName: "Shri Vijay Kulkarni", household: "Kasba Peth W1-04", visits: 8, lastVisit: "14 Apr 2026", sentiment: "Positive", persona: "Community Leader" },
];

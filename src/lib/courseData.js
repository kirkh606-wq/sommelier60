// Week metadata
export const WEEKS = [
  { num: 1, name: "The Foundation", badge: "wk1", color: "bg-purple-100 text-purple-800" },
  { num: 2, name: "The Grapes", badge: "wk2", color: "bg-amber-100 text-amber-800" },
  { num: 3, name: "The Regions", badge: "wk3", color: "bg-sky-100 text-sky-700" },
  { num: 4, name: "The Floor", badge: "wk4", color: "bg-emerald-100 text-emerald-800" },
  { num: 5, name: "Deep Cuts I", badge: "wk5", color: "bg-amber-100 text-amber-800" },
  { num: 6, name: "Deep Cuts II", badge: "wk6", color: "bg-sky-100 text-sky-700" },
  { num: 7, name: "Deep Cuts III", badge: "wk7", color: "bg-emerald-100 text-emerald-800" },
  { num: 8, name: "Mastery", badge: "wk8", color: "bg-pink-100 text-pink-700" },
  { num: 9, name: "Final Week", badge: "wk9", color: "bg-amber-100 text-amber-800" },
];

export const XP_PER_LEVEL = 200;
export const PASS_THRESHOLD = 0.6;
export const FINAL_PASS_THRESHOLD = 0.85;
export const TOTAL_DAYS = 60;

// This is the full course data array - each day has content, questions, and retries
// For brevity in source, loading from embedded data
export const DAYS = [];

// We'll load day data dynamically from a large data source
// The data will be initialized when the app loads
export function getDayData(dayNum) {
  return DAYS.find(d => d.day === dayNum);
}

export function getWeekDays(weekNum) {
  return DAYS.filter(d => d.week === weekNum);
}

export function getWeekForDay(dayNum) {
  const day = getDayData(dayNum);
  return day ? WEEKS.find(w => w.num === day.week) : null;
}
import { PantryDocument, ScheduleSchema } from "@/firebase/models/Pantry";

export function parseTime(timeStr: string): number {
  // Parses "12:00 PM" into minutes from midnight
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (hours === 12) {
    hours = 0;
  }

  if (modifier === "PM") {
    hours += 12;
  }

  return hours * 60 + minutes;
}

export function isPantryOpenNow(pantry: PantryDocument): boolean {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const allSchedules: ScheduleSchema[] = [
    ...(pantry.schedules || []),
    ...(pantry.services?.flatMap((s) => s.schedules || []) || []),
  ];

  return allSchedules.some((s) => {
    if (s.weekDay !== currentDay) return false;
    try {
      const start = parseTime(s.startTime);
      const end = parseTime(s.endTime);
      return currentMinutes >= start && currentMinutes <= end;
    } catch (e) {
      return false;
    }
  });
}

export function isPantryOpenOnDay(
  pantry: PantryDocument,
  day: string
): boolean {
  if (day === "Any day") return true;

  const allSchedules: ScheduleSchema[] = [
    ...(pantry.schedules || []),
    ...(pantry.services?.flatMap((s) => s.schedules || []) || []),
  ];

  return allSchedules.some((s) => s.weekDay === day);
}

export function pantryHasFoodTypes(
  pantry: PantryDocument,
  foodTypes: string[]
): boolean {
  if (foodTypes.length === 0) return true;

  const pantryFoodTypes = new Set(
    pantry.services?.flatMap((s) => s.foodOfferings || []) || []
  );

  // Check if there is ANY overlap between requested food types and pantry's offerings
  return foodTypes.some((ft) => pantryFoodTypes.has(ft));
}

export function getPantryStatus(
  pantry: PantryDocument
): "open-now" | "open-today" | "closed-today" {
  if (isPantryOpenNow(pantry)) return "open-now";

  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[now.getDay()];

  if (isPantryOpenOnDay(pantry, currentDay)) return "open-today";

  return "closed-today";
}

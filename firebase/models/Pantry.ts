import { GeoPoint } from "firebase/firestore";

export interface ScheduleSchema {
  startTime: string;
  endTime: string;
  weekDay: string;
  notes?: string;
  contactForHoursMessage?: string;
  everyOtherWeekIndicator?: boolean;
}

export interface ServiceSchema {
  name: string;
  categoryDescription: string;
  foodProgramTypeDescription: string;
  foodOfferings?: string[];
  notes?: string;
  schedules: ScheduleSchema[];
}

export interface Review {
  id: string;
  pantryId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface PantryDocument {
  id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  coordinates: GeoPoint;
  website?: string;
  aboutUs?: string;
  contactName?: string;
  notes?: string;
  schedules: ScheduleSchema[];
  services: ServiceSchema[];
  hearts?: string[];
}

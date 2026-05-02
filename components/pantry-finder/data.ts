export type PantrySchedule = {
  weekDay: string;
  start: string;
  end: string;
  notes?: string;
};

export type PantryService = {
  name: string;
  category: string;
  program?: string;
  food: string[];
  schedules: PantrySchedule[];
};

export type Pantry = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  about?: string;
  schedules: PantrySchedule[];
  services: PantryService[];
  loves: number;
  followers: number;
  distanceMi: number;
  status: "open-now" | "open-today" | "closed-today";
};

export const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const ALL_FOOD_TYPES = [
  "Dairy",
  "Eggs",
  "Fruits & Vegetables",
  "Meat",
  "Shelf Stable/Non-Perishable Goods",
  "Prepared Food / Grab and Go",
  "Household Products",
  "Toiletries / Hygiene Products",
  "Pet Food / Supplies",
  "Diapers",
  "Other",
];

export const PANTRIES: Pantry[] = [
  {
    id: "O5Fyb4ZkN9EqUhksQZyl",
    name: "Newton Food Pantry",
    address: "1000 Commonwealth Avenue, Newton, MA 02459",
    latitude: 42.3374309,
    longitude: -71.2088565,
    phone: "617-796-1233",
    about:
      "Serving the Newton community with fresh food distributions and appointment-based services.",
    schedules: [
      {
        weekDay: "Wednesday",
        start: "12:00 PM",
        end: "7:00 PM",
        notes: "12–3pm appointment only; 3–7pm walk-in",
      },
      {
        weekDay: "Thursday",
        start: "10:00 AM",
        end: "1:00 PM",
        notes: "By appointment only",
      },
    ],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: ["Dairy", "Meat"],
        schedules: [
          { weekDay: "Wednesday", start: "12:00 PM", end: "3:00 PM" },
          { weekDay: "Wednesday", start: "3:00 PM", end: "7:00 PM" },
          {
            weekDay: "Thursday",
            start: "10:00 AM",
            end: "1:00 PM",
            notes: "By appointment only",
          },
        ],
      },
    ],
    loves: 47,
    followers: 23,
    distanceMi: 1.2,
    status: "open-now",
  },
  {
    id: "yoP10WZfa0WLj3WmBKb8",
    name: "Centre Street Food Pantry",
    address: "11 Homer Street, Newton, MA 02459",
    latitude: 42.3349884,
    longitude: -71.194005,
    phone: "617-340-9554",
    about:
      "Located at Trinity Episcopal Church. Curbside pickup of groceries at the side annex on Furber Lane.",
    schedules: [
      {
        weekDay: "Tuesday",
        start: "1:00 PM",
        end: "2:00 PM",
        notes: "Seniors only; no appointment required",
      },
      {
        weekDay: "Tuesday",
        start: "2:00 PM",
        end: "5:45 PM",
        notes: "Appointments required",
      },
      {
        weekDay: "Saturday",
        start: "10:00 AM",
        end: "12:00 PM",
        notes: "No appointments required",
      },
    ],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: [
          "Dairy",
          "Diapers",
          "Eggs",
          "Fruits & Vegetables",
          "Household Products",
          "Meat",
          "Pet Food / Supplies",
          "Shelf Stable/Non-Perishable Goods",
          "Toiletries / Hygiene Products",
        ],
        schedules: [],
      },
    ],
    loves: 82,
    followers: 41,
    distanceMi: 2.1,
    status: "open-today",
  },
  {
    id: "Dn8lbl7RYacLyrYofQ07",
    name: "Watertown Food Pantry",
    address: "80 Mt. Auburn St., Watertown, MA 02472",
    latitude: 42.3672148,
    longitude: -71.1811997,
    phone: "617-972-6490",
    schedules: [{ weekDay: "Tuesday", start: "10:00 AM", end: "2:00 PM" }],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: [],
        schedules: [],
      },
    ],
    loves: 31,
    followers: 14,
    distanceMi: 3.4,
    status: "closed-today",
  },
  {
    id: "bUFzah7ZiDIw0LPEdvRf",
    name: "Salvation Army / Waltham Pantry & Meals",
    address: "33 Myrtle Street, Waltham, MA 02453",
    latitude: 42.3658786,
    longitude: -71.2364257,
    phone: "781-894-0413",
    about:
      "This location is a Healthy Pantry participant offering food, meals, and support services.",
    schedules: [
      { weekDay: "Tuesday", start: "10:00 AM", end: "12:00 PM" },
      { weekDay: "Wednesday", start: "10:00 AM", end: "12:00 PM" },
      { weekDay: "Thursday", start: "10:00 AM", end: "12:00 PM" },
    ],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: ["Dairy", "Meat"],
        schedules: [],
      },
      {
        name: "Meal Program",
        category: "Food Program",
        program: "Hot/Cold Meal Program",
        food: ["Dairy", "Meat"],
        schedules: [],
      },
      {
        name: "Healthcare Screenings/Referrals",
        category: "Healthcare Screenings/Referrals",
        food: [],
        schedules: [],
      },
      {
        name: "Housing Assistance",
        category: "Housing Assistance",
        food: [],
        schedules: [],
      },
      {
        name: "Tax/Financial Support",
        category: "Tax/Financial Support",
        food: [],
        schedules: [],
      },
      { name: "SNAP Assistance", category: "Other", food: [], schedules: [] },
    ],
    loves: 56,
    followers: 29,
    distanceMi: 4.7,
    status: "open-now",
  },
  {
    id: "I6PLOBWLqlgWHTYU7qvI",
    name: "ABCD / Allston Brighton",
    address: "640 Washington St, #202, Brighton, MA 02135",
    latitude: 42.3506927,
    longitude: -71.1692242,
    about:
      "Community action agency providing food assistance and supportive services for Allston-Brighton residents.",
    schedules: [
      { weekDay: "Wednesday", start: "10:00 AM", end: "4:00 PM" },
      { weekDay: "Thursday", start: "10:00 AM", end: "1:00 PM" },
      { weekDay: "Friday", start: "10:00 AM", end: "4:00 PM" },
    ],
    services: [
      {
        name: "Food Assistance",
        category: "Food Program",
        program: "Food Distribution",
        food: [
          "Fruits & Vegetables",
          "Shelf Stable/Non-Perishable Goods",
          "Other",
        ],
        schedules: [],
      },
    ],
    loves: 38,
    followers: 17,
    distanceMi: 5.6,
    status: "open-today",
  },
  {
    id: "ULR0oVfS1wUA3ELunCcd",
    name: "Haitian Baptist Church",
    address: "9 Russel Avenue, Watertown, MA 02472",
    latitude: 42.3687748,
    longitude: -71.1759967,
    phone: "978-663-1808",
    about:
      "Call for schedule information. The church provides food distribution to community members.",
    schedules: [],
    services: [
      {
        name: "Food Program",
        category: "Food Program",
        program: "Food Distribution",
        food: [],
        schedules: [],
      },
    ],
    loves: 19,
    followers: 8,
    distanceMi: 6.2,
    status: "closed-today",
  },
  {
    id: "W6V2sb9A9l04WvrEl0DX",
    name: "Healthy Waltham Mobile Pantry",
    address: "5 Cherry Street, Waltham, MA 02453",
    latitude: 42.3672878,
    longitude: -71.2421776,
    phone: "781-314-5647",
    about:
      "A mobile pantry service bringing food directly to the community by appointment and walk-in.",
    schedules: [
      {
        weekDay: "Thursday",
        start: "1:30 PM",
        end: "4:15 PM",
        notes: "By Appointment",
      },
      {
        weekDay: "Thursday",
        start: "4:30 PM",
        end: "5:00 PM",
        notes: "Walk-ins",
      },
    ],
    services: [
      {
        name: "Mobile Market Location",
        category: "Food Program",
        program: "Pop-Up/Mobile Resource",
        food: ["Fruits & Vegetables", "Shelf Stable/Non-Perishable Goods"],
        schedules: [],
      },
    ],
    loves: 44,
    followers: 21,
    distanceMi: 6.9,
    status: "open-today",
  },
  {
    id: "2TCjponDbsAIbSdzjn2j",
    name: "MHSA / Bristol Lodge Pantry",
    address: "750 Main Street, Waltham, MA 02451",
    latitude: 42.3758904,
    longitude: -71.2403251,
    phone: "781-899-2099",
    schedules: [{ weekDay: "Wednesday", start: "9:00 AM", end: "12:00 PM" }],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: [],
        schedules: [],
      },
    ],
    loves: 27,
    followers: 11,
    distanceMi: 7.4,
    status: "closed-today",
  },
  {
    id: "PzLEpSFwJ4ivFKa2FZ05",
    name: "MACCMS / Allston-Brighton Food Pantry",
    address: "404 Washington Street, Brighton, MA 02135",
    latitude: 42.3487592,
    longitude: -71.1552075,
    phone: "617-254-4046",
    about:
      "Serving Allston-Brighton since 1985. Special priority hours for seniors, veterans, and disabled individuals.",
    schedules: [
      {
        weekDay: "Wednesday",
        start: "3:30 PM",
        end: "6:00 PM",
        notes: "3:30–4:30 Seniors, Veterans, Disabled only",
      },
      {
        weekDay: "Saturday",
        start: "10:00 AM",
        end: "1:00 PM",
        notes: "Saturday Food Pantry",
      },
    ],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: [],
        schedules: [],
      },
      {
        name: "Meal Program",
        category: "Food Program",
        program: "Hot/Cold Meal Program",
        food: [],
        schedules: [],
      },
    ],
    loves: 61,
    followers: 33,
    distanceMi: 8.3,
    status: "open-now",
  },
  {
    id: "8i7sDLbrIvJugX7mjJMw",
    name: "Belmont Church of God Food Pantry",
    address: "25 Marlboro Street, Belmont, MA 02478",
    latitude: 42.3767119,
    longitude: -71.1567912,
    phone: "617-816-7419",
    schedules: [
      { weekDay: "Friday", start: "10:00 AM", end: "10:30 AM" },
      {
        weekDay: "Saturday",
        start: "10:30 AM",
        end: "12:00 PM",
        notes: "1st and 3rd Saturday of the month",
      },
    ],
    services: [
      {
        name: "Pantry Program",
        category: "Food Program",
        program: "Food Distribution",
        food: [],
        schedules: [],
      },
    ],
    loves: 22,
    followers: 9,
    distanceMi: 9.1,
    status: "open-today",
  },
];

export interface LocationPreset {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  defaultAttendees: number;
  description: string;
}

export const POPULAR_PRESETS: LocationPreset[] = [
  {
    id: 'greater-noida',
    name: 'Knowledge Park 2, Greater Noida',
    lat: 28.4631,
    lng: 77.4944,
    category: 'College Fest / Tech Hackathon',
    defaultAttendees: 1500,
    description: 'Premier university and academic hub with heavy youth footfall'
  },
  {
    id: 'bangalore-koramangala',
    name: 'Koramangala 5th Block, Bangalore',
    lat: 12.9352,
    lng: 77.6245,
    category: 'Startup Conference / Demo Day',
    defaultAttendees: 800,
    description: 'High-density tech corridor with thriving commercial cafes'
  },
  {
    id: 'mumbai-bandra',
    name: 'Bandra West, Mumbai',
    lat: 19.0596,
    lng: 72.8295,
    category: 'Indie Music Fest / Art Showcase',
    defaultAttendees: 1200,
    description: 'Cultural, lifestyle & retail epicenter'
  },
  {
    id: 'delhi-cp',
    name: 'Connaught Place, New Delhi',
    lat: 28.6315,
    lng: 77.2167,
    category: 'Community Exhibition / Cultural Expo',
    defaultAttendees: 2500,
    description: 'Historic commercial anchor ring with top metro connectivity'
  },
  {
    id: 'nyc-soho',
    name: 'SoHo & Broadway, New York NY',
    lat: 40.7233,
    lng: -73.9985,
    category: 'Design & Creator Pop-up',
    defaultAttendees: 600,
    description: 'World-renowned boutique and experiential retail district'
  }
];

export const USER_ROLES = [
  'Student / Campus Organizer',
  'Event Management Professional',
  'Independent Artist / Musician',
  'Small Business Owner',
  'Community Group Leader'
] as const;

export const EVENT_CATEGORIES = [
  'College Fest / Hackathon',
  'Music Concert / Indie Gig',
  'Business Summit / Startup Expo',
  'Sports Tournament / Marathon',
  'Food & Flea Market',
  'Community Meetup & Workshop'
];

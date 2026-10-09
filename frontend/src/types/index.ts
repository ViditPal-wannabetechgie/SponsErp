export type ThemeMode = 'dark' | 'light' | 'system';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Sponsor {
  name: string;
  address: string;
  rating: number;
  reviews: number;
  category: string;
  score: number;
  match_rate?: number;
  phone: string;
  website: string;
  thumbnail?: string;
}

export interface Anchor {
  name: string;
  address: string;
  category: string;
  rating: number;
  reviews: number;
  thumbnail?: string;
}

export interface EventAnalysisData {
  location_name: string;
  lat: number;
  lng: number;
  attendee_count: number;
  user_role: string;
  event_category: string;
}

export interface AnalysisResponse {
  status: string;
  sponsors: Sponsor[];
  anchors: Anchor[];
}

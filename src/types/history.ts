export type EraType = 'daerah' | 'nasional' | 'kemerdekaan';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface RouteWaypoint extends LatLng {
  name: string;
  description?: string;
  year?: string;
}

export interface ColonizationStep {
  year: string;
  title: string;
  locationName: string;
  coordinates: LatLng;
  description: string;
  impact: string;
}

export interface ForeignNation {
  id: string;
  name: string;
  flag: string;
  flagImage?: string;
  originCountry: string;
  originCity: string;
  originCoords: LatLng;
  landingPort: string;
  landingCoords: LatLng;
  firstArrivalYear: string;
  expeditionLeaders: string[];
  shipNames: string[];
  motive: string;
  routeWaypoints: RouteWaypoint[];
  arrivalStory: {
    summary: string;
    whyTheyCame: string;
    howTheyArrived: string;
    firstIslandEncounter: string;
  };
  colonizationSteps: ColonizationStep[];
  color: string;
}

export interface BattleEvent {
  id: string;
  title: string;
  year: string;
  era: EraType;
  location: string;
  coordinates: LatLng;
  opponents: {
    nusantara: string;
    foreign: string;
  };
  leaders: {
    nusantara: string[];
    foreign: string[];
  };
  whatHappened: string;
  causes: string;
  purpose: string;
  impactAndResult: string;
  keyDate?: string;
  highlightNote?: string;
}

export interface MilestoneEvent {
  id: string;
  title: string;
  date: string;
  year: string;
  era: EraType;
  location: string;
  coordinates: LatLng;
  figures: string[];
  whatHappened: string;
  causes?: string;
  importance: string;
  outcomes?: string;
  proclamationText?: boolean;
}

export interface TimelineEntry {
  id: string;
  year: string;
  fullDate?: string;
  title: string;
  category: 'pelayaran' | 'peperangan' | 'pergerakan' | 'persiapan' | 'proklamasi';
  stage: 1 | 2 | 3; // 1: Perlawanan Daerah, 2: Pergerakan Nasional, 3: Persiapan & Proklamasi
  summary: string;
  relatedEntityId?: string;
  coordinates?: LatLng;
}

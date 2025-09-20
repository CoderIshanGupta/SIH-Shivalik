// src/types.ts

// Represent a Bus object from the backend
export interface Bus {
  _id: string;       // MongoDB unique key
  name: string;      // Name/number of the bus
  route: string;     // Route string
  [key: string]: any; // To allow extra fields if backend adds more
}

// If you also have live location endpoint:
export interface BusLocation {
  busId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}
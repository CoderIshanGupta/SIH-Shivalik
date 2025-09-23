// src/api.ts
import { Bus, BusLocation } from "./types";

// Mock buses with stop KEYS (not language-specific text)
const mockBuses: Bus[] = [
  {
    _id: "1",
    name: "Ludhiana Express",
    route: "ludhiana - jalandhar - phagwara",
  },
  {
    _id: "2",
    name: "Amritsar Shuttle",
    route: "amritsar - tarnTaran - patti",
  },
  {
    _id: "3",
    name: "Patiala Flyer",
    route: "patiala - rajpura - zirakpur",
  },
  {
    _id: "4",
    name: "Bathinda Service",
    route: "bathinda - mansa - barnala",
  },
  {
    _id: "5",
    name: "Hoshiarpur Connector",
    route: "hoshiarpur - phagwara - jalandhar",
  },
];

// ------------ Bus APIs ------------
export const getBuses = async (): Promise<Bus[]> => {
  return mockBuses;
};

export const getBusById = async (id: string): Promise<Bus> => {
  return mockBuses.find((b) => b._id === id) || mockBuses[0];
};

export const getBusLocation = async (busId: string): Promise<BusLocation> => {
  return {
    busId,
    latitude: 31.3260,
    longitude: 75.5762,
    timestamp: new Date().toISOString(),
  };
};

export const updateBusLocation = async (
  busId: string,
  location: { latitude: number; longitude: number }
) => {
  return { success: true, busId, ...location, timestamp: new Date().toISOString() };
};

// ------------ Routes / Predictions / AI ------------
export const findRoute = async (from: string, to: string) => {
  return [
    {
      bus: "Ludhiana Express",
      type: "AC Semi-Sleeper",
      eta: "12 min",
      price: 55,
    },
    {
      bus: "Patiala Flyer",
      type: "Ordinary",
      eta: "20 min",
      price: 30,
    },
  ];
};

export const predictETA = async (stop: string, date: string) => {
  return { stop, eta: "8 minutes", date };
};

export const getRoutes = async () => {
  return [
    { stop: "ludhianaBusStand", routes: [{ id: "101", eta: "5 min" }] },
    { stop: "amritsarGoldenGate", routes: [{ id: "201", eta: "7 min" }] },
    { stop: "patialaSheranWalaGate", routes: [{ id: "301", eta: "10 min" }] },
  ];
};

export const askAssistant = async (message: string) => {
  return {
    reply: `🤖 Sat Sri Akal! You said: "${message}". Many buses run Ludhiana ↔ Jalandhar every 15 min.`,
  };
};
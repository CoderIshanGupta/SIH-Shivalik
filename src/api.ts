// src/api.ts
import axios from "axios";
import { BASE_URL } from "./config";
import { Bus, BusLocation } from "./types";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
});

// ------------ Bus APIs ------------
export const getBuses = async (): Promise<Bus[]> => {
  const res = await api.get<Bus[]>("/buses");
  return res.data;
};

export const getBusById = async (id: string): Promise<Bus> => {
  const res = await api.get<Bus>(`/bus/${id}`);
  return res.data;
};

export const getBusLocation = async (busId: string): Promise<BusLocation> => {
  const res = await api.get<BusLocation>(`/bus/location/${busId}`);
  return res.data;
};

export const updateBusLocation = async (
  busId: string,
  location: { latitude: number; longitude: number }
) => {
  const res = await api.post(`/bus/location`, { busId, ...location });
  return res.data;
};

// ------------ Routes / Predictions / AI ------------
export const findRoute = async (from: string, to: string) => {
  const res = await api.post("/findRoute", { from, to });
  return res.data;
};

export const predictETA = async (stop: string, date: string) => {
  const res = await api.post("/predict", { stop, date });
  return res.data;
};

export const getRoutes = async () => {
  const res = await api.get("/routes");
  return res.data;
};

export const askAssistant = async (message: string) => {
  const res = await api.post("/assistant", { message });
  return res.data;
};
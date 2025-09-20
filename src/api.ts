// src/api.ts
import axios from "axios";
import { BASE_URL } from "./config";
import { Bus, BusLocation } from "./types";

// Create a pre-configured axios client
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// ------------ Buses ------------
export const getBuses = async (): Promise<Bus[]> => {
  const response = await api.get<Bus[]>("/buses");
  return response.data;
};

export const getBusById = async (id: string): Promise<Bus> => {
  const response = await api.get<Bus>(`/bus/${id}`);
  return response.data;
};

// ------------ Locations ------------
export const getBusLocation = async (busId: string): Promise<BusLocation> => {
  const response = await api.get<BusLocation>(`/bus/location/${busId}`);
  return response.data;
};

export const updateBusLocation = async (
  busId: string,
  location: { latitude: number; longitude: number }
): Promise<any> => {
  const response = await api.post(`/bus/location`, {
    busId,
    ...location,
  });
  return response.data;
};
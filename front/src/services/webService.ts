import axios from "axios";
import { Client } from "../types/Client";
import { Hotel } from "../types/Hotel";
import { HotelBooking } from "../types/HotelBooking";

const getURL = (entity: "Client" | "Hotel" | "HotelBooking"): string => {
  const api: string =
    entity === "Client" && process.env.REACT_APP_URL_API_CLIENT
      ? process.env.REACT_APP_URL_API_CLIENT
      : entity === "Hotel" && process.env.REACT_APP_URL_API_HOTEL
      ? process.env.REACT_APP_URL_API_HOTEL
      : entity === "HotelBooking" && process.env.REACT_APP_URL_API_HOTEL_BOOKING
      ? process.env.REACT_APP_URL_API_HOTEL_BOOKING
      : "";

  return process.env.REACT_APP_URL + api;
};

const webService = (
  entity: "Client" | "Hotel" | "HotelBooking",
  nameMethod: string,
  typeMethod: "GET" | "POST" | "PUT",
  data?: Client | Hotel | HotelBooking | number
) => {
  const url = getURL(entity);

  if (typeMethod === "GET") {
    return axios.get(url + nameMethod);
  } else if (typeMethod === "POST") {
    return axios.post(url + nameMethod, data);
  } else if (typeMethod === "PUT") {
    return axios.put(url + nameMethod, data);
  } else {
    console.log("Nombre de acción no reconocida");
  }
};

export default webService;

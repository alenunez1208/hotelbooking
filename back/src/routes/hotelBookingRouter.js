import express from "express";
import {
  getHotelBooking,
  insertHotelBooking,
  updateHotelBooking,
} from "../controllers/hoteltBookingControllers.js";

const hotelBookingRouter = express.Router();

hotelBookingRouter.get("/getHotelBooking", getHotelBooking);
hotelBookingRouter.post("/insertHotelBooking", insertHotelBooking);
hotelBookingRouter.put("/updateHotelBooking", updateHotelBooking);

export default hotelBookingRouter;

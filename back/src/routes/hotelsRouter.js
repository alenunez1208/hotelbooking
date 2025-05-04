import express from "express";
import {
  getHotel,
  insertHotel,
  updateHotel,
} from "../controllers/hotelsControllers.js";

const hotelsRouter = express.Router();

hotelsRouter.get("/getHotel", getHotel);
hotelsRouter.post("/insertHotel", insertHotel);
hotelsRouter.put("/updateHotel", updateHotel);

export default hotelsRouter;

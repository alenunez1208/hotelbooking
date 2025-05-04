import express from "express";
import {
  getClient,
  insertClient,
  updateClient,
} from "../controllers/clientsControllers.js";

const clientsRouter = express.Router();

clientsRouter.get("/getClient", getClient);
clientsRouter.post("/insertClient", insertClient);
clientsRouter.put("/updateClient", updateClient);

export default clientsRouter;

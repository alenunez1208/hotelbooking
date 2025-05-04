import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import hotelBookingRouter from "./src/routes/hotelBookingRouter.js";
import hotelsRouter from "./src/routes/hotelsRouter.js";
import clientsRouter from "./src/routes/clientsRouter.js";

import fileSystem from "./config/fileSystem.js";
import { dbConnect } from "./config/database.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/clients", clientsRouter);
app.use("/hotels", hotelsRouter);
app.use("/hotelBooking", hotelBookingRouter);

if (process.env.DATA_TYPE === "FS") {
  fileSystem();
} else if (process.env.DATA_TYPE === "DB") {
  dbConnect();
} else {
  console.log("ERROR: El valor de DATA_TYPE no es válido.");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

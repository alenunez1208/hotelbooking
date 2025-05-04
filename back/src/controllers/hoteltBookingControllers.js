import { db } from "../../config/database.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { updateMetadata } from "../models/fileSystemModel.js";

dotenv.config();

export const getHotelBooking = async (req, res) => {
  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "SELECT hb.id, hb.name, hb.address, hb.hotelId, h.name as hotelName, hb.clientId, c.name as clientName FROM hotelBooking hb, hotel h, client c WHERE hb.hotelId = h.id AND hb.clientId = c.id",
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const fsFolder = path.join(process.env.FS_FOLDER, "HotelBooking");
    const fsFolderClient = path.join(process.env.FS_FOLDER, "Client");
    const fsFolderHotel = path.join(process.env.FS_FOLDER, "Hotel");
    const hotelBooking = [];

    try {
      const files = fs.readdirSync(fsFolder);
      const filesHotel = fs.readdirSync(fsFolderHotel);
      const filesClient = fs.readdirSync(fsFolderClient);

      files.forEach((file) => {
        if (!file.includes("_metadata")) {
          const filePath = path.join(fsFolder, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

          filesClient.forEach((fileClient) => {
            const clientId = fileClient.replace(".json", "");

            if (clientId === String(data.clientId)) {
              const filePathClient = path.join(fsFolderClient, fileClient);
              const dataClient = JSON.parse(
                fs.readFileSync(filePathClient, "utf-8")
              );

              data.clientName = dataClient.name;
            }
          });

          filesHotel.forEach((fileHotel) => {
            const hotelId = fileHotel.replace(".json", "");

            if (hotelId === String(data.hotelId)) {
              const filePathHotel = path.join(fsFolderHotel, fileHotel);
              const dataHotel = JSON.parse(
                fs.readFileSync(filePathHotel, "utf-8")
              );

              data.hotelName = dataHotel.name;
            }
          });

          hotelBooking.push(data);
        }
      });

      res.status(200).json(hotelBooking);
    } catch (error) {
      res.status(500).json({ message: "Error al listar las reservas" });
    }
  } else {
    res.status(500).json({ error });
  }
};

export const insertHotelBooking = async (req, res) => {
  const { hotelId, clientId, name, address } = req.body;

  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "INSERT INTO hotelBooking (hotelId, clientId, name, address) VALUES (?, ?, ?, ?)",
      [hotelId, clientId, name, address],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reserva agregada", id: results.insertId });
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const hotelBookingFolder = path.join(process.env.FS_FOLDER, "HotelBooking");

    if (!fs.existsSync(hotelBookingFolder)) {
      fs.mkdirSync(hotelBookingFolder, { recursive: true });
    }

    const newHotelBookingId = Date.now();
    const hotelBookingFilePath = path.join(
      hotelBookingFolder,
      `${newHotelBookingId}.json`
    );
    const hotelBookingData = {
      id: newHotelBookingId,
      name: name,
      address: address,
      clientId: clientId,
      hotelId: hotelId,
      createDate: new Date(),
    };

    try {
      fs.writeFileSync(
        hotelBookingFilePath,
        JSON.stringify(hotelBookingData, null, 2)
      );
      updateMetadata("HotelBooking");
      res.status(200).json({ message: "Reserva creada" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear reserva" });
    }
  } else {
    res.status(500).json({ error });
  }
};

export const updateHotelBooking = async (req, res) => {
  const { name, address, clientId, hotelId, id } = req.body;

  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "UPDATE hotelbooking SET name = ?, address = ?, clientId = ?, hotelId = ? WHERE id = ?",
      [name, address, clientId, hotelId, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Reserva Modificada", id: results.insertId });
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const hotelBookingFilePath = path.join(
      process.env.FS_FOLDER,
      "HotelBooking",
      `${id}.json`
    );

    try {
      if (fs.existsSync(hotelBookingFilePath)) {
        const currentData = JSON.parse(
          fs.readFileSync(hotelBookingFilePath, "utf-8")
        );

        const updateHotelBooking = {
          id: currentData.id,
          name: name,
          address: address,
          clientId: clientId,
          hotelId: hotelId,
          createDate: currentData.createDate,
        };

        fs.writeFileSync(
          hotelBookingFilePath,
          JSON.stringify(updateHotelBooking, null, 2)
        );
        res.status(200).json({ message: "Reserva Modificada" });
      } else {
        res.status(500).json({ message: "Error al modificar reserva" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(500).json({ error });
  }
};

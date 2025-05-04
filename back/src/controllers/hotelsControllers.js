import { db } from "../../config/database.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { updateMetadata } from "../models/fileSystemModel.js";

dotenv.config();

export const getHotel = async (req, res) => {
  if (process.env.DATA_TYPE === "DB") {
    db.query("SELECT * FROM hotel", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  } else if (process.env.DATA_TYPE === "FS") {
    const fsFolder = path.join(process.env.FS_FOLDER, "Hotel");
    const hotels = [];

    try {
      const files = fs.readdirSync(fsFolder);

      files.forEach((file) => {
        if (!file.includes("_metadata")) {
          const filePath = path.join(fsFolder, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          hotels.push(data);
        }
      });

      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Error al listar los hoteles" });
    }
  } else {
    res.status(500).json({ error });
  }
};

export const insertHotel = async (req, res) => {
  const { name, address } = req.body;

  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "INSERT INTO hotel (name, address) VALUES (?, ?)",
      [name, address],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hotel agregado", id: results.insertId });
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const hotelFolder = path.join(process.env.FS_FOLDER, "Hotel");

    if (!fs.existsSync(hotelFolder)) {
      fs.mkdirSync(hotelFolder, { recursive: true });
    }

    const newHotelId = Date.now();
    const hotelFilePath = path.join(hotelFolder, `${newHotelId}.json`);
    const hotelData = {
      id: newHotelId,
      name: name,
      address: address,
      createDate: new Date(),
    };

    try {
      fs.writeFileSync(hotelFilePath, JSON.stringify(hotelData, null, 2));
      updateMetadata("Hotel");
      res.status(200).json({ message: "Hotel creado" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear hotel" });
    }
  } else {
    res.status(500).json({ error });
  }
};

export const updateHotel = async (req, res) => {
  const { name, address, id } = req.body;

  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "UPDATE hotel SET name = ?, address = ? WHERE id = ?",
      [name, address, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Hotel Modificado", id: results.insertId });
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const hotelFilePath = path.join(
      process.env.FS_FOLDER,
      "Hotel",
      `${id}.json`
    );

    try {
      if (fs.existsSync(hotelFilePath)) {
        const currentData = JSON.parse(fs.readFileSync(hotelFilePath, "utf-8"));

        const updateHotel = {
          id: currentData.id,
          name: name,
          address: address,
          createDate: currentData.createDate,
        };

        fs.writeFileSync(hotelFilePath, JSON.stringify(updateHotel, null, 2));
        res.status(200).json({ message: "Hotel Modificado" });
      } else {
        res.status(500).json({ message: "Error al modificar hotel" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(500).json({ error });
  }
};

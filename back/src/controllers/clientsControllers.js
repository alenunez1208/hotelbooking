import { db } from "../../config/database.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { updateMetadata } from "../models/fileSystemModel.js";

dotenv.config();

export const getClient = async (req, res) => {
  if (process.env.DATA_TYPE === "DB") {
    db.query("SELECT id, name, address, phone FROM client", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  } else if (process.env.DATA_TYPE === "FS") {
    const fsFolder = path.join(process.env.FS_FOLDER, "Client");
    const clients = [];

    try {
      const files = fs.readdirSync(fsFolder);

      files.forEach((file) => {
        if (!file.includes("_metadata")) {
          const filePath = path.join(fsFolder, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          clients.push(data);
        }
      });

      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: "Error al listar los clientes" });
    }
  } else {
    res.status(500).json({ error });
  }
};

export const insertClient = async (req, res) => {
  const { name, address, phone } = req.body;

  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "INSERT INTO client (name, address, phone) VALUES (?, ?, ?)",
      [name, address, phone],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Cliente creado" });
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const clientFolder = path.join(process.env.FS_FOLDER, "Client");

    if (!fs.existsSync(clientFolder)) {
      fs.mkdirSync(clientFolder, { recursive: true });
    }

    const newClientId = Date.now();
    const clientFilePath = path.join(clientFolder, `${newClientId}.json`);
    const clientData = {
      id: newClientId,
      name: name,
      address: address,
      phone: phone,
      createDate: new Date(),
    };

    try {
      fs.writeFileSync(clientFilePath, JSON.stringify(clientData, null, 2));
      updateMetadata("Client");
      res.status(200).json({ message: "Cliente creado" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear cliente" });
    }
  } else {
    res.status(500).json({ error });
  }
};

export const updateClient = async (req, res) => {
  const { name, address, phone, id } = req.body;

  if (process.env.DATA_TYPE === "DB") {
    db.query(
      "UPDATE client SET name = ?, address = ?, phone = ? WHERE id = ?",
      [name, address, phone, id],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Cliente Modificado" });
      }
    );
  } else if (process.env.DATA_TYPE === "FS") {
    const clientFilePath = path.join(
      process.env.FS_FOLDER,
      "Client",
      `${id}.json`
    );

    try {
      if (fs.existsSync(clientFilePath)) {
        const currentData = JSON.parse(
          fs.readFileSync(clientFilePath, "utf-8")
        );

        const updateClient = {
          id: currentData.id,
          name: name,
          address: address,
          phone: phone,
          createDate: currentData.createDate,
        };

        fs.writeFileSync(clientFilePath, JSON.stringify(updateClient, null, 2));
        res.status(200).json({ message: "Cliente Modificado" });
      } else {
        res.status(500).json({ message: "Error al modificar cliente" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(500).json({ error });
  }
};

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const fileSystem = () => {
  const fsFolder = process.env.FS_FOLDER;
  const entities = ["Client", "HotelBooking", "Hotel"];

  entities.forEach((entity) => {
    const entityFolder = path.join(fsFolder, entity);
    if (!fs.existsSync(entityFolder)) {
      fs.mkdirSync(entityFolder, { recursive: true });
    }

    const metadataFile = path.join(entityFolder, "_metadata.json");
    if (!fs.existsSync(metadataFile)) {
      fs.writeFileSync(
        metadataFile,
        JSON.stringify({ TOTAL_REGISTRIES: 0, LAST_INDEX: 0 })
      );
    }
  });
};

export default fileSystem;

import fs from "fs";
import path from "path";

const getMetadata = (entity) => {
  const metadataPath = path.join(
    process.env.FS_FOLDER,
    entity,
    "_metadata.json"
  );
  if (!fs.existsSync(metadataPath)) {
    fs.writeFileSync(
      metadataPath,
      JSON.stringify({ TOTAL_REGISTRIES: 0, LAST_INDEX: 0 })
    );
  }
  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
  return metadata;
};

const updateMetadata = (entity) => {
  const metadata = getMetadata(entity);
  const metadataPath = path.join(
    process.env.FS_FOLDER,
    entity,
    "_metadata.json"
  );
  const metadataUpdate = {
    TOTAL_REGISTRIES: metadata.TOTAL_REGISTRIES + 1,
    LAST_INDEX: metadata.LAST_INDEX + 1,
  };

  fs.writeFileSync(metadataPath, JSON.stringify(metadataUpdate, null, 2));
};

export { updateMetadata };

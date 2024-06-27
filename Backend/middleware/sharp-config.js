const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFileName = fileName.split(".").slice(0, -1).join(".") + ".webp";
  const outputFilePath = path.join("images", outputFileName);

  sharp.cache(false);
  sharp(filePath)
    .resize(206, 260, { fit: "cover" })
    .toFormat("webp")
    .toFile(outputFilePath)
    .then(() => {
      console.log(`Image ${fileName} optimisée en WebP avec succès !`);

      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        req.file.filename = outputFileName;
        console.log(`Image ${fileName} supprimée avec succès !`);
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

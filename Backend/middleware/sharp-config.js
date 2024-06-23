const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join("images", `resized_${fileName}`);

  // Désactivation du cache !!!
  sharp.cache(false);
  sharp(filePath)
    .resize({ height: 600 })
    .toFile(outputFilePath)
    .then(() => {
      console.log(`Image ${fileName} optimisée avec succès !`);
      // Remplacer le fichier original par le fichier optimisé
      fs.unlink(filePath, () => {
        req.file.path = outputFilePath;
        console.log(`Image ${fileName} supprimée avec succès !`);
        next();
      });
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

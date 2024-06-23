const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp-config");
const auth = require("../middleware/auth");
const bookCtrl = require("../controllers/book");

router.post("/", auth, multer, sharp, bookCtrl.createBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.put("/:id", auth, multer, sharp, bookCtrl.modifyBook);
router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);

module.exports = router;

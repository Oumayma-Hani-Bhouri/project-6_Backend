const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/book");

const auth = require("../middleware/auth");

router.post("/", auth, bookCtrl.createBook);
router.delete("/:id", auth, bookCtrl.deleteBook);
router.put("/:id", auth, bookCtrl.modifyBook);
router.get("/", bookCtrl.getAllBooks);
router.get("/:id", bookCtrl.getOneBook);

module.exports = router;

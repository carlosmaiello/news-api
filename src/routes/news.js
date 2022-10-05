const express = require("express");
const { all, one, insert, update, remove } = require("../controllers/news");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth({ required: false }), all);
router.post("/", auth, insert);
router.get("/:id", auth({ required: false }), one);

router.post("/:id", auth, update);
router.put("/:id", auth, update);
router.patch("/:id", auth, update);

router.delete("/:id", auth, remove);

module.exports = router;
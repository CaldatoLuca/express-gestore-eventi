const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

router.get("/", eventController.index);
router.post("/", express.json(), eventController.store);
router.put("/:event", eventController.update);

module.exports = router;

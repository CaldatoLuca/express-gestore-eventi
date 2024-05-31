const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const reservationController = require("../controllers/reservationController");

router.get("/", eventController.index);
router.post("/", express.json(), eventController.store);
router.put("/:event", express.json(), eventController.update);

router.get("/:event/reservations", reservationController.index);
router.post(
  "/:event/reservations",
  express.json(),
  reservationController.store
);
router.delete(
  "/:event/reservations/:reservation",
  reservationController.destroy
);

module.exports = router;

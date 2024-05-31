const Event = require("../models/eventModel");
const CustomError = require("../exceptions/customErrors");

const index = (req, res) => {
  const associatedReservations = Event.associatedReservations(
    +req.params.event
  );

  if (associatedReservations.length === 0) {
    throw new CustomError("No reservations found for this event", 404);
  }

  res.json({
    message: `Reservations List for Event ${req.params.event}`,
    status: 200,
    route: "/events/:event/reservations",
    associatedReservations,
  });
};

const store = (req, res) => {
  res.json({
    message: "Store a reservation",
    status: 200,
    route: "/events/:event/reservations",
  });
};

const destroy = (req, res) => {
  res.json({
    message: "Delete a reservation",
    status: 200,
    route: "/events/:event/reservations/:reservation",
  });
};

module.exports = {
  index,
  store,
  destroy,
};

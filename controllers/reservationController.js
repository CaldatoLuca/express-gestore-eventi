const Event = require("../models/eventModel");

const index = (req, res) => {
  let message = `Reservations List for Event ${req.params.event}`;

  const associatedReservations = Event.associatedReservations(
    +req.params.event
  );

  if (associatedReservations.length === 0) {
    message = "There are no reservations for this event";
  }

  res.json({
    message,
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

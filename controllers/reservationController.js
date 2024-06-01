const Event = require("../models/eventModel");
const Reservation = require("../models/reservationModel");
const CustomError = require("../exceptions/customErrors");
const { getPath } = require("../utils");
const reservations = require("../db/reservationsDb.json");

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
  const ids = Event.read(
    getPath("eventsDb", { directory: "db", extension: "json" })
  ).map((e) => e.id);

  if (!ids.includes(+req.params.event)) {
    throw new CustomError("Event not found", 404);
  }

  if (
    !req.body.id ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email
  ) {
    throw new CustomError("All fields are required", 400);
  }

  const newReservation = new Reservation();

  newReservation.setId(+req.body.id);
  newReservation.setFirstName(req.body.firstName);
  newReservation.setLastName(req.body.lastName);
  newReservation.setEmail(req.body.email);
  newReservation.setEventId(+req.params.event);

  Reservation.save(
    getPath("reservationsDb", { directory: "db", extension: "json" }),
    [...reservations, newReservation]
  );

  reservations.push(newReservation);

  res.json({
    message: "Store a reservation",
    status: 200,
    route: "/events/:event/reservations",
    reservations,
  });
};

const destroy = (req, res) => {
  const event = Event.read(
    getPath("eventsDb", { directory: "db", extension: "json" })
  ).find((e) => e.id === +req.params.event);

  if (!event) {
    throw new CustomError("Event not found", 404);
  }

  const associatedReservationsIds = Event.associatedReservations(
    +req.params.event
  ).map((r) => r.id);

  if (!associatedReservationsIds.includes(+req.params.reservation)) {
    throw new CustomError("Reservation not found", 404);
  }

  Reservation.deleteReservation(
    getPath("reservationsDb", { directory: "db", extension: "json" }),
    +req.params.reservation
  );

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

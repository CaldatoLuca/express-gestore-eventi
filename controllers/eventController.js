const Event = require("../models/eventModel");
const { getPath } = require("../utils");
let events = require("../db/eventsDb.json");
const CustomError = require("../exceptions/customErrors");

const index = (req, res) => {
  const filePath = getPath("eventsDb", { extension: "json", directory: "db" });
  let events = Event.read(filePath);

  //filtri dai dall' utente
  const filters = {};
  if (req.query.id) filters.id = +req.query.id;
  if (req.query.title) filters.title = req.query.title;
  if (req.query.date) filters.date = req.query.date;
  if (req.query.maxSeats) filters.maxSeats = +req.query.maxSeats;

  //applicazione filtri
  events = Event.filterEvents(events, filters);

  //se i filtri non danno risultato
  if (events.length === 0) {
    throw new CustomError("No events found", 404);
  }

  res.json({
    message: "Events List",
    status: 200,
    route: "/events",
    events,
    filters,
  });
};

const store = (req, res) => {
  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.description ||
    !req.body.date ||
    !req.body.maxSeats
  ) {
    throw new CustomError("All fields are required", 400);
  }

  const eventToSave = new Event(
    req.body.id,
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.maxSeats
  );
  const filePath = getPath("eventsDb", { extension: "json", directory: "db" });
  Event.save(filePath, [...events, eventToSave]);
  events.push(eventToSave);

  res.json({
    message: "Store APi",
    status: 200,
    route: "/events ",
    events,
  });
};

const update = (req, res) => {
  const filePath = getPath("eventsDb", { extension: "json", directory: "db" });

  const eventId = +req.params.event;
  let eventToUpdate = events.find((e) => e.id === eventId);

  if (!eventToUpdate) {
    throw new CustomError("Event not found", 404);
  }

  //sovrascrivo i valori, se nella richiesta ho chiavi in piu le aggiunge
  eventToUpdate = {
    ...eventToUpdate,
    ...req.body,
  };

  //modifico l' array di tutti gli eventi
  //sostituisce l' oggetto da modificare (e.id === eventId) se true
  //con l' oggetto aggiornato 'eventToUpdate'
  //altrimenti restituisce l' oggetto originale
  events = events.map((e) => (e.id === eventId ? eventToUpdate : e));

  //sovrascrivo
  Event.save(filePath, events);

  res.json({
    message: "Update API in PUT",
    status: 200,
    route: `/events/${eventId}`,
    event: eventToUpdate,
    events,
  });
};

module.exports = {
  index,
  store,
  update,
};

const Event = require("../models/eventModel");
const { getPath } = require("../utils");
const events = require("../db/eventsDb.json");

const index = (req, res) => {
  const filePath = getPath("eventsDb", { extension: "json", directory: "db" });
  const events = Event.read(filePath);

  if (req.query.id) {
    const event = events.find((event) => event.id === parseInt(req.query.id));
    return res.json({
      message: `Event with id ${req.query.id} found`,
      status: 200,
      route: "/events",
      event,
    });
  }

  res.json({
    message: "Events List",
    status: 200,
    route: "/events",
    events,
  });
};

const store = (req, res) => {
  const eventToSave = new Event(
    6,
    "Evento 6",
    "Descrizione evento 6",
    "2024-06-01",
    100
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
  res.json({
    message: "Update Api in PUT",
    status: 200,
    route: "/events/:event",
  });
};

module.exports = {
  index,
  store,
  update,
};

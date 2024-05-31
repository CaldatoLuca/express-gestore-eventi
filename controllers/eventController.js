const Event = require("../models/eventModel");
const { getPath } = require("../utils");
const events = require("../db/eventsDb.json");

const index = (req, res) => {
  const filePath = getPath("eventsDb", { extension: "json", directory: "db" });
  const events = Event.read(filePath);

  // const filters = {
  //   id: req.query.id,
  //   title: req.query.title,
  //   date: req.query.date,
  //   maxSeats: req.query.maxSeats,
  // };

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
  if (
    !req.body.id ||
    !req.body.title ||
    !req.body.description ||
    !req.body.date ||
    !req.body.maxSeats
  ) {
    return res.status(400).json({
      message: "Tutti i campi sono obbligatori",
      status: 400,
      route: "/events",
    });
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

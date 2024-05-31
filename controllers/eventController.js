const Event = require("../models/eventModel");
const { getPath } = require("../utils");
const events = require("../db/eventsDb.json");

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
  if (Object.keys(filters).length > 0) {
    for (const key in filters) {
      if (key === "date") {
        const filterDate = new Date(filters[key]);
        events = events.filter((e) => {
          const eventDate = new Date(e[key]);
          return eventDate >= filterDate;
        });
      } else if (key === "maxSeats") {
        events = events.filter((e) => {
          return e[key] <= filters[key];
        });
      } else {
        events = events.filter((e) => {
          return e[key] == filters[key];
        });
      }
    }
  }

  //se i filtri non danno risultato
  if (events.length === 0) {
    return res.status(404).json({
      message: "No events found",
      status: 404,
      route: "/events",
      events,
      filters,
    });
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
    return res.status(400).json({
      message: "All fields are required",
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

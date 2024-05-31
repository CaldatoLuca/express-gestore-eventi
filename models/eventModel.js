const fs = require("fs");
const Reservation = require("./reservationModel");
const { getPath } = require("../utils");

class Event {
  constructor(id, title, description, date, maxSeats) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = new Date(date);
    this.maxSeats = maxSeats;
  }

  /**
   * given a file path it retun an array of istances of the Event class
   * the given file must be a json with the correct properties
   * @param {string} filePath
   * @returns
   */
  static read(filePath) {
    const jsonFile = fs.readFileSync(filePath, "utf8");
    const eventsArray = JSON.parse(jsonFile);
    return eventsArray.map(
      (e) => new Event(e.id, e.title, e.description, e.date, e.maxSeats)
    );
  }

  /**
   * given the filepath and an array of events, saves them in the file
   * pass all the array to not overwrite the file [...array,...events]
   * @param {string} filePath
   * @param {Array} events
   */
  static save(filePath, events) {
    const jsonFile = JSON.stringify(events);
    fs.writeFileSync(filePath, jsonFile, "utf8");
  }

  /**
   * receive an array of events and an object of filters
   * it return the filtered array
   * @param {Array} events
   * @param {object} filters
   * @returns
   */
  static filterEvents(events, filters) {
    if (!filters || Object.keys(filters).length === 0) {
      return events;
    }

    return events.filter((e) => {
      for (const key in filters) {
        if (key === "date") {
          const filterDate = new Date(filters[key]);
          const eventDate = new Date(e[key]);
          if (eventDate < filterDate) return false;
        } else if (key === "maxSeats") {
          if (e[key] > filters[key]) return false;
        } else {
          if (e[key] != filters[key]) return false;
        }
      }
      return true;
    });
  }

  static associatedReservations(eventId) {
    const ids = Event.read(
      getPath("eventsDb", { directory: "db", extension: "json" })
    ).map((e) => e.id);

    if (!ids.includes(eventId)) return [];

    const reservations = Reservation.read(
      getPath("reservationsDb", { directory: "db", extension: "json" })
    );

    console.log(reservations);

    return reservations.filter((r) => r.eventId === eventId);
  }
}

module.exports = Event;

const fs = require("fs");

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
}

module.exports = Event;

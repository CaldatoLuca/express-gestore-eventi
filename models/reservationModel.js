const fs = require("fs");

class Reservation {
  constructor(id, firstName, lastName, email, eventId) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.eventId = eventId;
  }

  /**
   * given a file path it retun an array of istances of the Event class
   * the given file must be a json with the correct properties
   * @param {string} filePath
   * @returns
   */
  static read(filePath) {
    const jsonFile = fs.readFileSync(filePath, "utf8");
    const reservationsArray = JSON.parse(jsonFile);
    return reservationsArray.map(
      (r) => new Reservation(r.id, r.firstName, r.lastName, r.email, r.eventId)
    );
  }
}

module.exports = Reservation;

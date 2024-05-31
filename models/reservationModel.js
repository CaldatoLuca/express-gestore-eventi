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
   * Setter for id
   */
  setId(value) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("Invalid ID. ID must be a positive integer.");
    }
    this.id = value;
  }

  /**
   * Setter for firstName
   */
  setFirstName(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        "Invalid first name. First name must be a non empty string."
      );
    }
    this.firstName = value;
  }

  /**
   * Setter for lastName
   */
  setLastName(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(
        "Invalid last name. Last name must be a non empty string."
      );
    }
    this.lastName = value;
  }

  /**
   * Setter for email
   */
  setEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string" || !emailRegex.test(value)) {
      throw new Error("Invalid email. Email must be a valid email address.");
    }
    this.email = value;
  }

  /**
   * Setter for eventId
   */
  setEventId(value) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("Invalid event ID. Event ID must be a positive integer.");
    }
    this.eventId = value;
  }

  /**
   * given a file path it retun an array of istances of the Reservation class
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

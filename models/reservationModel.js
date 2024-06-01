const fs = require("fs");
const CustomError = require("../exceptions/customErrors");

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
      throw new CustomError("Invalid ID. ID must be a positive integer.", 400);
    }
    this.id = value;
  }

  /**
   * Setter for firstName
   */
  setFirstName(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new CustomError(
        "Invalid first name. First name must be a non empty string.",
        400
      );
    }
    this.firstName = value;
  }

  /**
   * Setter for lastName
   */
  setLastName(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new CustomError(
        "Invalid last name. Last name must be a non empty string.",
        400
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
      throw new CustomError(
        "Invalid email. Email must be a valid email address.",
        400
      );
    }
    this.email = value;
  }

  /**
   * Setter for eventId
   */
  setEventId(value) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new CustomError(
        "Invalid event ID. Event ID must be a positive integer.",
        400
      );
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

  /**
   * given the filepath and an array of reservations, saves them in the file
   * pass all the array to not overwrite the file [...array,...events]
   * @param {string} filePath
   * @param {Array} events
   */
  static save(filePath, events) {
    const jsonFile = JSON.stringify(events);
    fs.writeFileSync(filePath, jsonFile, "utf8");
  }

  static deleteReservation(filePath, reservationId) {
    const filteredReservations = Reservation.read(filePath).filter(
      (r) => r.id !== reservationId
    );
    Reservation.save(filePath, filteredReservations);
  }
}

module.exports = Reservation;

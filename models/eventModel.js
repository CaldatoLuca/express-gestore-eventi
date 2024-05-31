class Event {
  constructor(id, title, description, date, maxSeats) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = new Date(date);
    this.maxSeats = maxSeats;
  }
}

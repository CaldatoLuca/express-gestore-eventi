const index = (req, res) => {
  res.json({
    message: "Reservations List",
    status: 200,
    route: "/events/:event/reservations",
  });
};

const store = (req, res) => {
  res.json({
    message: "Store a reservation",
    status: 200,
    route: "/events/:event/reservations",
  });
};

const destroy = (req, res) => {
  res.json({
    message: "Delete a reservation",
    status: 200,
    route: "/events/:event/reservations/:reservation",
  });
};

module.exports = {
  index,
  store,
  destroy,
};

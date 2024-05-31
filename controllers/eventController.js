const index = (req, res) => {
  res.json({
    message: "Index Page",
    status: 200,
    route: "/events",
  });
};

const store = (req, res) => {
  res.json({
    message: "Store APi",
    status: 200,
    route: "/events ",
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

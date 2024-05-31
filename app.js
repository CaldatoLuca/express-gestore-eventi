const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT;

app.use(morgan("dev"));

const eventRouter = require("./routers/eventRouter");

app.get("/", (req, res) => {
  res.json({
    message: "Home Page",
    status: 200,
    route: "/",
  });
});

app.use("/events", eventRouter);

app.listen(port, () => {
  console.log(`Server pronto a http://localhost:${port}`);
});

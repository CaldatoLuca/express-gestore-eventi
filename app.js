const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT;

//routers
const eventRouter = require("./routers/eventRouter");
//middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Home Page",
    status: 200,
    route: "/",
  });
});

app.use("/events", eventRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server pronto a http://localhost:${port}`);
});

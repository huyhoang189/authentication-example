const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const pageNotFound = require("./middlewares/handler/page-not-found");
const errorHandler = require("./middlewares/handler/error-handler");
const swaggerDocs = require("../swagger");
const config = require("./configs");

//init app
const app = express();
swaggerDocs(app, config.api.port);
//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//init database
require("./dbs/init-mongodb");

app.use("/api/v1", require("./routes"));

app.use("*", pageNotFound);

app.use(errorHandler);

module.exports = app;

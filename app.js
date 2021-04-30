const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
require("dotenv").config();
const app = express();

const indexRouter = require("./_routes/index");
const invoicesRouter = require("./_routes/invoices");

const catchAllRouter = require("./_routes/catchall");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "public/dist/")));
app.use("/images", express.static(path.join(__dirname, "_images")));
app.use(cors());

// Connect Database
require("./_startup/db")();

app.use("/", indexRouter);
app.use("/invoices", invoicesRouter);

app.use("**", catchAllRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

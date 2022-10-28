var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const moviesRouter = require("./routes/customers");
const clienteEmail = require("./routes/clienteEmail");
const clienteCuentas = require("./routes/clienteCuentas");
const cuentasConLimite = require("./routes/cuentasConLimite");
const clientesConLimite = require("./routes/clientesConLimite");
const transaccionesClienteByNombre = require("./routes/transaccionesClienteByNombre");

const cors = require("cors");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users/", usersRouter);
app.use("/api/customers/", moviesRouter);
app.use("/api/clienteEmail/",clienteEmail);
app.use("/api/clienteCuentas/",clienteCuentas);
app.use("/api/cuentasConLimite/",cuentasConLimite);
app.use("/api/clientesConLimite/",clientesConLimite);
app.use("/api/transaccionesClienteByNombre/", transaccionesClienteByNombre);


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

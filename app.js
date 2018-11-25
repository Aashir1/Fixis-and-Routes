var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors= require("cors");
var socket = require('socket.io');
var LiveTrack = require("./routes/LiveTrack");
var LiveTrackCont = require("./Controller/LiveTrackController")


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var authRouter = require("./routes/Auth");
var busRoute = require("./routes/BusRoute");
var busInfo = require("./routes/BusInfo");

var app = express();

var io = socket();
app.io = io;


app.use(cors());
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// var insertData = require("./Model/RouteInsertModel")();
require("./socket-io/index")(io);
app.use("/", authRouter);
app.use("/busroute", busRoute);
app.use("/businfo", busInfo);
app.post("/live", (req, res) => {
  LiveTrackCont.addCurrLocation(req.body)
})
app.use("/livetracking", LiveTrack);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  err.message = "Not Found"
  next(err);
});

// error handlerl
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ status: "error", error: err.message });
});


module.exports = app;

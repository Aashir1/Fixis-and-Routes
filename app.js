var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var authRouter = require('./routes/Auth');
var bodyParser = require('body-parser');
var cors = require('cors');
var socket = require('socket.io');
var LiveTracking = require('./Services/LiveTracking');


// .then(() => {
//   console.log('connection is established');
// }).catch(() => {
//   console.log('connection error occure');
// })


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var io = socket();
app.io = io;


app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', function (socket) {
//   console.log('connection is established');
//   socket.emit('message', { name: 'aashir khan', id: 12345 });
// });
require('./Services/LiveTracking')(io);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('comming there');
  next(createError(404));
});

// error handlerl
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log('comming there')
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({ status: 'error', message: err.message })
});

module.exports = app;
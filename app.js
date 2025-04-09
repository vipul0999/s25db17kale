// ------------------- Module Imports -------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');

// ------------------- App Initialization -------------------
var app = express();

// ------------------- View Engine Setup -------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ------------------- Middleware Setup -------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ------------------- Route Modules -------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var gadgetsRouter = require('./routes/gadgets');

// ------------------- Routes Setup -------------------
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/', pickRouter);
app.use('/gadgets', gadgetsRouter);

// ------------------- 404 and Error Handling -------------------
// Catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// General Error Handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// ------------------- MongoDB Connection Setup -------------------
const connectionString = process.env.MONGO_CON;

mongoose.connect(connectionString); // ✅ Removed deprecated options

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
  console.log("✅ Connection to DB succeeded");
});

module.exports = app;
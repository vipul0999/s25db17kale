// app.js
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const gadgetsRouter = require('./routes/gadgets');
const resourceRouter = require('./routes/resource');

const Gadget = require('./models/gadget');

const app = express();

// MongoDB connection
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connection to DB succeeded');
});

// Optional: Seed DB
async function recreateDB() {
  await Gadget.deleteMany();

  const g1 = new Gadget({ gadget_name: 'Smartphone', brand: 'Samsung', price: 799 });
  const g2 = new Gadget({ gadget_name: 'Laptop', brand: 'Dell', price: 999 });
  const g3 = new Gadget({ gadget_name: 'Smartwatch', brand: 'Apple', price: 399 });

  await g1.save();
  await g2.save();
  await g3.save();
  console.log('📦 Sample gadgets saved');
}

let reseed = true;
if (reseed) recreateDB();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var gadgetsRouter = require('./routes/gadgets'); // Add this line

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/', pickRouter);

app.use('/gadgets', gadgetsRouter);
app.use('/resource', resourceRouter);
app.use('/gadgets', gadgetsRouter); // Add this line

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;


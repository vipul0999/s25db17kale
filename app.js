require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const gadgetsRouter = require('./routes/gadgets');
const resourceRouter = require('./routes/resource');

const Gadget = require('./models/gadget');
const Account = require('./models/account');

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

const reseed = true;
if (reseed) recreateDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session and Passport initialization
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Define the routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/', pickRouter);
app.use('/gadgets', gadgetsRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
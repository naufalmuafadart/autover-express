require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./app/interfaces/auth/router');

// cors
const corsOptions = { origin: process.env.FRONT_END_ORIGIN };

const app = express();

app.use(cors(corsOptions));

// mongoose
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/autover');
}
main().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
}).finally(() => {});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to exceptions handler
app.use((req, res, next) => {
  next(createError(404));
});

// exceptions handler
app.use((err, req, res, next) => {
  // set locals, only providing exceptions in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the exceptions page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

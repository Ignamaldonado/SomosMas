const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config()
const expressFileupload = require('express-fileupload')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mailerRouter = require('./routes/mailerRouter');
const authRouter = require('./routes/auth')
const newsRouter = require('./routes/news');
const testimonialsRouter = require('./routes/testimonialsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const membersRouter = require('./routes/members')
const organizationRouter = require('./routes/organization')
const activitiesRouter = require('./routes/activities')
const contactsRouter = require('./routes/contacts')
const checkoutRouter = require('./routes/checkoutRouter')

const app = express();
app.use(cors())
app.use(expressFileupload())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/news', newsRouter)
app.use('/categories', categoriesRouter)
app.use('/testimonials', testimonialsRouter);
app.use('/activities', activitiesRouter)
app.use('/contacts', contactsRouter)
app.use('/members', membersRouter)
app.use('/organization', organizationRouter)
app.use('/checkout', checkoutRouter)

app.use('/api/mail', mailerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

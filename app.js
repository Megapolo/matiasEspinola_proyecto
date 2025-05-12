var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var methodOverride = require('method-override')
require('dotenv').config()

var cartRouter = require('./routes/products/cart_router');
var indexRouter = require('./routes/index_router');
var userRouter = require('./routes/users/users_router');
var productRouter = require('./routes/products/product_router');
var searchRouter = require('./routes/products/search_router');
var adminRouter = require('./routes/users/admin_router');
var productApiRouter = require('./routes/products/productApi_router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SECURE,
  resave: false,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/cart', cartRouter)
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/users', userRouter)
app.use('/admin', adminRouter)
app.use('/product', productRouter)
app.use('/products', searchRouter);
app.use('/api', productApiRouter)

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

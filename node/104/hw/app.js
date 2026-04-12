var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var session = require('express-session');
app.use(session({
  secret: 'foo',
  ressave: false,
  saveUninitialized: false
}))

app.use((req,res,next) =>{
  res.locals.username = req.session.user || 'User'
  next()
})

app.post('/userInfo',(req,res,next) =>{
  console.log('old name',req.session.user)
  req.session.user = req.body.user
  console.log(req.body.user,'heydo',req.session.user)
  res.redirect('/')
})

app.use('/viewCount',(req,res,next) =>{
  res.send('hello world')
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

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

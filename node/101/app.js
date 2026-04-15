import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';

const app = express();

// view engine setup
const __dirname = import.meta.dirname;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// could disable cache for everyone here

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = {};//req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('layout', {
    partials: { content: 'error' }
  });
});

app.locals.appTitle = 'PCS Contacts';

export default app;


//////////////////

//import mysql from 'mysql2/promise';

/*const*/ /*global.connection = await mysql.createConnection({
  host: 'localhost',
  user: 'noduser2',
  password: 'password123',
  database: 'noduser2',
});*/

/*try {
  const [results, fields] = await connection.query(
    'SELECT * FROM contacts'
  );

  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
  console.log(err);
}*/


/*
global.pool = mysql.createPool({
  host: 'localhost',
  user: 'noduser2',
  password: 'password123',
  database: 'noduser2',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
*/

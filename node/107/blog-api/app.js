import express from 'express';
import http from 'http';
import {MongoClient} from 'mongodb';
import cors from 'cors';
import {Server} from 'socket.io';
import Posts from './routes/posts.js';
import Authentication from './routes/authentication.js';
import session from 'express-session';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer,{
  cors:'http://localhost:5173'
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

app.use(async (req, res, next) => {
  
  try {
    req.db = await client.db('blog');
    req.io = io

    next();
  } catch (e) {
    next(e);
  }
});

/*app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  next();
});*/

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/',Authentication)
app.use('/posts',Posts)


// app.route('/posts/:id')

app.use(function (req, res, next) {
  const error = new Error('404. Not found');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.statusCode = err.statusCode || 500;
  res.end(err.message);
});

httpServer.listen(8080);

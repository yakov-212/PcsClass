import express from 'express';
import http from 'http';
import path from 'path';
import hogan from 'hogan-express'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = import.meta.dirname;
app.engine('hjs',hogan)
app.set('view engine','hjs')
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res,next) =>{
  res.render('login')
})
app.post('/login',(req,res,next) =>{
  //put verification here
  res.locals.userName = req.body.userName
  io.emit('msg',`${req.body.userName} has joined the chat`)
  res.redirect('index.html')
})
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('got a connection');

  /*setInterval(() => {
    socket.emit('msg', 'hello from server');
  }, 1000);*/

  socket.on('msg', msg => {
    //socket.broadcast.emit('msg', msg);
    io.emit('msg', msg);
  });
});

server.listen(80);

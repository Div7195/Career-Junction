import express from 'express'
import dbConnection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
dotenv.config();

const app = express();

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.get('/', (req, res) => {
  res.send('hellp')
})
app.use('/',Router);
const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const server = app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  });
  
io.sockets.on('connection', (socket) => {
  // console.log(socket.id)
    socket.on('forceDisconnect', function() {
      console.log(socket.id)
        
        socket.disconnect()
        console.log('Client disconnected'+socket.id);
    });

    socket.on("joinroom", (room) => {
        socket.room = room
        socket.join(room);
        console.log("User Joined Room: " + room);
        console.log('socket id is' + socket.id)
        io.in(room).fetchSockets().then((sockets) => {
          console.log(sockets.length)
        })
    });
    socket.on('send', function(msg){
      console.log(msg)
      io.to(socket.room).emit('receive', msg);
    });
    socket.on('disconnect', function(){
      console.log('a socket disconnected')
      io.in('65845556fe57e674acc4cd86').fetchSockets().then((sockets) => {
        console.log(sockets.length)
      })
    })
   
});


dbConnection(USERNAME, PASSWORD);
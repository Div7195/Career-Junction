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
app.use(cors({
  origin: ['https://career-junction-app.vercel.app','https://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE'],
}));
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
    origin: ['https://career-junction-app.vercel.app','https://localhost:3000'],
    methods: ['GET', 'POST'],
  },
  });
  io.sockets.on('connection', (socket) => {
    console.log('new socket')
      socket.on('forceDisconnect', function() {
        console.log(socket.id)
          
          socket.disconnect()
          console.log('User disconnected'+socket.id);
      });
  
      socket.on("joinroom", (room) => {
        console.log('want to join room')
          socket.room = room
          socket.join(room);
          console.log("User Joined Room: " + room);
          
      });
      socket.on('send', function(msg){
        
        console.log(msg.msg)
        io.to(socket.room).emit('receive', msg);
      });
      socket.on('disconnect', function () {

        console.log('user disconnected')
  
    });

  })


dbConnection(USERNAME, PASSWORD);
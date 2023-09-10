const express = require('express');
const app = express();
const http = require('http')
const {Server} = require("socket.io")
const cors = require("cors")

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});

let userID = [];
// console.log(userID)
io.on('connection',(socket)=>{
    console.log(`A user connected ${socket?.id}`)
    socket.on('send_id',(data)=>{
        userID.push(data?.id)
        console.log(userID)
    })
    socket.on('send_req',(data)=>{
        userID.push(data?.id)
        console.log(userID)
    
    if (userID.length >= 2) {
        console.log('Triggered')
        if (userID[-1] === userID[-2]) {
            console.log(userID[0],userID[1])
            socket.broadcast.emit('get_res',{message:"in",room_id:userID[-1]})
        }
        userID = []
    }
})
})

server.listen(3001,()=>{
    console.log("SERVER IS RUNNING")
})

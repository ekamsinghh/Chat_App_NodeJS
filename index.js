const express=require('express');
const app=express();

const http = require('http');
const server = http.createServer(app);

const socketio = require("socket.io");
const io = new socketio.Server(server);

app.use('/',express.static(__dirname+'/public'));
//* it helps to connect to static files like HTML

io.on('connection',(socket) => {
    console.log("A user connected");


    socket.on("btn_click",(data)=>{
        console.log(data);
        io.emit("data recieved",data);
        //* io.emit will emit it to the every websocket connection on the server
        //* whereas socket.emit will emit it to the specific socket that is connected to the server
        //* socket.broadcast.emit will emit it to all the sockets except the one that is connected
    })
});

server.listen(3000,()=>{
    console.log("Server started");
});

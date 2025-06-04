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

    setInterval(()=>{
        socket.emit("from_server");
    },2000);

    socket.on("from_client",()=>{
        console.log("Recieved Message from client");
    });

    socket.on("btn_click",()=>{
        console.log("Button clicked");
    })
});

server.listen(3000,()=>{
    console.log("Server started");
});

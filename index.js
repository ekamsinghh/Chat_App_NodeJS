const express=require('express');
const app=express();

const Chat=require('./models/chat');

const connect = require('./config/database-config');

const http = require('http');
const server = http.createServer(app);

const socketio = require("socket.io");
const io = new socketio.Server(server);

app.use('/',express.static(__dirname+'/public'));
//* it helps to connect to static files like HTML

app.set('view engine','ejs');//* it helps to connect to ejs files


app.get('/chat/:roomid',async (req,res)=>{
    const chats=await Chat.find({
        roomId: req.params.roomid
    });
    console.log("chats: ",chats);
    res.render('index',{
        message: "Connected to your personalised chat room",
        id: req.params.roomid,
        chats: chats
    });
});



io.on('connection',(socket) => {
    console.log("A user connected");

    socket.on("join_room",(data)=>{
        console.log("Recieved data: ",data);
        socket.join(data.roomid);
    });


    socket.on("btn_click",async (data)=>{
        // io.emit("data recieved",data.msg);
        //* "io.emit" will emit it to the every websocket connection on the server
        //* whereas "socket.emit" will emit it to the specific socket that is connected to the server
        //* "socket.broadcast.emit" will emit it to all the sockets except the one that is connected

        console.log(data);
        const chat=await Chat.create({
            roomId: data.roomid,
            content: data.msg,
            user: data.username
        });
        io.to(data.roomid).emit("data recieved",data);
    });
});

server.listen(3000,async ()=>{
    console.log("Server started");
    await connect();
    console.log("MongoDB connected");
});

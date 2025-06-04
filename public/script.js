var socket = io();

socket.on("from_server",()=>{
    let div=document.createElement("div");
    div.innerText="Hello from server";
    document.body.appendChild(div);
});
//* socket.on is used to listen the event emitted from the other side of the connection

setInterval(()=>{
    socket.emit("from_client");
},2000);
//* socket.emit is used to emit the event to the other side of the connection

let btn=document.getElementById("btn");

//* first way: 
// btn.addEventListener("click",()=>{
//     socket.emit("btn_click");
// });

//* other way to do so:
btn.onclick=()=>{
    socket.emit("btn_click");
}

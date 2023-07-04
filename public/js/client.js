const ip_name = document.getElementById("name")
const ip_room = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const ip_message = document.getElementById("ip_message")
const btn_send = document.getElementById("btn_send")

const ul_message = document.getElementById("ul_message")

var socket = io.connect()

let my_name = "";

socket.on("connect", function(data){
    console.log(data);
})

btn_join.addEventListener('click', ()=>{ 
    const room = ip_room.value
    my_name = ip_name.value
    socket.emit("join", room)
    alert(`Join room ${room} thành công!`)
})

const sendMessage = ()=>{
    const message = ip_message.value
    if (!message){
        return;
    }
    const obj = {
        name: my_name,
        message: message
    }
    socket.emit("message", JSON.stringify(obj));
    ip_message.value = ''
    ip_message.focus();
}

btn_send.addEventListener("click", sendMessage)

ip_message.addEventListener('keydown', (event)=>{
    if (event.key === "Enter"){
        sendMessage()
    }
})

socket.on("thread", function(data){
    const obj = JSON.parse(data)

    const li = document.createElement("li")
    li.innerHTML = obj.message;

    if (obj.name === my_name){
        li.classList.add("right")
    }

    ul_message.appendChild(li)
})
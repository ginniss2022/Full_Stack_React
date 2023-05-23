import io from "socket.io-client";

const socket = io.connect('http://127.0.0.1:8080/');

function Chat () {
    return (
        <h1> Chat </h1>
    )
}

export default Chat;
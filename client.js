"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("ws://localhost:3000");
process.stdin.on("data", (data) => {
    const [action, room, ...msg] = data.toString().split(" ");
    if (action === "join") {
        if (room) {
            socket.emit(action, room.slice(0, room.length - 1));
        }
        else {
            console.error("Enter room name");
        }
    }
    else if (action === "send") {
        if (!room) {
            console.error("Enter room name");
        }
        else if (msg.length === 0) {
            console.error("No msg");
        }
        else {
            socket.emit("msg", room, msg);
        }
    }
    else {
        console.log("enter action");
    }
});
socket.on("rcv", (msg) => {
    console.log(msg);
});
/*
const socket1 = io("ws://localhost:3000");
const socket2 = io("ws://localhost:3000");

socket1.emit("join", "room1");
socket2.emit("join", "room1");

socket1.emit("msg", "room1", "helu");

socket1.on("rcv", (msg) => {
  console.log(msg);
});

socket2.on("rcv", (msg) => {
  console.log(msg);
});
*/
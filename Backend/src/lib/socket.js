import http from "http";
import { Server } from "socket.io";
import express from "express";
// import socket from "../../../Frontend/src/socket";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}


// To store the online users
const userSocketMap = {}; // key -> UserId & value -> SocketId

io.on("connection", (socket) => { //io.on is used as a doorway for new users to enter
    console.log("User Connected", socket.id);

    const userId = socket.handshake.query.userId; // get the userId from the handshake data
    if(userId) userSocketMap[userId] = socket.id;

    // io.emit is used to send events to all the connected users clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () =>{ //socket.on is used to once the connection is established
        console.log("User Disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


export {io,app,server};

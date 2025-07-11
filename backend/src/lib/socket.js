import { Server } from "socket.io";
import http from 'http';
import express from 'express'
import { log } from "console";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
})

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

// To store the online users 
const userSocketMap = {};   //Saving format: {iserId: socketId}

io.on("connection", (socket) => {
    console.log("A User has connected: ", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("The user disconnected: ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

export { io, app, server }
import { Server } from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import express from "express";
import namespaces from "./namespaces.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(3001, () => console.log("server running on 3001"));
const io = new Server(expressServer);

io.on('connection', (socket) => {
    socket.emit("nsData", namespaces.map((ns) => ns))
})

namespaces.forEach((namespace) => {

    io.of(namespace.endpoint).on("connection", (socket) => {
        console.log(`${socket.id} has joined ${namespace.endpoint}`)
        socket.emit('nsRoomLoad',namespace.rooms)
        
        socket.on('joinRoom', (room,memberCntCallback) => {

            const roomTitle = Array.from(socket.rooms)[1]
            if (roomTitle!==undefined) {
                socket.leave(roomTitle)
                const prevClients = io._nsps.get(namespace.endpoint).adapter.rooms.get(roomTitle)
                if (prevClients!==undefined) {
                    io.of(namespace.endpoint).in(roomTitle).emit('memberCntUpdate', prevClients.size)
                }
                
            }

            socket.join(room)
            const clients = io._nsps.get(namespace.endpoint).adapter.rooms.get(room).size
            memberCntCallback(clients)
            const nsRoom = namespace.rooms.find((nsrooms) => {
                return nsrooms.roomTitle === room
            })
            
            socket.emit('loadHistory', nsRoom.history)
            io.of(namespace.endpoint).in(room).emit('memberCntUpdate', clients)
        })

        socket.on('newMsg',(msg) => {
            const roomTitle = Array.from(socket.rooms)[1]
            const nsRoom = namespace.rooms.find((room) => {
                return room.roomTitle === roomTitle
            })
            nsRoom.addMsg(msg)
            io.of(namespace.endpoint).to(roomTitle).emit('loadHistory',nsRoom.history) //temporary fix bad time complexity
        })

    })

});



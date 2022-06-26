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
        socket.emit('nsRoomLoad',namespaces[0].rooms)
        
        socket.on('joinRoom', (room,memberCntCallback) => {
            socket.join(room)
            const clients = io._nsps.get('/wiki').adapter.rooms.get(room).size
            memberCntCallback(clients)
        })

        socket.on('newMsg',(msg) => {
            const roomTitle = Array.from(socket.rooms)[1]
            io.of('/wiki').to(roomTitle).emit('newMsgClient',msg)
        })

    })

});



// io.of('/').on("connection", (socket,req) => {
//     socket.on('newMsg',(msg) => {
//         io.of('/').emit('newMsgEveryone',msg) // just main namespace
//     })
// }); 
import { Server } from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import express from "express";
import Orb from "./public/sockets/classes/orb.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(3001, () => console.log("server running on 3001"));
export const io = new Server(expressServer);

const orbs = []

const InitGame = () => {
  for (let i=0; i<100; ++i) {
    orbs.push(new Orb())
  }
}

InitGame()

io.on("connection", (socket) => {
  socket.emit('initGame', {orbs})
})
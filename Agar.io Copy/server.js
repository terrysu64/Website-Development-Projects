import { Server } from 'socket.io';
import path from 'path';
import {fileURLToPath} from 'url';
import express from "express";
import Orb from "./public/sockets/classes/orb.js"
import Player from './public/sockets/classes/player.js';
import PlayerConfig from './public/sockets/classes/player-config.js';
import PlayerData from './public/sockets/classes/player-data.js';
import { CheckOrbCollision, CheckPlayerCollisions } from './collisions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(3001, () => console.log("server running on 3001"));
export const io = new Server(expressServer);

const defaultSettings = {
  orbs: 1,
  speed: 5,
  size: 6,
  zoom: 1.5,
  worldWidth: 100,
  worldHeight: 100,
}

const players = []
const orbs = []

const InitGame = () => {
  for (let i=0; i < defaultSettings.orbs; ++i) {
    orbs.push(new Orb(defaultSettings))
  }
}

InitGame()

io.on("connection", (socket) => {

  console.log(`${socket.id}: has connected`)

  var player = {}
  socket.on('clientInit', (data) => {
    socket.join('game')
    const playerConfig = new PlayerConfig(defaultSettings)
    const playerData = new PlayerData(data.playerName, defaultSettings, socket.id)
    player = new Player(socket.id, playerConfig, playerData)
    players.push(playerData)

    //30fps socket emits
    setInterval(() => {
      socket.emit('playerDataUpdate', {
        playerX: player.playerData.locX,
        playerY: player.playerData.locY
      })
      io.to("game").emit('playersUpdate', {players})
    }, 33)

    socket.emit('initGame', {orbs})
  })

  socket.on("disconnect", (data) => {
    players.forEach((p,i) => {
      if (p.socketId == socket.id) {
        players.splice(i,1)
      }
    })
  })

  socket.on("clientDataUpdate", (data) => {
    const speed = player.playerConfig.speed
    const xV = data.xV
    const yV = data.yV 
    player.playerConfig.xVector = data.xV
    player.playerConfig.yVector = data.yV

    if (xV !== undefined && yV !== undefined) { //only initialized after mouse moves (creates lag and could crash game)
      if ((player.playerData.locX < 5 && xV < 0) || (player.playerData.locX > defaultSettings.worldWidth) && (xV > 0)) {
        player.playerData.locY -= speed * yV;
      } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > defaultSettings.worldHeight) && (yV < 0)) {
          player.playerData.locX += speed * xV;
      } else {
          player.playerData.locX += speed * xV;
          player.playerData.locY -= speed * yV;
      }
    }

    CheckOrbCollision(player.playerData, player.playerConfig, orbs, defaultSettings)
      .then((data) => {
        const orbData = {
          orbIdx: data,
          newOrb: orbs[data]
        }
        io.emit("orbCollision", orbData)
        socket.emit("updateScore", {score: player.playerData.score})
      }).catch(() => null)

    CheckPlayerCollisions(player.playerData, player.playerConfig, players, socket.id)
      .then((data) => {
        socket.emit("updateScore", {score: player.playerData.score})
      }).catch(() => null)
      
  })
})

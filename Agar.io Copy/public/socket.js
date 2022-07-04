const socket = io("http://localhost:3001/", { transports : ['websocket'] })

const init = () => {
  draw()
  socket.emit('clientInit', {
    playerName: player.name
  })
}

socket.on('initGame', (data) => {
  orbs = data.orbs
  setInterval(() => {
    socket.emit("clientDataUpdate", {
      xV: player.xV,
      yV: player.yV
    })
  }, 33)
})

socket.on("dataUpdate", (data) => {
  players = data.players
  player.locX = data.playerX
  player.locY = data.playerY
})

socket.on("orbCollision", (data) => {
  orbs.splice(data.orbIdx,1,data.newOrb)
})

 
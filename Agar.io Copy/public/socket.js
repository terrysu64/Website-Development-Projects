const socket = io("http://localhost:3001/", { transports : ['websocket'] })

const updateLeaderboard = () => {
  const leaderboard = document.querySelector('.leader-board') 
  leaderboard.innerHTML=""
  const rankedPlayers = players.sort((a, b) => b.score - a.score);
  for (let i=0; i<Math.min(players.length, 5); ++i) {
    leaderboard.innerHTML += `<li class="leaderboard-player game-font2">${rankedPlayers[i].name}: ${rankedPlayers[i].score}</li>`
  }
} 

const init = () => {
  draw()
  socket.emit('clientInit', {
    playerName: player.name
  })
  updateLeaderboard()
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

socket.on("playersUpdate", (data) => {
  players = data.players
})

socket.on("playerDataUpdate", (data) => {
  player.locX = data.playerX
  player.locY = data.playerY
})

socket.on("orbCollision", (data) => {
  orbs.splice(data.orbIdx,1,data.newOrb)
})

socket.on("updateScore", (data) => {
  document.querySelector('.player-score').innerHTML = data.score 
  updateLeaderboard()
})
const socket = io("http://localhost:3001/", { transports : ['websocket'] })

socket.on('initGame', (data) => {
  orbs = data.orbs
})


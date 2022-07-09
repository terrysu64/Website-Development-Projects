const socketMain = (io,socket) => {

  socket.on("auth", (key) => {
    if (key === "tempnodeclientkey") {
      socket.join('nodeClients')
    } else if (key === "tempuikey") {
      socket.join('ui')
    } else {
      socket.disconnect(true)
    }
  })

  socket.on("perfData", (data) => {
    console.log(data)
  })
}

export default socketMain
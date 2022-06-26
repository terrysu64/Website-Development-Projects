const JoinRoom = (roomName) => {
  nsSocket.emit('joinRoom', roomName, (memberCnt) => {
    document.querySelector('.room-members').innerHTML = `<span>${memberCnt} client(s) in room</span>`
  })
}
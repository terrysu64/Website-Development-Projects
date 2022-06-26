const JoinNs = (endpoint) => {
  nsSocket = io(`http://localhost:3001/${endpoint}`, { transports : ['websocket'] })
  nsSocket.on('nsRoomLoad', (rooms) => {

    const roomList = document.querySelector('.room-list')
    roomList.innerHTML=''
    rooms.forEach((room) => {
      roomList.innerHTML += `<li class='room'><u>${room.roomTitle}</u></li>`
    })

    Array.from(document.getElementsByClassName('room')).forEach((element) => {
      element.addEventListener('click', (e) => {
        console.log(`going to room: ${e.target.innerText}`)
      })
    })

    const tempRoom = document.querySelector('.room').innerText
    JoinRoom(tempRoom)


  })
}

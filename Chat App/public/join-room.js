const JoinRoom = (roomName) => {

  const roomTitle = document.querySelector('.room-title')
  roomTitle.innerHTML = roomName

  document.querySelector('#msg-form').removeEventListener('submit',msgSubmission)
  document.querySelector('#msg-form').addEventListener('submit',msgSubmission) 
  
  nsSocket.emit('joinRoom', roomName, (memberCnt) => {
    document.querySelector('.room-members').innerHTML = `<span>${memberCnt} client(s) in room</span>`
  })

  //needs fix
  // nsSocket.on('newMsgClient', (msg) => {
  //   console.log('adding message')
  //   document.querySelector('#msg-list').innerHTML += `<li>${msg.sender}: ${msg.message}</li>`
  // })

  nsSocket.on('loadHistory', (history) => {
    const msgUl = document.querySelector('#msg-list')
    msgUl.innerHTML = ""
    history.forEach((msg) => {
      msgUl.innerHTML += `<li>${msg.sender}: ${msg.message}</li>`
    })
  })
  
  nsSocket.on('memberCntUpdate', (cnt) => {
    document.querySelector('.room-members').innerHTML = `<span>${cnt} client(s) in room</span>`
  })
  
}
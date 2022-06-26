const socket = io("http://localhost:3001", { transports : ['websocket'] })
const socket1 = io("http://localhost:3001/wiki", { transports : ['websocket'] })
const socket2 = io("http://localhost:3001/mozilla", { transports : ['websocket'] })
const socket3 = io("http://localhost:3001/linux", { transports : ['websocket'] })


socket.on("nsData", (data) => {
  const nsDiv = document.querySelector('.namespaces')
  nsDiv.innerHTML = ''
  data.forEach((ns) => {
    nsDiv.innerHTML += `<button class="namespace" ns=${ns.endpoint}>${ns.nsTitle}</button>`
  })
  Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
    element.addEventListener('click', (e) => {
      console.log(`going to ${element.getAttribute('ns')}`)
    })
  })
})


// document.querySelector('#msg-form').addEventListener('submit', (event) => {
//     event.preventDefault()
//     const message = document.querySelector("#msg-input").value
//     socket.emit('newMsg',{sender: socket.id, message: message})
// })

// socket.on('newMsgEveryone',(msg) => {
//     document.querySelector('#msg-list').innerHTML += `<li>${msg.sender}: ${msg.message}</li>`
// }) 


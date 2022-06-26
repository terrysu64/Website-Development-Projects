const socket = io("http://localhost:3001", { transports : ['websocket'] })
var nsSocket = ""

socket.on("nsData", (data) => {

  const nsDiv = document.querySelector('.namespaces')
  nsDiv.innerHTML = ''
  data.forEach((ns) => {
    nsDiv.innerHTML += `<button class="namespace" ns=${ns.endpoint}>${ns.nsTitle}</button>`
  })

  Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
    element.addEventListener('click', (e) => {
      console.log(`going to namespace: ${element.getAttribute('ns')}`)
    })
  })

  JoinNs('wiki')
  
  document.querySelector('#msg-form').addEventListener('submit', (event) => {
      event.preventDefault()
      const message = document.querySelector("#msg-input").value
      nsSocket.emit('newMsg',{sender: nsSocket.id, message: message})
  })

  nsSocket.on('newMsgClient', (msg) => {
    document.querySelector('#msg-list').innerHTML += `<li>${msg.sender}: ${msg.message}</li>`
  })

})






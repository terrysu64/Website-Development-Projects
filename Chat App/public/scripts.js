const socket = io("http://localhost:3001", { transports : ['websocket'] })
var nsSocket = ""

const msgSubmission = (event) => {
  event.preventDefault()
  const message = document.querySelector("#msg-input").value
  nsSocket.emit('newMsg',{sender: nsSocket.id, message: message})
}

socket.on("nsData", (data) => {

  const nsDiv = document.querySelector('.namespaces')
  nsDiv.innerHTML = ''
  data.forEach((ns) => {
    nsDiv.innerHTML += `<button class="namespace" ns=${ns.endpoint.slice(1)}>${ns.nsTitle}</button>`
  })

  Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
    element.addEventListener('click', (e) => {
      const nsEndpoint = element.getAttribute('ns')
      JoinNs(nsEndpoint)
      console.log(`going to namespace: ${nsEndpoint}`)
    })
  })

  JoinNs('wiki') // default 

})






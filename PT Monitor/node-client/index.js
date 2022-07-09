//local preformace data

import os from "os"
import { io } from "socket.io-client"

const socket = io("http://localhost:8888/", { transports : ['websocket'] })

socket.on("connect", () => {

  //auth
  socket.emit("auth","tempnodeclientkey")

  console.log("client connected to socket.io server")
  const networkInterfaces = os.networkInterfaces()
  
  let macA
  for (let key of Object.keys(networkInterfaces)) {
    if (!networkInterfaces[key][0].internal) {
      macA = networkInterfaces[key][0].mac
      break
    }
  }

  getPreformance().then((data) => {
    data.macA = macA
    socket.emit("initPerfData",data)
  })
  
  const dataInterval = setInterval(() => {
    getPreformance().then((data) => {
      socket.emit("perfData",data)
    })
  }, 1000)

  socket.on("disconnect", () => {
    clearInterval(dataInterval)
  })
})

const getPreformance = async () => {
  const cpus = os.cpus()
  const cpuModel = cpus[0].model  
  const numCores = cpus.length
  const cpuSpeed = cpus[0].speed
  const cpuLoad = await getCpuLoad().then((data) => data)

  const osType = os.type()
  const upTime = os.uptime()
  const freeMemory = os.freemem()
  const totalMemory = os.totalmem()
  const memoryUsage = Math.floor((totalMemory - freeMemory) / totalMemory*100) / 100
  return {freeMemory,totalMemory,memoryUsage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad}
}


//AVG CPU IDLE/TOTAL USAGE TIME 
const cpuAvg = () => {
  const cpus = os.cpus()
  let idleMs = 0
  let totMs = 0

  cpus.forEach((core) => {
    for (const [type, typeMs] of Object.entries(core.times)) {
      totMs += typeMs
    }
    idleMs += core.times.idle
  })

  return {
    idle: idleMs / cpus.length,
    total: totMs / cpus.length
  }
}

//TIMES PROPRETY == TIME SINCE BOOT => DIFF == CPU LOAD SINCE TRACKING STARTED
const getCpuLoad = () => {
  return new Promise((resolve, reject) => {
    const start = cpuAvg()
    setTimeout(() => {
      const end = cpuAvg()
      const idleDiff = end.idle - start.idle
      const totDiff = end.total - start.total
      const percentageUsage = 100 - Math.floor(100 * idleDiff / totDiff)
      resolve(percentageUsage)
    }, 100)
  })
}


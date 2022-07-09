import express from "express"
import cluster from "cluster"
import net from "net"
import { Server } from "socket.io"
import socketMain from './socket-main.js'
import os from "os"
import io_redis from "socket.io-redis"
import farmhash from "farmhash"
import path from "path"
import { fileURLToPath } from 'url';
import helmet from "helmet"

const numProcesses = os.cpus().length

//master = proxy for workers
if (cluster.isMaster) {

  const workers = []

  const forkWorker = (idx) => {
    workers[idx] = cluster.fork()
    workers[idx].on("exit", (code, signal) => {
      forkWorker(idx)
      console.log(`restarting worker ${idx}`)
    })
  }

  const workerIdx = (ip, len) => {
    return farmhash.fingerprint32(ip) % len
  }

  for (let i=0; i < numProcesses; ++i) {
    forkWorker(i)
  }

  const server = net.createServer({ pauseOnConnect: true}, (connection) => {
    const worker = workers[workerIdx(connection.remoteAddress, numProcesses)]
    worker.send('sticky-session:connection', connection)
  })
  server.listen(8888)
  console.log("Primary listening on port 8888")

} else {

  const app = express()
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(__dirname + '/public'));
  app.use(helmet())

  const expressServer = app.listen(0, "localhost", () => console.log("worker listening"))
  const io = new Server(expressServer)
  io.adapter(io_redis({ host: 'localhost', port: 6379 }));

  io.on('connection', (socket) => {
    console.log(`connected to worker: ${cluster.worker.id}`);
    socketMain(io,socket)
  })

  process.on("message", (msg, connection) => {
    if (msg !== "sticky-session:connection") {
      return
    }
    expressServer.emit("connection", connection)
    connection.resume()
  })
}
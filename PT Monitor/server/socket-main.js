import dotenv from "dotenv"
import { MongoClient, ServerApiVersion } from "mongodb"

dotenv.config()

const uri = `mongodb+srv://terrysu64:${process.env.DATABASE_PASSWORD}@discord-bots.ho9kj.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
await client.connect()
const collection = client.db("pt-monitor").collection("clients");

const socketMain = (io,socket) => {

  let macA

  socket.on("auth", (key) => {
    if (key === "tempnodeclientkey") {
      socket.join('nodeClients')
    } else if (key === "tempuikey") {
      socket.join('ui')
    } else {
      socket.disconnect(true)
    }
  })

  socket.on("initPerfData", async (data) => {
    macA = data.macA
    const dbResponse = await newMachine(data)
    console.log(dbResponse)
  })

  socket.on("perfData", (data) => {
    //send to frontend
    console.log(data)
  })
}

const newMachine = (data) => {
  return new Promise((resolve, reject) => {
    const query = {macA: data.macA}
    collection.findOne(query, (err,doc) => {
      if (err) {
        throw err
        reject(err)
      } else if (doc === null) {
        collection.insertOne(data)
        console.log('A new machine was added to the DB!')
      } else{
        resolve('A known machine was found in the DB!')
      }
    })
  })
}

export default socketMain
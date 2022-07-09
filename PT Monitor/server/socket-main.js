import dotenv from "dotenv"
import { MongoClient, ServerApiVersion } from "mongodb"

dotenv.config()

const uri = `mongodb+srv://terrysu64:${process.env.DATABASE_PASSWORD}@discord-bots.ho9kj.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
await client.connect()
const collection = client.db("pt-monitor").collection("clients");

//test query
const testQuery = {test : "this is working"}
collection.find(testQuery).toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
});

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

  socket.on("initPerfData", (data) => {
    macA = data.macA
    //go mongo and check if its new
  })

  socket.on("perfData", (data) => {
    console.log(data)
  })
}

export default socketMain
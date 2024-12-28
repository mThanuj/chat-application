import kafka from "./client.js";
import {MongoClient} from "mongodb";

const mongoConnect= async()=>{
  const mongoClient = new MongoClient("mongodb+srv://mThanuj:6qlLNJtrgZhhyXqN@cluster0.0f4no.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  await mongoClient.connect();
  const db = mongoClient.db("test");
  const collection = db.collection("messages");
  return collection;
}

async function init(groupId) {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  let buffer = [];
  const batchSize = 3
  const flushBuffer = async()=>{
    if(buffer.length>0){
      const messages = buffer.splice(0,buffer.length);
      try{
        const collection = await mongoConnect();
        await collection.insertMany(messages);

      }catch(error){
        console.log("setInterval",error.message)
      }
    }
  }

  setInterval(flushBuffer,2000);

  await consumer.subscribe({
    topics: ["message_topic"],
    fromBeginning: true,
  });

  await consumer.run({
    autoCommit:true,
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        const msg = JSON.parse(message.value.toString("utf-8"));
        const messageToBeSent = {
          sender:msg.sender,
          receiver:msg.sender,
          message:msg.message,
        }
        buffer.push(messageToBeSent);
        if(buffer.length>batchSize)
          await flushBuffer();
    },
  })

}

export { init };

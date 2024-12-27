import {kafkaConsumer} from "../utils/kafka-utils/message.broker.js";
import {KAFKA_TOPIC} from "../constants.js";
import Message from "../models/message.model.js";
import {ObjectId} from "mongodb";

await kafkaConsumer.connect();

await kafkaConsumer.subscribe({
    topics:["message_topic"],
    fromBeginning:true,
})

await kafkaConsumer.run({
    autoCommit:false,
    eachMessage:async ({topic,partition,message})=>{
        try{
            const msg = JSON.parse(message.value.toString("utf-8"));
            const dbMessage = {
                sender:new ObjectId(msg.user._id),
                receiver:new ObjectId(msg.user._id),
                message:msg.message}
            const obj = new Message({...dbMessage});
            await obj.save();
            await kafkaConsumer.commitOffsets([
                {
                    topic,
                    partition,
                    offset:(parseInt(message.offset)+1).toString(),
                },
            ])
        }catch(err){
            console.log(err.message);
            await kafkaConsumer.disconnect();
        }
    }
}).catch(async e=>{
    await kafkaConsumer.disconnect();
})
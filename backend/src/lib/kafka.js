import {kafkaConsumer} from "../utils/kafka-utils/message.broker.js";
import {KAFKA_TOPIC} from "../constants.js";
import Message from "../models/message.model.js";

await kafkaConsumer.connect();

await kafkaConsumer.subscribe({
    topics:["message_topic"],
    fromBeginning:true,
})

await kafkaConsumer.run({
    autoCommit:true,
    eachMessage:async ({topic,partition,message})=>{
        let msg = message.value;
        console.log(msg2)
        // await Message.create({sender:msg.user,receiver:msg.receiverId,message:msg.message});
    }
}).catch(async e=>{
    await kafkaConsumer.disconnect();
})
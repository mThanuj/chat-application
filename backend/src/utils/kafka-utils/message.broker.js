import {Kafka} from "kafkajs";
import {KAFKA_CLIENT_ID, KAFKA_CONSUMER_GROUP} from "../../constants.js";

const kafka = new Kafka({
    clientId:KAFKA_CLIENT_ID,
    brokers:['localhost:9092'],

})

const kafkaProducer =  await kafka.producer();
const kafkaConsumer = await kafka.consumer({
    groupId:"chat_application" ,
});

export {kafkaProducer,kafkaConsumer}
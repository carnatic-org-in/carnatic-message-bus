const amqp = require('amqplib');
const restAPI =  require('./restHandler');
const configuration = require('./utils/config.js');

async function startListening() {
    let connection;
    let channel;
    const queueName = 'raaga-queue';
  
    const connect = async () => {
      console.info("Connecting to queue ", queueName);
      try {
        connection = await amqp.connect(`amqps://${configuration.AMQ_USER_NAME}:${configuration.AMQ_PASSWORD}@puffin.rmq2.cloudamqp.com/zsmnsmyd`);
        channel = await connection.createChannel();
        await channel.assertQueue(queueName);
  
        channel.consume(queueName, (message) => {
          console.log(`Received message: ${message.content.toString()}`);
          try{
            restAPI.callRaagaAPI(message, channel);
          }catch(error){
            console.error("Error ", error);
          }
          
        });
  
        channel.on('close', (err) => {
          console.log('Channel closed', err);
          // attempt to reconnect
          setTimeout(() => connect(), 5000);
        });
      } catch (err) {
        console.log('Error connecting', err);
        // attempt to reconnect
        setTimeout(() => connect(), 5000);
      }
    };
  
    await connect();
  }
  
  
  module.exports = startListening;
  
  
  
  
  
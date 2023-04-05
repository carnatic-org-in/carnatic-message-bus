const http = require('http');
const configuration = require('./utils/config.js');

async function callRaagaAPI(message, channel) {
    var messageObj = JSON.parse(message.content.toString());
    let postData = JSON.stringify(
        messageObj.Payload
      );
      
      var options = {
        hostname: configuration.RAAGA_API_HOST,
        port: configuration.RAAGA_API_PORT,
        path: '',
        method: '',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      if(configuration.RAAGA_API_VERSION) {
        options.path = "/"+configuration.RAAGA_API_VERSION+messageObj.URI;
      }else{
        options.path = messageObj.URI;
      }
      
      options.method = messageObj.Method;
      const request = http.request(options, (response) => {
        console.log("Successful "+ response);
        channel.ack(message);
      });
      
      request.on('error', (error) => {
        console.error(`Error occured while calling the RaagAPI ${error.stack}`)
        channel.nack(message, false, true);
      });
      
      request.write(postData);
      request.end();
}
module.exports = {
    callRaagaAPI 
}
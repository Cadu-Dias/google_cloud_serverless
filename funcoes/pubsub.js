const PubSub = require("@google-cloud/pubsub").PubSub
const instance = new PubSub()

module.exports = function pubsub (dados, topico) {
    try {
        dados = JSON.stringify(dados)
        dadosBuffer = Buffer.from(dados)
        return instance.topic(topico).publishMessage({data:dadosBuffer})
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
    }  
}


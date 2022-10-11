const { ClientEvent } = require('../base/utils');
class pm2Bus extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "pm2"
        });
        this.client = client;
    }
    async run(packet) {
        
    }
}
module.exports = pm2Bus;

const { ClientEvent } = require('../../../base/utils');
const { CronJob } = require('cron');

class ControlBan extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "_ready"
        });
        this.client = client;
    }

    async run(client) {
        client = this.client;
    
setInterval(async ()=> {
    const guild = client.guilds.cache.get(client.config.server);
    if (!guild) return;
    const finishedPenals = await client.models.penalties.find({ until:{ $lte: Date.now() }})
    finishedPenals.forEach(async (x) => {
        const member = guild.members.cache.get(x.userId);
        if (!member) return;
        switch (x.typeOf) {
            case "CMUTE":
           //    await member.roles.remove(client.data.roles["muted"]);

            break;
            default:
                break;
        }
    })

},1000 * 5)

    }
}
module.exports = ControlBan
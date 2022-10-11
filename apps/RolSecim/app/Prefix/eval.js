const { PrefixCommand } = require("../../../../base/utils");
class ping extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "ping",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            category: "OWNER",
            aliases: ["ms"],
            accaptedPerms: ["fırat"],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: true,
            dmCmd: false
        });
    }

    async run(client, message, args) {
message.channel.send({content: `${client.ws.ping} ms`});


    }

}

module.exports = ping;

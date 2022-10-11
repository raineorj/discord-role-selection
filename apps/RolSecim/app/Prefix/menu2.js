const { PrefixCommand } = require("../../../../base/utils");
const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
class Eval extends PrefixCommand {

    constructor(client) {
        super(client, {
            name: "menu2",
            description: "sunucunun linkini gönderir",
            usage: "menü2",
            examples: ["link2"],
            cooldown: 300000,
            ownerOnly: true
        });
    }
    async run(client, message, args) {

        await message.channel.send({
            embeds: [
            ],
            components: [

                {
                    type:"ACTION_ROW",
            components:[{
                type:"SELECT_MENU",
                customId:"takim",
                placeholder:"Takım rollerini görüntülemek için tıkla!",
                maxValues: 1,
                minValues:1,
                options: [{
                    label: "Fenerbahçe",
                    value: "takim_fb",
                    description: "Fenerbahçe rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_fb",
                        id: "993311011761303612"
                    }

                },
                {
                    label: "Galatasaray",
                    value: "takim_gs",
                    description: "Galatasaray rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_gs",
                        id: "993315499809177691"
                    }
                },
                {
                    label: "Beşiktaş",
                    value: "takim_bjk",
                    description: "Beşiktaş rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_bjk",
                        id: "993315497607184444"
                    }
                },
                {
                    label: "Trabzonspor",
                    value: "takim_ts",
                    description: "Trabzonspor rolüne sahip olmak için tıkla!",
                    emoji: {
                        name: "ashera_ts",
                        id: "993315502048952360"
                    }
                },
                {
                    label: "Temizle",
                    value: "takim_temizle",
                    emoji: {
                        name: "🗑️"
                    }
                }
            ]
            }]

                },
                            ]
                      });
    }

}

module.exports = Eval;

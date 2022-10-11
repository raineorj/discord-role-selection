const { MessageEmbed } = require('discord.js');
const { ClientEvent } = require('../../../base/utils');

class LinkBlock extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "messageUpdate"
        });
        this.client = client;
    }
    async run(oldmsg, message) {
        const client = this.client;
        if (!oldmsg.guild) return;
        if (message.author.bot) return;
        //const embed = new MessageEmbed().setColor("#2f3136").setDescription(`Eski Mesaj:\n\`\`\`${oldmsg.content}\`\`\`\nYeni Mesaj:\n\`\`\`${curmsg.content}\`\`\`\n[Mesaja erişmek için tıkla](${curmsg.url})`).setTitle("Bir mesaj yeniledi").addField("Yazarı:", curmsg.author, true);
        //await curmsg.guild.channels.cache.get(data.channels["mesajlog"]).send(embed.addField("Kanal", curmsg.channel, true));
        const elebaşı = ["discord.gg/", "discord.com/invite/", "discordapp.com/invite/", "discord.me/"];
        if (message.guild && elebaşı.some(link => message.content.includes(link))) {
            for (let c = 0; c < elebaşı.length; c++) {
                message.content.split(" ").filter(s => s.includes(elebaşı[c])).map(s => s.split(elebaşı[c]).pop()).forEach(async (code) => {
                    const reklam = await client.fetchInvite(code);
                    if (!reklam.guild || message.member.permissions.has("ADMINISTRATOR")) return;
                    if (reklam.guild.id !== client.guild.id) {
                        message.delete()
                        client.emit("jail", message.author.id, client.user.id, `\`${reklam.guild.name}\` [${reklam.guild.id}] sunucusunun reklamını\n\`${message.channel.name}\` [${message.channel.id}] kanalına attı.\n${reklam.inviter ? reklam.inviter.username + '#' + reklam.inviter.discriminator + " [" + reklam.inviter.id + "] " : ""}`, "p", `#REKLAM`, 2);
                    }
                });
            }
        }

    }
}
module.exports = LinkBlock;
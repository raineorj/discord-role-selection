const Discord = require('discord.js');
const { PrefixCommand } = require("../../../../base/utils");
class CMute extends PrefixCommand {
    constructor(client) {
        super(client, {
            name: "cmute",
            description: "Belirtilen kullanıcıyı geçici olarak metin kanallarından susturur.",
            usage: "cmute etiket/id dakika sebep",
            examples: ["cmute 674565119161794560 10 botları kötü yapıyor"],
            category: "Moderasyon",
            aliases: ["cm", "chatmute", "mute"],
            accaptedPerms: ["cmd-mute", "yt"],
            cooldown: 10000
        })
    }
    async run(client, message, args) {
        let mentioned = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentioned) {
            await message.react("🚫");
            return message.reply({
                embeds: [new Discord.MessageEmbed().setDescription(`Kullanıcı bulunamadı!`).setColor('BLACK')]
            }).then(msg => msg.delete({ timeout: 10_000 }));
        }
        const sebep = args.slice(2).join(" ");
        if (!sebep) {
            await message.react("🚫");
            return message.reply({
                embeds: [new Discord.MessageEmbed().setColor('BLACK').setDescription(`Bir sebep girmelisin`)]
            }).then(msg => msg.delete({ timeout: 10_000 }));
        }
        if (message.member.roles.highest.rawPosition <= mentioned.roles.highest.rawPosition) {
            await message.react("🚫");
            return message.reply({
                embeds: [new Discord.MessageEmbed().setColor('BLACK').setDescription(`Bunu yapmak için yeterli yetkiye sahip değilsin`)]
            }).then(msg => msg.delete({ timeout: 10_000 }));
        }
        if (!mentioned.bannable) {
            await message.react("🚫");
            return message.reply({
                embeds: [new Discord.MessageEmbed().setColor('BLACK').setDescription(`Bu kişiyi mutelemek için yeterli yetkiye sahip değilim`)]
            }).then(msg => msg.delete({ timeout: 10_000 }));
        }
        if (!client.func.sayi(args[1])) {
            await message.react("🚫");
            return message.reply({
                embeds: [new Discord.MessageEmbed().setColor('BLACK').setDescription(`Geçerli bir dakika girmelisin`)]
            }).then(msg => msg.delete({ timeout: 10_000 }));
        }
        client.emit('cmute', mentioned.user.id, message.author.id, sebep, args[1]);
        await message.react("👍");
        /*
        this.client.cmdCooldown[message.author.id][this.info.name] = Date.now() + this.info.cooldown;
        const logChannel = message.guild.channels.cache.get(data.channels["cmd-mod"]);
        const embed = new Discord.MessageEmbed().setColor('BLACK').setDescription(`${data.emojis["cmute"]} ${mentioned} kullanıcısı ${message.member} tarafından susturuldu!`);
        await logChannel.send(embed);
        */
    }
}
module.exports = CMute;
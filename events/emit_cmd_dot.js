const { ClientEvent } = require('../base/utils');
const { MessageEmbed } = require('discord.js');

class DotCommandCreate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "messageCreate"
        });
        this.client = client;
    }

    async run(message) {
        const client = this.client;
        if (!message.content.startsWith(client.config.prefix)) return;
        if (message.author.bot) return;
        let command = message.content.split(' ')[0].slice(client.config.prefix.length);
        let cmd;
        let args = message.content.split(' ')
            .slice(1);
        if (client.responders.has(`dot:${command}`)) {
            cmd = client.responders.get(`dot:${command}`);
        } else return;
        const embed = new MessageEmbed();
        const data = client.data;
        /*
        message.options = {};
        cmd.options.forEach((opts) => {

        })
        */
        if (!cmd.config.enabled) return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["disabledcmd"]} Bu komut şuan için **devredışı**`)
            .setColor('#2f3136'));
        if (cmd.config.dmCmd && (message.channel.type !== 'dm')) return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["dmcmd"]} Bu komut bir **DM** komutudur.`)
            .setColor('#2f3136'));
        if (cmd.config.ownerOnly && (message.author.id !== client.config.owner)) return message.channel.send({
            embeds: [new MessageEmbed().setDescription(`Bu komutu sadece ${client.config.owner} kullanabilir.`)
                .setColor('#2f3136')]
        });
        if (cmd.config.onTest && !data.other["testers"].includes(message.author.id) && (message.author.id !== client.config.owner)) return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["ontest"]} Bu komut henüz **test aşamasındadır**.`)
            .setColor('#2f3136'));
        if (cmd.config.rootOnly && !data.other["root"].includes(message.author.id) && (message.author.id !== client.config.owner)) return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["rootonly"]} Bu komutu sadece **yardımcılar** kullanabilir.`)
            .setColor('#2f3136'));
        if (cmd.config.adminOnly && !message.member.permissions.has("ADMINISTRATOR") && (message.author.id !== client.config.owner)) return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["modonly"]} Bu komutu sadece **yöneticiler** kullanabilir.`)
            .setColor('#2f3136'));
        if (cmd.info.cmdChannel & message.guild && message.guild.channels.cache.get(channels.get(cmd.info.cmdChannel)
            .value()) && (message.channel.id !== channels.get(cmd.info.cmdChannel)
                .value())) return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["text"]} Bu komutu ${message.guild.channels.cache.get(channels.get(cmd.info.cmdChannel)
                    .value())} kanalında kullanmayı dene!`)
                    .setColor('#2f3136'));
        if (message.guild && !cmd.config.dmCmd) {
            const requiredRoles = cmd.info.accaptedPerms || [];
            let allowedRoles = [];
            await requiredRoles.forEach((rolValue) => {
                const role = message.guild.roles.cache.get(data.roles[rolValue]);
                if (role) allowedRoles.push(role.id);
            });
            let deyim = `Bu komutu kullanabilmek için <@&${allowedRoles[0]}> rolüne sahip olmalısın!`;
            if (allowedRoles.length > 1) deyim = `Bu komutu kollanabilmek için aşağıdaki rollerden birisine sahip olmalısın:\n${allowedRoles.map(r => `<@&${r}>`)
                .join(` `)}`;
            if ((allowedRoles.length >= 1) && !allowedRoles.some(role => message.member.roles.cache.has(role)) && !message.member.permissions.has("ADMINISTRATOR") && (message.author.id !== client.config.owner)) {
                return message.reply({
                    embeds: [embed.setDescription(deyim)
                        .setColor('#2f3136')]
                });
            }
        }
        let uCooldown = cmd.cooldown[message.author.id];
        if (uCooldown && (uCooldown > Date.now())) return message.channel.send(`${data.emojis["time"]} Komutu tekrar kullanabilmek için lütfen **${Math.ceil((time - Date.now()) / 1000)}** saniye bekle!`);
        client.log(`[(${message.author.id})] ${message.author.username} ran command [${cmd.info.name}]`, "cmd");
        try {
            cmd.run(client, message, args);
            cmd.cooldown.set(message.author.id, cmd.info.cooldown);
        } catch (e) {
            console.log(e);
            return message.channel.send(new MessageEmbed().setDescription(`${data.emojis["error"]} | Sanırım bir hata oluştu...`)
                .setColor('#2f3136'));
        }
    }
}

module.exports = DotCommandCreate;

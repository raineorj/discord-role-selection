const Morgraine = require('../../base/Morgraine');
const { Intents, GuildMember, Guild, Collection } = require('discord.js');

const client = global.client = new Morgraine({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INVITES
    ]
}, __dirname.split('/').pop());

GuildMember.prototype.setRol = function (roles = []) {
    let rol = this.roles.cache.clone().filter(e => e.managed).map(e => e.id).concat(roles);
    return this.roles.set(rol);
};
client.invites = new Collection();
Guild.prototype.kanalBul = function(content) {
    let kanal = this.channels.cache.find(k => k.name === content) || this.channels.cache.find(k => k.id === content)
    if(!kanal) return console.log(`${content} kanalını ${this.name} sunucusun da aradım fakat bulamadım.`);
    return kanal;

}

Guild.prototype.emojiGöster = function(content) {
    let emoji = this.emojis.cache.find(e => e.name === content) || this.emojis.cache.find(e => e.id === content) || this.client.emojis.cache.find(e => e.id === content) || this.client.emojis.cache.find(e => e.name === content)
    if(!emoji) return console.log(`${content} emojisi ${this.name} sunucusuna yüklenmediğinden kullanılamadı.`);
    return emoji;
}


client.login(client.config.vars.Moderator)
process.on("warning", (warn) => { client.log(warn, "varn") });
process.on("beforeExit", () => { console.log('Bitiriliyor...'); });


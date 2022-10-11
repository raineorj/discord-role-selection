const Discord = require('discord.js');
const { ButtonCommand } = require("../../../../base/utils");

class RolOyun extends ButtonCommand {
    constructor(client) {
        super(client, {
            name: "renk_rol",
            accaptedPerms: ["family"],
            cooldown: 10000
        });
        this.client = client;
    }

    async run(client, interaction, data) {
        if(!interaction.member.roles.cache.has("980935545180024963")) return interaction.reply({embeds: [new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Renk rolünü alabilmek için sunucumuza takviye yapman gerekiyor.`)],  ephemeral: true});
        const mentioned = client.guild.members.cache.get(interaction.user.id);
        if (interaction.values.includes("rek_temizle") && interaction.values.length === 1) {
            return await mentioned.roles.remove(Object.keys(data.roles).filter(key => key.startsWith("rek_")).map(key => data.roles[key]));
        } else if (interaction.values.includes("rek_temizle")) {
            return await interaction.reply({
                content: "Sadece temizle seçeneğini kullan ya da hiç kullanma.",
                ephemeral: true
            });
        }
        const roleIDs = interaction.values.map(v => data.roles[v]);
        const rolArray = roleIDs.map(rID => client.guild.roles.cache.get(rID));
        
        await mentioned.roles.remove(Object.keys(data.roles).filter(key => key.startsWith("rek_")).map(key => data.roles[key]));
        await mentioned.roles.add(roleIDs[0]);
     const responseEmbed = new Discord.MessageEmbed().setDescription(`Sana;\n ${rolArray.join('\n')}\nrollerini verdim.`);
        return await interaction.reply({
            embeds: [responseEmbed],
            ephemeral: true
        });

    }
}

module.exports = RolOyun;
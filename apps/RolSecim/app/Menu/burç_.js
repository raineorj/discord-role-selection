const Discord = require('discord.js');
const { ButtonCommand } = require("../../../../base/utils");

class RolKatilimci extends ButtonCommand {
    constructor(client) {
        super(client, {
            name: "burç_rol",
            accaptedPerms: ["family"],
            cooldown: 10000
        });
        this.client = client;
    }

    async run(client, interaction, data) {
       // if(!interaction.member.roles.cache.has(data.roles["family"])) return interaction.reply({embeds: [new Discord.MessageEmbed().setDescription(`Burç rollerine sahip olabilmek için tagımızı alman gerekiyor!`)],  ephemeral: true});
        const mentioned = client.guild.members.cache.get(interaction.user.id);
        if (interaction.values.includes("burç_temizle") && interaction.values.length === 1) {
            return await mentioned.roles.remove(Object.keys(data.roles).filter(key => key.startsWith("burç_")).map(key => data.roles[key]));
        } else if (interaction.values.includes("burç_temizle")) {
            return await interaction.reply({
                content: "Sadece temizle seçeneğini kullan ya da hiç kullanma.",
                ephemeral: true
            });
        }
        const roleIDs = interaction.values.map(v => data.roles[v]);
        const rolArray = roleIDs.map(rID => client.guild.roles.cache.get(rID));
        await mentioned.roles.remove(Object.keys(data.roles).filter(key => key.startsWith("burç_")).map(key => data.roles[key]));
        await mentioned.roles.add(roleIDs);
        const responseEmbed = new Discord.MessageEmbed().setDescription(`Sana;\n ${rolArray.join('\n')}\nrollerini verdim.`);
        return await interaction.reply({
            embeds: [responseEmbed],
            ephemeral: true
        });

    }
}

module.exports = RolKatilimci;
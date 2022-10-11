const { stripIndents } = require('common-tags');
const { ClientEvent } = require("../../../base/utils");
const moment = require('moment');
class GuildMemberAdd extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd"
        });
        this.client = client;
    }

    async run(member) {
        const client = this.client;
        if (member.guild.id !== client.config.server) return;
    
        const gInvites = await member.guild.invites.fetch({ cache: false });
        const invite = gInvites.find((inv) => inv.uses > this.client.invites.find(i => i.code === inv.code).uses);
        let inviter = invite ? invite.inviterId : "VANITY_URL";
       
        member.guild.fetchVanityData().then((dData) => {
            this.client.vanityUses = dData.uses;
        });
        this.client.invites = gInvites;
        const docs = await client.models.invites.find({ inviter: inviter, invited: member.user.id, isFirst: true });
        const first = docs.length > 0;
        
        await client.models.invites.create({
            inviter: inviter,
            invited: member.user.id,
            created: new Date(),
            isFirst: !first
        });

       //  const tutor = member.guild.members.cache.get(inviter);
      //   const invCnt = await client.models.invites.find({ inviter: inviter, isFirst: true });
     //   await member.roles.add(this.data.roles["welcome"]);
      //   await member.guild.channels.cache.get(this.data.channels["welcome"]).send(stripIndents`
      //   > **Hoş Geldin** ${member},
       //  > buraya gelmeni sağlayan ${tutor || "özel url"} toplamda **${invCnt.length || 1} kişiyi** buraya kazandırdı.
       //  > Güvenli bölgede anlık olarak **${member.guild.memberCount} üye** barınıyor.
       //  > Giriş için lütfen **V. Confirmed** isimli kanallardan herhangi birinde yetkili birisinin seninle ilgilenmesini bekle.
       //  >  __Hesap <t:${Math.round(member.user.createdTimestamp / 1000)}:R> oluşturulmuş__
       // `);
    }
}

module.exports = GuildMemberAdd;

const { ClientEvent } = require('../../../base/utils');

class Ready extends ClientEvent {
	constructor(client) {
		super(client, {
			name: "_ready"
		});
		this.client = client;
	}

	async run(client) {
		client = this.client;

		this.client.invites = await client.guild.invites.fetch();
		if (this.client.guild.vanityURLCode) {
			await client.guild.fetchVanityData()
			.then((res) => {
				this.client.vanityUses = res.uses;
			})
			.catch(console.error);
		}
		const channels = client.guild.channels.cache.map((c) => c.id);
		for (let index = 0; index < channels.length; index++) {
			const channel = client.guild.channels.cache.get(channels[index]);
			const olddata = await client.models.channels.findOne({ meta: { $elemMatch: { _id: channel.id } } });
			if (!olddata) {
				const ovs = [];
				if (channel.permissionOverwrites) channel.permissionOverwrites.cache.forEach((o) => {
					const lol = {
						_id: o.id,
						typeOf: o.type,
						allow: o.allow.toArray(),
						deny: o.deny.toArray()
					};
					ovs.push(lol);
				});
				switch (channel.type) {
					case "GUILD_CATEGORY":
						await client.models.channels.create({
							kindOf: channel.type,
							parent: channel.parentId,
							keyConf: null,
							meta: [{
								_id: channel.id,
								name: channel.name,
								position: channel.position,
								created: channel.createdAt
							}],
							overwrites: ovs
						});
						break;

					case "GUILD_VOICE":
						await client.models.channels.create({
							kindOf: channel.type,
							parent: channel.parentId,
							keyConf: null,
							meta: [{
								_id: channel.id,
								name: channel.name,
								position: channel.position,
								bitrate: channel.bitrate,
								userLimit: channel.userLimit,
								created: channel.createdAt
							}],
							overwrites: ovs
						});
						break;

					case "GUILD_TEXT":
						await client.models.channels.create({
							kindOf: channel.type,
							parent: channel.parentId,
							keyConf: null,
							meta: [{
								_id: channel.id,
								name: channel.name,
								position: channel.position,
								nsfw: channel.nsfw,
								rateLimit: channel.rateLimit,
								created: channel.createdAt
							}],
							overwrites: ovs
						});
						break;

					default:
						break;
				}
			}
		}

	}

}

module.exports = Ready;
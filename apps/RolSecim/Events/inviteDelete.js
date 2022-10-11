const { ClientEvent } = require("../../../base/utils");

class InviteDelete extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "inviteDelete"
        })
        this.client = client;
    }

    async run(invite) {
        if (invite.guild.id !== this.client.config.server) return;
		this.client.invites = await client.guild.invites.fetch();

    }
}
module.exports = InviteDelete;
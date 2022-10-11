const { ClientEvent } = require("../../../base/utils");

class InviteCreate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "inviteCreate"
        })
        this.client = client;
    };

    async run(invite) {
        const client = this.client;
        if (invite.guild.id !== client.config.server) return;
		this.client.invites = await client.guild.invites.fetch();
    };
}
module.exports = InviteCreate;
const { ClientEvent } = require('../../../base/utils');
class VoiceStateUpdate extends ClientEvent {
    constructor(client) {
        super(client, {
            name: "voiceStateUpdate"
        });
        this.client = client;
    }
    async run(prev, cur) {
        const vmutes = await this.client.models.penalties.find({ typeOf: "VMUTE", userId: cur.member.user.id });
        if (vmutes.length > 0 && vmutes.some(vmute => vmute.until.getTime() > new Date().getTime())) {
            const mute = vmutes.find(vmute => vmute.until.getTime() > new Date().getTime())
            if(!cur.serverMute && !mute.extras.some(extra => extra.subject === "revoke")) await cur.setMute(true);
        } else if (cur.serverMute && prev.serverMute) await cur.setMute(false);
        await this.client.models.voice.create({
            channelId: cur.channelId,
            userId: cur.member.user.id,
            self_mute: cur.selfMute,
            self_deaf: cur.selfDeaf,
            server_mute: cur.serverMute,
            server_deaf: cur.serverDeaf,
            streaming: cur.streaming,
            webcam: cur.selfVideo
        });
    }
}
module.exports = VoiceStateUpdate;
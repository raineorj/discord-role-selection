const { ClientEvent } = require("../../../base/utils");
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

class Ready extends ClientEvent {

	constructor(client) {
		super(client, {
			name: "_ready"
		});
		this.client = client;
	}

	async run(client) {
		client = this.client;
		this.client.canvas = new ChartJSNodeCanvas({ width: 960, height: 540 });
	}
}

module.exports = Ready;
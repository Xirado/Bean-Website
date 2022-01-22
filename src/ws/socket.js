import EventBus from "@/events/event-bus.js";

export default class WS {
	websocket = null;

	constructor() {
		this.websocket = new WebSocket("ws://localhost:8887");
		this.websocket.onmessage = function (event) {
			const parsed = JSON.parse(event.data);
			console.log(parsed.scope);
			if (parsed.scope === "get_mutual_guilds") {
				window.sessionStorage.setItem("guilds", parsed.guilds);
				console.log(JSON.stringify(parsed.guilds));
				EventBus.$emit("updateGuilds", parsed.guilds);
			}
		};
	}

	waitForSocketConnection(socket, callback) {
		setTimeout(() => {
			if (socket.readyState === 1) {
				if (callback != null) {
					callback();
				}
			} else {
				this.waitForSocketConnection(socket, callback);
			}
		}, 50);
	}

	send(string) {
		this.waitForSocketConnection(this.websocket, () => {
			this.websocket.send(string);
		});
	}
}

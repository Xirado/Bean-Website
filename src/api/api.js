import axios from "axios";
import EventBus from "@/events/event-bus.js";
var json_bigint = require("json-bigint");

export const backend_url =
	/*process.env.NODE_ENV === 'development' ? 'http://localhost:8887' :*/ "https://api.bean.bz";

export async function generateToken(code) {
	const config = {
		headers: {
			authorization: `AuthCode ${code}`,
		},
	};
	const response = await axios.get(`${backend_url}/token`, config);
	let token = response.headers.authorization;
	token = token.substring(5);
	window.localStorage.setItem("token", token);
	window.localStorage.setItem("user", json_bigint.stringify(response.data));
	window.localStorage.setItem("last_login", Date.now() / 1000);
	return token;
}

export async function fetchLoginURL() {
	try {
		const response = await axios.get(`${backend_url}/login`);
		return response.data.url;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function fetchLeaderboard(guild_id) {
	const response = await axios.get(`${backend_url}/guilds/${guild_id}/levels`);
	return response.data;
}

export async function fetchInviteURL() {
	try {
		const response = await axios.get(`${backend_url}/invite`);
		return response.data.url;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function fetchCommands() {
	try {
		const response = await axios.get(`${backend_url}/commands`);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export function logout() {
	window.localStorage.removeItem("token");
	window.localStorage.removeItem("user");
	window.localStorage.removeItem("last_login");
	EventBus.$emit("LoginEvent", false);
}

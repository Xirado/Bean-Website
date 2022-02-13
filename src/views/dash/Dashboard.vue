<template>
	<Wrapper>
		<div class="flex flex-col text-gray-100">
			<div
				v-if="error && !loading"
				class="mx-auto my-auto mt-10 flex flex-col rounded-lg bg-red-600 bg-opacity-20 p-6 text-xl font-semibold"
			>
				{{ error_message }}
				<div class="mx-auto mt-4 space-x-4 text-base">
					<a href="/dashboard">
						<button class="btn rounded bg-indigo-600 px-4 py-2 font-medium">
							Reload
						</button>
					</a>
					<router-link to="/">
						<button class="btn tet-gray-400 rounded bg-zinc-900 px-4 py-2">
							Home
						</button>
					</router-link>
				</div>
			</div>
			<div
				v-if="loading"
				class="absolute bottom-10 right-10 inline-flex items-center rounded border border-white/10 bg-indigo-400 bg-opacity-[0.15] px-4 py-2 font-semibold transition duration-300"
			>
				<svg
					class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span class="hidden sm:block">Loading</span>
			</div>
			<div
				v-if="guilds && Object.keys(guilds).length === 0 && !error && !loading"
				class="mx-auto my-auto mt-10 flex flex-col rounded-lg bg-indigo-600 bg-opacity-20 p-6 text-xl font-semibold"
			>
				You don't have the Administrator permission in any guilds
				<div class="mx-auto mt-4 space-x-4 text-base">
					<a href="/dashboard">
						<button class="btn rounded bg-indigo-600 px-4 py-2 font-medium">
							Reload
						</button>
					</a>
					<router-link to="/">
						<button class="btn rounded bg-zinc-900 px-4 py-2">Home</button>
					</router-link>
				</div>
			</div>
			<div
				v-if="guilds && !error && !loading && Object.keys(guilds).length > 0"
			>
				<GuildList :guilds="guilds" :baseInviteUrl="base_invite_url" />
			</div>
		</div>
	</Wrapper>
</template>

<script>
import EventBus from "@/events/event-bus.js";
import { backend_url, logout } from "@/api/api.js";
import axios from "axios";
import GuildList from "../../components/GuildList.vue";
import Wrapper from "@/components/Wrapper.vue";

export default {
	name: "Dashboard",
	components: { Wrapper, GuildList },
	data() {
		return {
			loggedIn: false,
			loading: true,
			guilds: null,
			base_invite_url: null,
			error: false,
			error_message: "An unknown error occurred",
		};
	},
	async mounted() {
		console.log("mounted");
		EventBus.$on("LoginEvent", (value) => {
			this.loggedIn = value;
		});
		console.log("Logged in");
		if (localStorage.getItem("token") != null) {
			try {
				this.loggedIn = true;
				this.loading = true;
				const token = localStorage.getItem("token");
				if (!token) {
					this.loading = false;
					this.error = true;
				}
				const config = {
					headers: {
						authorization: `Token ${token}`,
					},
				};
				const response = await axios.get(`${backend_url}/guilds`, config);
				if (!response.data.guilds) {
					const httpCode = response.data.http_code;
					let errmsg = "";
					if (httpCode === 429) {
						errmsg = `Discord returned error ${httpCode}: ${response.data.message}`;
					} else {
						errmsg = `Discord returned error ${httpCode}: ${response.data.code} - ${response.data.message}`;
					}
					this.error = true;
					this.error_message = errmsg;
					this.loading = false;
					return;
				}
				this.guilds = response.data.guilds;
				console.log(`${this.guilds.length} guilds`);
				this.base_invite_url = response.data.base_invite_url;
				this.loading = false;
			} catch (error) {
				this.error = true;
				if (error.response) {
					if (error.response.status == 401) {
						logout();
						this.loading = false;
						return;
					}
					this.error_message = `Backend returned error ${error.response.status}: ${error.response.data.message}!`;
				} else {
					this.error_message = "An unknown error occurred!";
				}
				console.log(this.error_message);
				this.loading = false;
				throw error;
			}
		} else {
			this.loading = false;
			EventBus.$emit("LoginEvent", false);
		}
	},
};
</script>

<style scoped></style>

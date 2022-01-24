<template>
	<nav
		class="top-0 z-30 bg-opacity-60 bg-zinc-900 backdrop-filter backdrop-blur w-full px-1 text-gray-100 py-1"
		v-bind:class="{ fixed: navfixed, sticky: !navfixed }"
	>
		<div class="flex justify-between items-center mx-4 my-auto">
			<router-link to="/" custom>
				<img src="/img/bean.jpg" class="w-16" />
			</router-link>
			<div class="flex items-center space-x-7">
				<button
					href="https://discord.gg/7WEjttJtKa"
					target="_blank"
					class="group p-1 font-medium"
				>
					<span>Support Server</span>
					<hr
						class="scale-0 group-hover:scale-100 transition duration-300 border-indigo-600 border-t-2"
					/>
				</button>
				<button
					:href="invite_link"
					target="_blank"
					color="indigo"
					class="group p-1 font-medium"
				>
					<span>{{ loggedIn ? "Manage servers" : "Add to Server" }}</span>
					<hr
						class="scale-0 group-hover:scale-100 transition duration-300 border-indigo-600 border-t-2"
					/>
				</button>

				<button
					v-if="!loggedIn"
					class="px-4 py-2 rounded bg-indigo-300 hover:bg-opacity-20 hover:bg-indigo-600 border border-white/10 transition duration-300 bg-opacity-[0.15] font-semibold"
					:to="login_link"
				>
					<span>Login</span>
				</button>
				<button
					v-if="user !== null && loggedIn"
					@click="drawer = !drawer"
					class="rounded-full w-10 h-10 ring ring-opacity-0 hover:ring-opacity-40 ring-indigo-600 focus:ring-opacity-100 transition btn"
				>
					<img
						src="https://cdn.discordapp.com/avatars/423258218035150849/ab4f33f6d8a87f58fd95468696d71507.png"
						class="rounded-full"
					/>
				</button>
				<div
					v-if="drawer"
					class="rounded-md bg-zinc-800 p-6 absolute right-4 top-20"
				>
					<img
						src="https://cdn.discordapp.com/avatars/423258218035150849/ab4f33f6d8a87f58fd95468696d71507.png"
						class="rounded-full w-10 h-10 mx-auto mb-3"
					/>
					<h3 class="font-medium text-xl tracking-wide">
						{{ user.username
						}}<span class="text-gray-400 tracking-widest ml-1"
							>#{{ user.discriminator }}</span
						>
					</h3>
					<hr
						class="mt-2 mx-10 border-t-2 border-indigo-300 border-opacity-25"
					/>
					<div class="mt-2 flex flex-col justify-center">
						<router-link
							to="/commands"
							class="group p-1 font-medium mx-auto text-lg hover:text-indigo-200 transition duration-300"
						>
							<span>Commands</span>
							<hr
								class="scale-0 group-hover:scale-100 transition duration-300 border-indigo-600 border-t-2"
							/>
						</router-link>
						<a
							href="https://github.com/Xirado/Bean"
							target="_blank"
							class="group p-1 font-medium mx-auto text-lg hover:text-indigo-200 transition duration-300"
						>
							<span>Github</span>
							<hr
								class="scale-0 group-hover:scale-100 transition duration-300 border-indigo-600 border-t-2"
							/>
						</a>
						<button
							class="group p-1 font-medium mx-auto text-lg btn text-red-200 hover:text-red-400 transition duration-300"
							@click="logout()"
						>
							<span>Logout</span>
							<hr
								class="scale-0 group-hover:scale-100 transition duration-300 border-red-600 border-t-2"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { logout, fetchLoginURL, fetchInviteURL } from "@/api/api.js";
import EventBus from "@/events/event-bus.js";
const json_bigint = require("json-bigint");
export default {
	data() {
		return {
			user: null,
			drawer: false,
			loggedIn: false,
			login_link: null,
			invite_link: null,
		};
	},
	methods: {
		logout() {
			logout();
			console.log("Logged out!");
			this.loggedIn = false;
		},
	},
	created() {
		window.addEventListener("resize", this.resize);
	},
	beforeDestroy() {
		window.removeEventListener("resize", this.resize);
	},
	async mounted() {
		this.loggedIn = localStorage.getItem("token") ? true : false;
		this.login_link = await fetchLoginURL();
		this.invite_link = await fetchInviteURL();
		EventBus.$on("LoginEvent", async (value) => {
			this.loggedIn = value;
			if (value) {
				this.user = json_bigint.parse(localStorage.getItem("user"));
			}
		});
		if (localStorage.getItem("token") == null) {
			this.loggedIn = false;
		}
		if (localStorage.getItem("token")) {
			this.loggedIn = true;
			const user = json_bigint.parse(localStorage.getItem("user"));
			this.user = user;
		}
	},
	props: ["navfixed"],
};
</script>

<style></style>

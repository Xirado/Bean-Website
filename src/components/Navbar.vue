<template>
	<nav
		class="top-0 z-30 w-full bg-zinc-900 bg-opacity-60 px-1 py-1 text-gray-100 backdrop-blur backdrop-filter"
		v-bind:class="{ fixed: navfixed, sticky: !navfixed }"
	>
		<div
			class="mx-4 my-auto flex flex-col items-center justify-between md:flex-row"
			:class="{
				'divide-y divide-zinc-700 divide-opacity-40 md:divide-y-0': navOpen,
			}"
		>
			<div class="flex w-full items-center justify-between">
				<router-link to="/" custom>
					<img src="/img/bean.jpg" class="w-16" />
				</router-link>
				<div
					class="rounded-sm bg-zinc-700 px-2 py-1 md:hidden"
					:class="navOpen ? 'opacity-50' : ''"
					@click="navOpen = !navOpen"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="h-auto w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						></path></svg
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="hidden h-auto w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</div>
			</div>

			<div
				class="flex w-full flex-col items-center justify-center md:flex-auto md:flex-row md:justify-end md:space-y-0 md:space-x-7"
				:class="navOpen ? '' : 'hidden md:flex'"
			>
				<a
					href="https://discord.gg/7WEjttJtKa"
					target="_blank"
					class="group p-1 font-medium"
				>
					<span>Support Server</span>
					<hr
						class="scale-0 border-t-2 border-indigo-600 transition duration-300 group-hover:scale-100"
					/>
				</a>
				<router-link to="/dashboard" class="group mb-2 p-1 font-medium">
					<span>{{ loggedIn ? "Manage servers" : "Add to Server" }}</span>
					<hr
						class="scale-0 border-t-2 border-indigo-600 transition duration-300 group-hover:scale-100"
					/>
				</router-link>

				<a
					v-if="!loggedIn"
					class="w-full rounded border border-white/10 bg-indigo-300 bg-opacity-[0.15] px-4 py-2 font-semibold transition duration-300 hover:bg-indigo-600 hover:bg-opacity-20 sm:block md:w-auto"
					:href="login_link"
				>
					<span>Login</span>
				</a>
				<button
					v-if="user !== null && loggedIn"
					@click="drawer = !drawer"
					class="btn hidden h-10 w-10 rounded-full ring ring-indigo-600 ring-opacity-0 transition hover:ring-opacity-40 focus:ring-opacity-100 sm:block"
				>
					<img :src="user.effective_avatar" class="rounded-full" />
				</button>
				<div
					:class="{ 'sm:hidden': drawer }"
					class="right-4 top-20 rounded-md sm:absolute sm:bg-zinc-800 sm:p-6 sm:shadow"
				>
					<img
						:src="user.effective_avatar"
						class="mx-auto mb-3 hidden h-10 w-10 rounded-full sm:block"
					/>
					<h3 class="text-xl font-medium tracking-wide">
						{{ user.username
						}}<span class="ml-1 tracking-widest text-gray-400"
							>#{{ user.discriminator }}</span
						>
					</h3>
					<hr
						class="mx-10 mt-2 border-t-2 border-indigo-300 border-opacity-25"
					/>
					<div class="mt-2 flex flex-col justify-center">
						<router-link
							to="/commands"
							class="group mx-auto p-1 text-lg font-medium transition duration-300 hover:text-indigo-200"
						>
							<span>Commands</span>
							<hr
								class="scale-0 border-t-2 border-indigo-600 transition duration-300 group-hover:scale-100"
							/>
						</router-link>
						<a
							href="https://github.com/Xirado/Bean"
							target="_blank"
							class="group mx-auto p-1 text-lg font-medium transition duration-300 hover:text-indigo-200"
						>
							<span>Github</span>
							<hr
								class="scale-0 border-t-2 border-indigo-600 transition duration-300 group-hover:scale-100"
							/>
						</a>
						<button
							class="group btn mx-auto p-1 text-lg font-medium text-red-200 transition duration-300 hover:text-red-400"
							@click="logout()"
						>
							<span>Logout</span>
							<hr
								class="scale-0 border-t-2 border-red-600 transition duration-300 group-hover:scale-100"
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
			navOpen: false,
			loggedIn: false,
			login_link: null,
			invite_link: null,
		};
	},
	methods: {
		logout() {
			this.drawer = false;
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

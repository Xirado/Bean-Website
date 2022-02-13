<template>
	<div class="flex h-screen flex-col bg-zinc-850 overflow-y-hidden">
		<Navbar :fixed="true" />
		<!--Sidebar-->
		<div class="flex text-gray-200">
			<div class="flex h-screen sm:w-96 flex-col space-y-2 bg-zinc-800 py-8 px-2 sm:px-4">
				<router-link to="/dashboard/home">
					<div
						class="flex items-center rounded-md px-2 sm:px-4 py-2 text-lg font-medium transition duration-200"
						:class="{
							'my-4 bg-gray-100 text-gray-800 shadow-xl shadow-black/50':
								numb == 1,
							'bg-zinc-900/50 shadow hover:bg-gray-100 hover:text-gray-800 hover:shadow-xl':
								numb != 1,
						}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="sm:mr-2 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
							/>
						</svg>
						<span class="hidden sm:block">Bot Settings</span>
					</div>
				</router-link>
				<router-link to="/dashboard/logs">
					<div
						class="flex items-center rounded-md px-2 sm:px-4 py-2 text-lg font-medium transition duration-200"
						:class="{
							'my-4 bg-gray-100 text-gray-800 shadow-xl shadow-black/50':
								numb == 2,
							'bg-zinc-900/50 shadow hover:bg-gray-100 hover:text-gray-800 hover:shadow-xl':
								numb != 2,
						}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="sm:mr-2 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
							/></svg
						><span class="hidden sm:block">Logs</span>
					</div>
				</router-link>
				<router-link to="/dashboard/music">
					<div
						class="flex items-center rounded-md px-2 sm:px-4 py-2 text-lg font-medium transition duration-200"
						:class="{
							'my-4 bg-gray-100 text-gray-800 shadow-xl shadow-black/50':
								numb == 3,
							'bg-zinc-900/50 shadow hover:bg-gray-100 hover:text-gray-800 hover:shadow-xl':
								numb != 3,
						}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="sm:mr-2 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
							/></svg
						><span class="hidden sm:block">Music</span>
					</div>
				</router-link>
			</div>
			<!--Main Section-->
			<div class="w-full h-[93vh] overflow-y-auto">
				<div class="mx-auto mt-8 max-w-screen-lg px-4">
					<h2 class="mb-4 text-4xl font-semibold">{{ title }}</h2>
					<slot></slot>
				</div>
				<Footer :compact="true" />
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

export default {
	name: "DashWrappper",
	components: { Navbar, Footer },
	data() {
		return {
			drawer: false,
		};
	},
	props: {
		numb: Number,
		title: String,
	},
};
</script>

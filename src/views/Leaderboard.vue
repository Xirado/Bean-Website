<template>
	<div class="text-gray-100">
		<div v-if="error">
			<ErrorMessage title="Error" :message="error_message" :red="true" />
		</div>
		<Wrapper :fixed="!loading">
			<div v-if="!loading && guild && users">
				<div class="relative">
					<div
						class="[background-image:url('/img/universe.jpg')] h-[70vh] bg-cover bg-no-repeat bg-top flex"
					>
						<!--would be cool to do server banner here rather than the universe thing-->
						<div
							class="flex flex-col md:flex-row mx-auto max-w-screen-lg px-4 items-center w-full justify-center md:justify-start mb-28 sm:mb-8"
						>
							<img
								:src="guild.icon"
								alt=""
								class="rounded-full h-20 md:h-28 md:mr-8 shadow-lg"
							/>
							<h1 class="text-5xl md:text-8xl font-medium text-white truncate">
								{{ guild.name }}
								<hr class="hidden md:block w-8 border-t-4 border-pink-600" />
							</h1>
						</div>
					</div>
					<div
						class="bg-gradient-to-b from-transparent via-transparent to-zinc-850 inset-0 absolute"
					></div>
				</div>
				<LeaderboardList :users="users" />
			</div>
		</Wrapper>
	</div>
</template>

<script>
import { fetchLeaderboard } from "@/api/api.js";
import LeaderboardList from "../components/LeaderboardList.vue";
import ErrorMessage from "../components/ErrorMessage.vue";
import Wrapper from "../components/Wrapper.vue";

export default {
	components: { LeaderboardList, ErrorMessage, Wrapper },
	data() {
		return {
			items: [
				{
					text: "Home",
					disabled: false,
					href: "/dashboard",
				},
			],
			guild_id: null,
			users: null,
			guild: null,
			error: false,
			error_message: null,
			loading: false,
			no_results: false,
		};
	},
	async mounted() {
		try {
			this.loading = true;
			this.guild_id = this.$route.query.id;
			const response = await fetchLeaderboard(this.guild_id);
			this.users = response.users.filter((x) => x.xp >= 100);
			if (this.users.length == 0) {
				this.no_results = true;
			}
			this.guild = response.guild;
			this.items.push({ text: this.guild.name, disabled: true, href: null });
			this.items.push({ text: "Leaderboard", disabled: true, href: null });
			this.loading = false;
		} catch (error) {
			this.loading = false;
			this.error = true;
			if (error.response) {
				const data = error.response.data;
				this.error_message = `API returned code ${data.code}: ${data.message}`;
			} else {
				this.error_message = "An unknown error occurred";
			}
		}
	},
};
</script>

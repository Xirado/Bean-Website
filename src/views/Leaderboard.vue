<template>
	<div class="text-gray-100">
		<div v-if="error">
			<ErrorMessage title="Error" :message="error_message" :red="true" />
		</div>
		<Wrapper :fixed="!loading">
			<div v-if="!loading && guild && users">
				<div class="relative">
					<div
						class="flex h-[70vh] bg-cover bg-top bg-no-repeat [background-image:url('/img/universe.jpg')]"
					>
						<!--would be cool to do server banner here rather than the universe thing-->
						<div
							class="mx-auto mb-28 flex w-full max-w-screen-lg flex-col items-center justify-center px-4 sm:mb-8 md:flex-row md:justify-start"
						>
							<img
								:src="guild.icon"
								alt=""
								class="h-20 rounded-full shadow-lg md:mr-8"
							/>
							<h1
								class="max-h-36 w-screen overflow-hidden break-words text-center text-5xl font-medium text-white md:overflow-visible md:truncate md:text-left md:text-6xl"
							>
								{{ guild.name }}
								<hr class="hidden w-8 border-t-4 border-pink-600 md:block" />
							</h1>
						</div>
					</div>
					<div
						class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-850"
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

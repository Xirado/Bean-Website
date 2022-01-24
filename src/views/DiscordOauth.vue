<template>
	<Wrapper>
		<div class="flex flex-col text-gray-100">
			<div
				class="mx-auto my-auto mt-10 flex flex-col rounded-lg bg-indigo-600 bg-opacity-20 p-6 text-xl font-semibold"
			>
				Login failed!
				<div class="mx-auto mt-4 space-x-4 text-base">
					<router-link to="/">
						<button class="btn tet-gray-400 rounded bg-zinc-900 px-4 py-2">
							Home
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</Wrapper>
</template>

<script>
import EventBus from "@/events/event-bus.js";
import { generateToken } from "@/api/api.js";
import Wrapper from "@/components/Wrapper.vue";

export default {
	name: "DiscordOauth",
	components: { Wrapper },
	data() {
		return {
			loading: true,
			error: false,
		};
	},
	async created() {
		const code = this.$route.query.code;
		if (code == null) {
			this.$router.push("/");
		}

		try {
			const response = await generateToken(code);
			if (!response) {
				this.error = true;
				return;
			}
			EventBus.$emit("LoginEvent", true);
		} catch (error) {
			console.log(error);
			this.error = true;
			return;
		}
		this.$router.push("/dashboard");
	},
};
</script>

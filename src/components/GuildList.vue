<template>
	<div class="mx-auto my-10 flex flex-col space-y-6">
		<div :v-for="(guild, index) in guilds">
			<router-link
				:key="guild.id"
				:to="guild.bot_joined ? open(guild.id) : invite(guild.id)"
			>
				<div
					class="group flex w-[30rem] cursor-pointer items-center rounded-md bg-black/30 p-4 text-2xl tracking-wide shadow-lg transition duration-200 hover:bg-black/50 hover:shadow-xl"
				>
					<img
						v-if="guild.icon"
						:src="guild.icon"
						alt="Guild Icon"
						class="h-16 w-16 rounded-full"
					/>
					<div
						v-if="!guild.icon"
						class="grid h-16 w-16 place-items-center rounded-full bg-indigo-600"
					>
						<span class="text-lg font-medium">{{ guild.initials }}</span>
					</div>
					<a v-if="guild.bot_joined">
						<button
							class="btn ml-auto rounded bg-green-600 px-4 py-2 text-lg font-medium transition duration-200 group-hover:bg-green-500"
						>
							Dashboard
						</button>
					</a>
					<a v-else>
						<button
							class="btn ml-auto rounded bg-indigo-600 px-4 py-2 text-lg font-medium transition duration-200 group-hover:bg-indigo-500"
						>
							Setup
						</button>
					</a>

					<div v-if="index < guilds.length - 1" :key="index"></div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "GuildList",
	props: {
		guilds: {
			type: Array,
			required: true,
		},
		baseInviteUrl: {
			type: String,
			required: true,
		},
	},
	methods: {
		truncate(name) {
			let string = String(name);
			if (string.length > 41) {
				return string.substring(0, 41) + "...";
			}
			return string;
		},
		open(id) {
			this.$router.push(`guild?id=${id}`);
		},
		get_invite_url(id) {
			return this.baseInviteUrl + "&guild_id=" + id;
		},
		invite(id) {
			window.location.href = this.get_invite_url(id);
		},
	},
};
</script>

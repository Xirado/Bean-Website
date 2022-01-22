<template>
	<div class="flex flex-col mx-auto my-10 space-y-6">
		<div :v-for="(guild, index) in guilds">
			<router-link
				:key="guild.id"
				:to="guild.bot_joined ? open(guild.id) : invite(guild.id)"
			>
				<div
					class="rounded-md bg-black/30 p-4 shadow-lg flex text-2xl items-center tracking-wide w-[30rem] group hover:bg-black/50 hover:shadow-xl transition duration-200 cursor-pointer"
				>
					<img
						v-if="guild.icon"
						:src="guild.icon"
						alt="Guild Icon"
						class="rounded-full h-16 w-16"
					/>
					<div
						v-if="!guild.icon"
						class="h-16 w-16 rounded-full bg-indigo-600 grid place-items-center"
					>
						<span class="text-lg font-medium">{{ guild.initials }}</span>
					</div>

					<button
						v-if="guild.bot_joined"
						class="ml-auto text-lg font-medium px-4 py-2 rounded bg-green-600 group-hover:bg-green-500 transition duration-200 btn"
					>
						Dashboard
					</button>
					<a v-else>
						<button
							class="ml-auto text-lg font-medium px-4 py-2 rounded bg-indigo-600 group-hover:bg-indigo-500 transition duration-200 btn"
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

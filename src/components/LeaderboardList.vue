<template>
	<div class="d-flex justify-center mb-6">
		<v-list class="grey darken-3" min-width="90%">
			<v-list-item-group>
				<template v-for="(user, index) in users">
					<v-list-item :key="user.id">
						<v-avatar class="mx-3" size="40" :color="getColor(index)">
							<span class="white--text caption">{{ index + 1 }}</span>
						</v-avatar>
						<v-list-item-avatar size="70">
							<img v-if="user.avatar" :src="user.avatar" />
							<img
								v-if="!user.avatar"
								:src="`https://cdn.discordapp.com/embed/avatars/${
									Number(user.discriminator) % 5
								}.png`"
							/>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-row align="center" no-gutters>
								<v-col cols="10" lg="10" md="6" sm="4" xs="2">
									<span class="pl-2">
										{{ user.name }}
									</span>
								</v-col>
								<v-col class="text-right">
									<div class="position: relative;">
										<span
											class="indigo--text text--lighten-3 mb-1"
											style="display: table; margin: 0 auto; font-size: 80%"
										>
											Experience
										</span>
										<span
											style="display: table; margin: 0 auto; font-size: 120%"
										>
											{{ format(user.xp) }}
										</span>
									</div>
								</v-col>
								<v-col class="text-right">
									<v-progress-circular
										color="indigo lighten-2"
										:rotate="-90"
										:size="70"
										:value="getPercentage(user.xp)"
									>
										<div class="position: relative;">
											<span
												class="indigo--text text--lighten-3"
												style="display: table; margin: 0 auto; font-size: 80%"
											>
												Level
											</span>
											<span
												class="indigo--text text--lighten-1"
												style="display: table; margin: 0 auto; font-size: 140%"
											>
												{{ getLevel(user.xp) }}
											</span>
										</div>
									</v-progress-circular>
								</v-col>
							</v-row>
						</v-list-item-content>
						<v-list-item-action> </v-list-item-action>
					</v-list-item>
				</template>
			</v-list-item-group>
		</v-list>
	</div>
</template>

<script>
import { formatSI } from "format-si-prefix";

export default {
	name: "LeaderboardList",
	props: {
		users: {
			type: Array,
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
		format(xp) {
			return formatSI(xp);
		},
		getXpToLevelUp(current) {
			return 5 * (current * current) + 50 * current + 100;
		},
		getLevel(xp) {
			if (xp < 100) return 0;
			let counter = 0;
			let total = 0;
			for (;;) {
				const neededForNextLevel = this.getXpToLevelUp(counter);
				if (neededForNextLevel > xp) return counter;
				total += neededForNextLevel;
				if (total > xp) return counter;
				counter++;
			}
		},
		getTotalXPNeeded(level) {
			let x = 0;
			for (let i = 0; i < level; i++) {
				x += this.getXpToLevelUp(i);
			}
			return x;
		},
		getPercentage(xp) {
			const currentLevel = this.getLevel(xp);
			const needed = this.getXpToLevelUp(currentLevel);
			const currentXP = xp - this.getTotalXPNeeded(currentLevel);
			return (currentXP / needed) * 100;
		},
		getColor(index) {
			if (index == 0) return "amber";
			else if (index == 1) return "blue-grey darken-2";
			else if (index == 2) return "deep-orange darken-1";
			else return "blue-grey darken-4";
		},
	},
};
</script>

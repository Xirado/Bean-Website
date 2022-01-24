<template>
	<div
		class="max-w-screen-lg px-4 w-full mx-auto -translate-y-56 sm:-translate-y-40 text-gray-200 space-y-4"
	>
		<template v-for="(user, index) in users">
			<div
				:key="index"
				class="rounded-md shadow-md px-4 py-2 flex items-center justify-between"
				:class="{
					'bg-black/30': index != 0,
					'bg-amber-500': index == 0,
					'bg-zinc-500': index == 1,
					'bg-amber-800': index == 2,
					'mx-1 sm:mx-1': index == 1,
					'mx-1 sm:mx-2': index == 2,
					'mx-1 sm:mx-3': index != 0 && index != 1 && index != 2,
				}"
			>
				<div class="flex items-center space-x-4">
					<div
						class="rounded-full shadow-2xl h-10 w-10 bg-black flex items-center justify-center"
						:class="{
							' bg-opacity-50': index == 0 || index == 1 || index == 2,
							'bg-opacity-100': index != 0 && index != 1 && index != 2,
						}"
					>
						<span
							v-if="index != 0 && index != 1 && index != 2"
							class="font-medium truncate"
						>
							{{ index + 1 }}
						</span>
						<span v-if="index == 0"> 🥇 </span>
						<span v-if="index == 1"> 🥈 </span>
						<span v-if="index == 2"> 🥉 </span>
					</div>
					<img
						class="rounded-full h-14 w-14 bg-black bg-opacity-50 flex items-center justify-center"
						v-if="user.avatar"
						:src="user.avatar"
					/>
					<div class="">
						<h3 class="text-xl font-medium flex flex-col sm:flex-row">
							<span class="xs:hidden">{{ truncate(user.name, 7) }}</span>
							<span class="hidden xs:block"
								><span class="sm:hidden">{{
									truncate(user.name, 20)
								}}</span></span
							>
							<span class="hidden sm:block">{{ truncate(user.name) }}</span>
							<span
								class="font-normal tracking-wide text-gray-400 ml-1"
								:class="{
									'text-gray-800': index == 0,
									'text-gray-300': index == 1,
								}"
								>#{{ user.discriminator }}</span
							>
						</h3>
						<div
							class="rounded-2xl px-2 font-medium bg-rose-500 bg-opacity-50 inline-flex mt-1"
						>
							{{ format(user.xp) }} exp
						</div>
					</div>
				</div>
				<div class="relative flex items-center justify-center">
					<svg class="h-10 w-10 rounded-full text-indigo-600 -rotate-90">
						<circle
							cx="16"
							cy="16"
							r="16"
							fill="none"
							stroke="black"
							stroke-dasharray="100"
							stroke-dashoffset="0"
							stroke-width="7"
							class="opacity-70"
						/>
						<circle
							cx="16"
							cy="16"
							r="16"
							fill="none"
							stroke="currentColor"
							stroke-dasharray="100"
							:stroke-dashoffset="100 - (100 * getPercentage(user.xp)) / 100"
							stroke-width="7"
							class="opacity-70"
						/>
					</svg>
					<span class="absolute font-medium">{{ getLevel(user.xp) }}</span>
				</div>
			</div>
		</template>
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
		truncate(name, length) {
			//css has truncating too, and its better bc its based on elm size rather than length
			let string = String(name);
			const l = length || 41;
			if (string.length > l) {
				return string.substring(0, l + 1) + "...";
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

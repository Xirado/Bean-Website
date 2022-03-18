<template>
	<Wrapper>
		<div class="mx-auto my-10 w-full max-w-screen-lg px-4 text-gray-200">
			<h1 class="mb-3 text-4xl font-semibold tracking-wider">Commands List</h1>
			<!--Arguments info box-->
			<div
				class="top-20 z-30 mx-3 flex items-center rounded-md bg-indigo-600/20 p-4 text-lg font-medium tracking-wide shadow-xl backdrop-blur-xl xs:sticky"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-6 h-8 w-8 text-blue-300"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
				<div>
					<span class="mb-4 flex">
						<div
							class="mr-2 rounded bg-red-500/40 p-1 text-sm font-medium uppercase shadow-md"
						>
							Red
						</div>
						arguments are required</span
					>
					<span class="flex">
						<div
							class="mr-2 rounded bg-green-500/30 p-1 text-sm font-medium uppercase shadow-md"
						>
							Green
						</div>
						arguments are optional</span
					>
				</div>
			</div>
			<!--Loading model-->
			<div
				v-if="!commands"
				class="absolute bottom-10 right-10 inline-flex items-center rounded border border-white/10 bg-indigo-400 bg-opacity-[0.15] px-4 py-2 font-semibold transition duration-300"
			>
				<svg
					class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span class="hidden sm:block">Loading</span>
			</div>
			<!--Commands list-->
			<div class="mt-8 space-y-4">
				<div
					v-for="command in commands"
					:key="command.name"
					class="cursor-pointer items-center rounded-md bg-black/30 p-4 tracking-wide shadow-lg"
				>
					<div>
						<!--Command name & main args-->
						<div
							class="flex flex-col flex-wrap items-center space-y-2 sm:flex-row sm:space-y-0"
						>
							<span class="mr-4 text-lg font-bold tracking-wider"
								>/{{ command.name }}</span
							>
							<div
								v-for="(option, index) in command.options"
								:key="index"
								class="group relative mr-2 rounded p-2 text-sm font-medium shadow md:p-1"
								:class="option.required ? 'bg-red-500/40' : 'bg-green-500/30'"
							>
								<h2 class="uppercase">{{ option.name }}</h2>
								<div
									class="absolute top-10 z-10 hidden w-48 rounded bg-gray-700/50 p-1 backdrop-blur-lg group-hover:block"
								>
									Type: {{ option.type }} <br />
									<span class="mt-2">{{ option.description }}</span>
								</div>
							</div>
						</div>
					</div>
					<!--Sub commands-->
					<div>
						<div v-if="command.sub_commands" class="my-2 space-y-2">
							<div
								class="rounded bg-cyan-500/10 p-3"
								v-for="sub_command in command.sub_commands"
								:key="sub_command.name"
							>
								<div>
									<div>
										<h3
											class="flex flex-col flex-wrap space-y-2 text-center sm:flex-row sm:space-y-0"
										>
											<span class="hidden sm:block">/{{ command.name }} </span>
											<span
												class="relative mx-auto rounded bg-indigo-500/20 p-2 text-sm font-medium uppercase shadow sm:mx-2 sm:p-1"
												>{{ sub_command.name }}</span
											>

											<div
												v-if="Object.keys(sub_command.options).length > 0"
												class="flex flex-col flex-wrap items-center space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0"
											>
												<div
													v-for="(option, index) in sub_command.options"
													:key="index"
													class="group relative rounded p-1 text-sm font-medium shadow"
													:class="
														option.required
															? 'bg-red-500/40'
															: 'bg-green-500/30'
													"
												>
													<h2 class="uppercase">{{ option.name }}</h2>
													<div
														class="absolute top-10 z-10 hidden w-48 rounded bg-gray-700/50 p-1 backdrop-blur-lg group-hover:block"
													>
														Type: {{ option.type }} <br />
														<span class="mt-2">{{ option.description }}</span>
													</div>
												</div>
											</div>
										</h3>
									</div>
								</div>
								<!---Command description-->
								<div>
									<div class="text-center text-stone-300 sm:text-left">
										{{ sub_command.description }}
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-center text-lg text-stone-300 sm:text-left sm:text-base"
						>
							{{ command.description }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</Wrapper>
</template>

<script>
import { fetchCommands } from "@/api/api.js";
import Wrapper from "@/components/Wrapper.vue";
export default {
	name: "Commands",
	components: { Wrapper },
	async created() {
		this.commands = await fetchCommands();
	},
	data() {
		return {
			commands: null,
		};
	},
};
</script>

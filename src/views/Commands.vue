<template>
	<Wrapper>
		<div class="max-w-screen-lg mx-auto text-gray-200 px-4 my-10 w-full">
			<h1 class="font-semibold text-4xl mb-3 tracking-wider">Commands List</h1>
			<!--Arguments info box-->
			<div
				class="rounded-md bg-indigo-600/20 p-4 shadow-xl text-lg font-medium items-center tracking-wide flex sticky z-30 top-20 backdrop-blur-xl mx-3"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 mr-6 text-blue-300"
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
					<span class="flex mb-4">
						<div
							class="uppercase text-sm font-medium p-1 rounded shadow-md bg-red-500/40 mr-2"
						>
							Red
						</div>
						arguments are required</span
					>
					<span class="flex">
						<div
							class="uppercase text-sm font-medium p-1 rounded shadow-md bg-green-500/30 mr-2"
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
				class="absolute bottom-10 right-10 inline-flex items-center rounded px-4 py-2 bg-indigo-400 border border-white/10 transition duration-300 bg-opacity-[0.15] font-semibold"
			>
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
					class="rounded-md bg-black/30 p-4 shadow-lg items-center tracking-wide cursor-pointer"
				>
					<div>
						<!--Command name & main args-->
						<div
							class="flex items-center flex-wrap flex-col space-y-2 sm:flex-row sm:space-y-0"
						>
							<span class="text-lg font-bold tracking-wider mr-4"
								>/{{ command.name }}</span
							>
							<div
								v-for="(option, index) in command.options"
								:key="index"
								class="text-sm font-medium p-2 md:p-1 rounded shadow mr-2 relative group"
								:class="option.required ? 'bg-red-500/40' : 'bg-green-500/30'"
							>
								<h2 class="uppercase">{{ option.name }}</h2>
								<div
									class="absolute top-10 rounded bg-gray-700/50 backdrop-blur-lg p-1 w-48 hidden group-hover:block z-10"
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
								class="bg-cyan-500/10 rounded p-3"
								v-for="sub_command in command.sub_commands"
								:key="sub_command.name"
							>
								<div>
									<div>
										<h3
											class="flex flex-wrap flex-col space-y-2 sm:flex-row sm:space-y-0 text-center"
										>
											<span class="hidden sm:block">/{{ command.name }} </span>
											<span
												class="text-sm font-medium sm:p-1 p-2 rounded shadow relative bg-indigo-500/20 sm:mx-2 mx-auto uppercase"
												>{{ sub_command.name }}</span
											>

											<div
												v-if="Object.keys(sub_command.options).length > 0"
												class="flex sm:space-x-2 flex-col sm:flex-row flex-wrap items-center space-y-2 sm:space-y-0"
											>
												<div
													v-for="(option, index) in sub_command.options"
													:key="index"
													class="text-sm font-medium p-1 rounded shadow relative group"
													:class="
														option.required
															? 'bg-red-500/40'
															: 'bg-green-500/30'
													"
												>
													<h2 class="uppercase">{{ option.name }}</h2>
													<div
														class="absolute top-10 rounded bg-gray-700/50 backdrop-blur-lg p-1 w-48 hidden group-hover:block z-10"
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
									<div class="text-stone-300 text-center sm:text-left">
										{{ sub_command.description }}
									</div>
								</div>
							</div>
						</div>
						<div
							class="text-stone-300 text-center sm:text-left text-lg sm:text-base"
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

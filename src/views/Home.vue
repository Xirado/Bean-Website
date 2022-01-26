<template>
	<Wrapper v-bind:fixed="true" :white="true">
		<div class="flex min-h-screen flex-col bg-white text-gray-200">
			<section class="flex h-screen flex-col">
				<div
					class="flex h-auto flex-grow bg-zinc-800 bg-cover bg-center bg-no-repeat [background-image:url('https://thehill.com/sites/default/files/ca_earth_from_space_istock.jpg')]"
				>
					<div
						class="mx-auto mt-auto mb-auto flex w-full max-w-screen-lg justify-between px-4"
					>
						<div class="mb-24 flex flex-col">
							<h1 class="max-w-xs text-4xl font-semibold text-gray-50">
								The discord bot for something
							</h1>
							<span class="mt-2 text-gray-400">Short description</span>
							<div class="mt-8 flex">
								<router-link to="/dashboard">
									<button
										class="hover:bg-opacity-ss90 mr-3 inline-flex rounded bg-indigo-600 px-4 py-2 font-medium text-gray-100 transition duration-300 hover:bg-indigo-700"
									>
										Manage Servers
									</button> </router-link
								><router-link to="/commands">
									<button
										class="mr-3 inline-flex rounded bg-neutral-600 bg-opacity-75 px-4 py-2 font-medium text-gray-300 transition duration-300 hover:bg-opacity-90"
									>
										Read the Docs
									</button>
								</router-link>
							</div>
						</div>
						<div></div>
					</div>
				</div>
				<div class="flex h-[20vh] max-h-36 flex-shrink bg-zinc-900 p-4">
					<div
						class="mx-auto flex w-full max-w-2xl items-center justify-between"
					>
						<div class="text-center font-medium text-blue-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mx-auto w-16 text-gray-50"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<span class="text-xl font-semibold">1000000+</span><br />
							Users
						</div>
						<div class="text-center font-medium text-blue-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mx-auto w-16 text-gray-50"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
								/>
							</svg>
							<span class="text-xl font-semibold">1000000+</span><br />
							Servers
						</div>
						<div class="text-center font-medium text-blue-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mx-auto w-16 text-gray-50"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
								/>
							</svg>
							<span class="text-xl font-semibold">10000000+</span><br />
							Channels
						</div>
					</div>
				</div>
			</section>
			<section
				class="mx-auto my-10 w-full max-w-screen-lg space-y-24 px-4 text-gray-800"
			>
				<FeatureBox
					shadow="shadow-cyan-700/20"
					text="text-gray-800"
					bg="bg-cyan-50"
					title="Leveling"
					:right="true"
					btn="Level up your server"
					img="https://cdn.discordapp.com/attachments/753296801464844398/930889290760744970/unknown.png"
				>
					Bean comes with powerful moderation commands that blah blah blah blah
					blah Bean comes with powerful moderation commands that blah blah blah
					blah blah
				</FeatureBox>
				<FeatureBox
					shadow="shadow-indigo-700/20"
					text="text-gray-800"
					bg="bg-indigo-50"
					title="Moderation"
					:right="false"
					img="https://cdn.discordapp.com/attachments/753296801464844398/930889290760744970/unknown.png"
				>
					Bean comes with powerful moderation commands that blah blah blah blah
					blah Bean comes with powerful moderation commands that blah blah blah
					blah blah
				</FeatureBox>
			</section>
			<section
				class="relative mt-8 flex h-80 justify-center overflow-hidden bg-gray-800 py-16 sm:block"
			>
				<div
					class="absolute z-10 mx-auto flex w-min max-w-screen-lg flex-col items-center rounded-md bg-white/25 p-4 px-4 sm:static sm:w-full sm:bg-transparent sm:p-0"
				>
					<h2 class="text-6xl font-medium">Convinced?</h2>
					<p class="font-gray-300 mt-2 text-center text-lg">
						Personalize and grow your server with the next generation of discord
						bots
					</p>
					<button
						class="btn mt-6 rounded bg-indigo-600 px-5 py-3 text-lg font-medium text-gray-100"
					>
						Add to discord
					</button>
				</div>
				<!--bottom right-->
				<div
					class="absolute top-48 -left-48 h-[40rem] w-[40rem] rounded-full bg-gradient-to-bl from-emerald-500 via-indigo-600 to-indigo-600 md:top-36"
				></div>
				<!--top right-->
				<div
					class="absolute bottom-36 -right-96 hidden h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-emerald-500 via-emerald-600 to-indigo-600 md:-right-64 lg:-right-48 xs:block"
				></div>
				<!--bottom middle right-->
				<div
					class="absolute right-96 hidden h-[40rem] w-[40rem] rounded-full bg-gradient-to-bl from-emerald-500 via-cyan-500 to-indigo-600 md:block"
				></div>
				<!--top left-->
				<div
					class="absolute bottom-48 hidden h-72 w-72 rounded-full bg-gradient-to-br from-lime-500 via-green-500 to-indigo-600 sm:block lg:left-64"
				></div>
			</section>
		</div>
	</Wrapper>
</template>

<script>
import Wrapper from "../components/Wrapper";
import FeatureBox from "@/components/FeatureBox";

//import '/public/output.css';
export default {
	name: "Home",
	components: {
		Wrapper,
		FeatureBox,
	},
};
</script>

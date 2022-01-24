<template>
	<Wrapper v-bind:fixed="true">
		<div class="flex min-h-screen flex-col bg-white text-gray-200">
			<div
				class="flex h-[80vh] bg-zinc-800 bg-cover bg-center bg-no-repeat [background-image:url('https://thehill.com/sites/default/files/ca_earth_from_space_istock.jpg')]"
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
			<div class="flex h-[20vh] bg-zinc-900 p-4">
				<div class="mx-auto flex w-full max-w-2xl items-center justify-between">
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
			<section
				class="mx-auto my-10 w-full max-w-screen-lg space-y-10 px-4 text-gray-800"
			>
				<figure
					class="flex flex-col-reverse items-center justify-center lg:flex-row lg:justify-between"
				>
					<div
						class="max-w-sm rounded-lg bg-indigo-50 p-3 text-gray-800 shadow-2xl shadow-indigo-700/20"
					>
						<h3 class="mb-2 text-2xl font-semibold">Moderation</h3>
						Bean comes with powerful moderation commands that blah blah blah
						blah blah Bean comes with powerful moderation commands that blah
						blah blah blah blah
					</div>
					<figcaption>
						<img
							src="https://cdn.discordapp.com/attachments/753296801464844398/930889290760744970/unknown.png"
							class="mt-8 mb-8 h-64 rounded shadow-xl shadow-indigo-700/20 lg:mt-0"
						/>
					</figcaption>
				</figure>
				<figure
					class="flex flex-col-reverse items-center justify-center lg:flex-row-reverse lg:justify-between"
				>
					<div
						class="max-w-sm rounded-lg bg-cyan-50 p-3 text-gray-800 shadow-2xl shadow-cyan-700/20"
					>
						<h3 class="mb-2 text-2xl font-semibold">Leveling</h3>
						Bean comes with powerful moderation commands that blah blah blah
						blah blah Bean comes with powerful moderation commands that blah
						blah blah blah blah
					</div>
					<figcaption>
						<img
							src="https://cdn.discordapp.com/attachments/753296801464844398/930889290760744970/unknown.png"
							class="mt-8 mb-8 h-64 rounded shadow-xl shadow-cyan-700/20 lg:mt-0"
						/>
					</figcaption>
				</figure>
			</section>

			<section class="relative flex items-center overflow-hidden bg-gray-800">
				<div class="mx-auto w-full max-w-screen-lg py-10 px-4">
					<h2 class="center text-7xl font-bold tracking-wide">Servers</h2>
					<p
						class="mx-auto mt-2 -mb-6 max-w-xl truncate font-medium text-gray-400 sm:mb-10 lg:ml-0 lg:overflow-auto lg:whitespace-normal"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat
						sed lectus vestibulum mattis. Arcu non odio euismod lacinia at quis
						risus. Pulvinar neque laoreet suspendisse interdum consectetur
						libero. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum.
					</p>
					<button
						class="btn-base invisible mt-24 rounded-md border border-gray-700 bg-white bg-opacity-5 px-4 py-2 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:bg-opacity-10 hover:brightness-105 hover:filter lg:visible"
					>
						See more servers
					</button>
					<div class="absolute right-0 bottom-0 p-10">
						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
							<div class="2xl:hidden"></div>
							<div
								class="group invisible hidden translate-x-44 cursor-pointer rounded-lg border border-gray-900 border-opacity-30 bg-gray-900 bg-opacity-10 p-4 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:border-opacity-10 hover:bg-opacity-10 hover:brightness-105 hover:filter lg:visible 2xl:block"
							>
								<div class="flex">
									<figure
										class="bg-img h-8 w-8 rounded-full bg-cover bg-center"
									></figure>
									<figcaption
										class="ml-2 text-lg font-semibold group-hover:underline"
									>
										Server Name
									</figcaption>
								</div>
								<p class="max-w-xs text-gray-300">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="group invisible translate-x-44 cursor-pointer rounded-lg border border-gray-900 border-opacity-30 bg-gray-900 bg-opacity-10 p-4 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:border-opacity-10 hover:bg-opacity-10 hover:brightness-105 hover:filter lg:visible"
							>
								<div class="flex">
									<figure
										class="bg-img h-8 w-8 rounded-full bg-cover bg-center"
									></figure>
									<figcaption
										class="ml-2 text-lg font-semibold group-hover:underline"
									>
										Server Name
									</figcaption>
								</div>
								<p class="max-w-xs text-gray-300">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="group invisible translate-x-44 cursor-pointer rounded-lg border border-gray-900 border-opacity-30 bg-gray-900 bg-opacity-10 p-4 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:border-opacity-10 hover:bg-opacity-10 hover:brightness-105 hover:filter lg:visible"
							>
								<div class="flex">
									<figure
										class="bg-img h-8 w-8 rounded-full bg-cover bg-center"
									></figure>
									<figcaption
										class="ml-2 text-lg font-semibold group-hover:underline"
									>
										Server Name
									</figcaption>
								</div>
								<p class="max-w-xs text-gray-300">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="group invisible cursor-pointer rounded-lg border border-gray-900 border-opacity-30 bg-gray-900 bg-opacity-10 p-4 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:border-opacity-10 hover:bg-opacity-10 hover:brightness-105 hover:filter sm:visible lg:invisible xl:visible"
							>
								<div class="flex">
									<figure
										class="bg-img h-8 w-8 rounded-full bg-cover bg-center"
									></figure>
									<figcaption
										class="ml-2 text-lg font-semibold group-hover:underline"
									>
										Server Name
									</figcaption>
								</div>
								<p class="max-w-xs text-gray-300">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="group cursor-pointer rounded-lg border border-gray-900 border-opacity-30 bg-gray-900 bg-opacity-10 p-4 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:border-opacity-10 hover:bg-opacity-10 hover:brightness-105 hover:filter"
							>
								<div class="flex">
									<figure
										class="bg-img h-8 w-8 rounded-full bg-cover bg-center"
									></figure>
									<figcaption
										class="ml-2 text-lg font-semibold group-hover:underline"
									>
										Server Name
									</figcaption>
								</div>
								<p class="hidden max-w-xs text-gray-300 sm:block">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="group cursor-pointer rounded-lg border border-gray-900 border-opacity-30 bg-gray-900 bg-opacity-10 p-4 font-semibold text-gray-200 transition duration-300 hover:border-gray-600 hover:border-opacity-10 hover:bg-opacity-10 hover:brightness-105 hover:filter"
							>
								<div class="flex">
									<figure
										class="bg-img h-8 w-8 rounded-full bg-cover bg-center"
									></figure>
									<figcaption
										class="ml-2 text-lg font-semibold group-hover:underline"
									>
										Server Name
									</figcaption>
								</div>
								<p class="hidden max-w-xs text-gray-300 sm:block">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</Wrapper>
</template>

<script>
import Wrapper from "../components/Wrapper";

//import '/public/output.css';
export default {
	name: "Home",
	components: {
		Wrapper,
	},
};
</script>

<template>
	<Wrapper v-bind:fixed="true">
		<div class="flex flex-col bg-white min-h-screen text-gray-200">
			<div
				class="bg-zinc-800 h-[80vh] flex [background-image:url('https://thehill.com/sites/default/files/ca_earth_from_space_istock.jpg')] bg-cover bg-no-repeat bg-center"
			>
				<div
					class="flex justify-between max-w-screen-lg mx-auto mt-auto w-full mb-auto px-4"
				>
					<div class="flex flex-col mb-24">
						<h1 class="text-gray-50 text-4xl font-semibold max-w-xs">
							The discord bot for something
						</h1>
						<span class="text-gray-400 mt-2">Short description</span>
						<div class="flex mt-8">
							<router-link to="/dashboard">
								<button
									class="bg-indigo-600 px-4 py-2 mr-3 text-gray-100 font-medium inline-flex rounded hover:bg-indigo-700 hover:bg-opacity-ss90 transition duration-300"
								>
									Manage Servers
								</button> </router-link
							><router-link to="/commands">
								<button
									class="bg-neutral-600 px-4 py-2 mr-3 text-gray-300 font-medium inline-flex rounded bg-opacity-75 hover:bg-opacity-90 transition duration-300"
								>
									Read the Docs
								</button>
							</router-link>
						</div>
					</div>
					<div></div>
				</div>
			</div>
			<div class="bg-zinc-900 h-[20vh] flex p-4">
				<div class="justify-between items-center flex max-w-2xl w-full mx-auto">
					<div class="text-center font-medium text-blue-200">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-16 mx-auto text-gray-50"
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
						<span class="font-semibold text-xl">1000000+</span><br />
						Users
					</div>
					<div class="text-center font-medium text-blue-200">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-16 mx-auto text-gray-50"
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
						<span class="font-semibold text-xl">1000000+</span><br />
						Servers
					</div>
					<div class="text-center font-medium text-blue-200">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-16 mx-auto text-gray-50"
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
						<span class="font-semibold text-xl">10000000+</span><br />
						Channels
					</div>
				</div>
			</div>
			<section
				class="max-w-screen-lg mx-auto text-gray-800 px-4 my-10 w-full space-y-10"
			>
				<figure
					class="flex flex-col-reverse lg:flex-row justify-center lg:justify-between items-center"
				>
					<div
						class="max-w-sm text-gray-800 rounded-lg p-3 shadow-2xl shadow-indigo-700/20 bg-indigo-50"
					>
						<h3 class="font-semibold text-2xl mb-2">Moderation</h3>
						Bean comes with powerful moderation commands that blah blah blah
						blah blah Bean comes with powerful moderation commands that blah
						blah blah blah blah
					</div>
					<figcaption>
						<img
							src="https://cdn.discordapp.com/attachments/753296801464844398/930889290760744970/unknown.png"
							class="h-64 mt-8 lg:mt-0 rounded shadow-xl shadow-indigo-700/20 mb-8"
						/>
					</figcaption>
				</figure>
				<figure
					class="flex flex-col-reverse lg:flex-row-reverse justify-center lg:justify-between items-center"
				>
					<div
						class="max-w-sm text-gray-800 rounded-lg p-3 shadow-2xl shadow-cyan-700/20 bg-cyan-50"
					>
						<h3 class="font-semibold text-2xl mb-2">Leveling</h3>
						Bean comes with powerful moderation commands that blah blah blah
						blah blah Bean comes with powerful moderation commands that blah
						blah blah blah blah
					</div>
					<figcaption>
						<img
							src="https://cdn.discordapp.com/attachments/753296801464844398/930889290760744970/unknown.png"
							class="h-64 mt-8 lg:mt-0 rounded shadow-xl shadow-cyan-700/20 mb-8"
						/>
					</figcaption>
				</figure>
			</section>

			<section class="bg-gray-800 flex items-center relative overflow-hidden">
				<div class="max-w-screen-lg mx-auto w-full py-10 px-4">
					<h2 class="text-7xl tracking-wide font-bold center">Servers</h2>
					<p
						class="text-gray-400 font-medium max-w-xl mt-2 truncate lg:overflow-auto lg:whitespace-normal mx-auto lg:ml-0 -mb-6 sm:mb-10"
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat
						sed lectus vestibulum mattis. Arcu non odio euismod lacinia at quis
						risus. Pulvinar neque laoreet suspendisse interdum consectetur
						libero. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum.
					</p>
					<button
						class="btn-base text-gray-200 px-4 py-2 mt-24 rounded-md font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-white bg-opacity-5 hover:bg-opacity-10 border-gray-700 hover:border-gray-600 invisible lg:visible"
					>
						See more servers
					</button>
					<div class="absolute right-0 bottom-0 p-10">
						<div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
							<div class="2xl:hidden"></div>
							<div
								class="p-4 hidden 2xl:block text-gray-200 rounded-lg font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-gray-900 bg-opacity-10 hover:bg-opacity-10 border-opacity-30 border-gray-900 hover:border-opacity-10 hover:border-gray-600 group cursor-pointer translate-x-44 invisible lg:visible"
							>
								<div class="flex">
									<figure
										class="h-8 w-8 bg-cover bg-center rounded-full bg-img"
									></figure>
									<figcaption
										class="font-semibold group-hover:underline text-lg ml-2"
									>
										Server Name
									</figcaption>
								</div>
								<p class="text-gray-300 max-w-xs">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="p-4 text-gray-200 rounded-lg font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-gray-900 bg-opacity-10 hover:bg-opacity-10 border-opacity-30 border-gray-900 hover:border-opacity-10 hover:border-gray-600 group cursor-pointer translate-x-44 invisible lg:visible"
							>
								<div class="flex">
									<figure
										class="h-8 w-8 bg-cover bg-center rounded-full bg-img"
									></figure>
									<figcaption
										class="font-semibold group-hover:underline text-lg ml-2"
									>
										Server Name
									</figcaption>
								</div>
								<p class="text-gray-300 max-w-xs">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="p-4 text-gray-200 rounded-lg font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-gray-900 bg-opacity-10 hover:bg-opacity-10 border-opacity-30 border-gray-900 hover:border-opacity-10 hover:border-gray-600 group cursor-pointer translate-x-44 invisible lg:visible"
							>
								<div class="flex">
									<figure
										class="h-8 w-8 bg-cover bg-center rounded-full bg-img"
									></figure>
									<figcaption
										class="font-semibold group-hover:underline text-lg ml-2"
									>
										Server Name
									</figcaption>
								</div>
								<p class="text-gray-300 max-w-xs">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="p-4 text-gray-200 rounded-lg font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-gray-900 bg-opacity-10 hover:bg-opacity-10 border-opacity-30 border-gray-900 hover:border-opacity-10 hover:border-gray-600 group cursor-pointer invisible sm:visible lg:invisible xl:visible"
							>
								<div class="flex">
									<figure
										class="h-8 w-8 bg-cover bg-center rounded-full bg-img"
									></figure>
									<figcaption
										class="font-semibold group-hover:underline text-lg ml-2"
									>
										Server Name
									</figcaption>
								</div>
								<p class="text-gray-300 max-w-xs">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="p-4 text-gray-200 rounded-lg font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-gray-900 bg-opacity-10 hover:bg-opacity-10 border-opacity-30 border-gray-900 hover:border-opacity-10 hover:border-gray-600 group cursor-pointer"
							>
								<div class="flex">
									<figure
										class="h-8 w-8 bg-cover bg-center rounded-full bg-img"
									></figure>
									<figcaption
										class="font-semibold group-hover:underline text-lg ml-2"
									>
										Server Name
									</figcaption>
								</div>
								<p class="text-gray-300 max-w-xs hidden sm:block">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
									do...
								</p>
							</div>
							<div
								class="p-4 text-gray-200 rounded-lg font-semibold hover:filter hover:brightness-105 transition duration-300 border bg-gray-900 bg-opacity-10 hover:bg-opacity-10 border-opacity-30 border-gray-900 hover:border-opacity-10 hover:border-gray-600 group cursor-pointer"
							>
								<div class="flex">
									<figure
										class="h-8 w-8 bg-cover bg-center rounded-full bg-img"
									></figure>
									<figcaption
										class="font-semibold group-hover:underline text-lg ml-2"
									>
										Server Name
									</figcaption>
								</div>
								<p class="text-gray-300 max-w-xs hidden sm:block">
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

<template>
	<div :class="white ? 'bg-white' : 'bg-black'" class="">
		<div
			:class="white ? 'bg-grid text-gray-800' : 'text-gray-200'"
			class="py-14"
		>
			<div
				class="mx-auto flex max-w-screen-lg flex-col justify-between px-4 sm:flex-row"
			>
				<div class="mb-8 sm:mb-0">
					<h2 class="text-center text-5xl font-semibold md:text-left">
						Bean Discord Bot
					</h2>
					<ul class="mt-3 flex font-mono text-lg mx-auto sm:mx-0">
						<li class="mx-1 hover:underline"><a href="#">Discord</a></li>
						<li>•</li>
						<li class="mx-1 hover:underline"><a href="#">Facebook</a></li>
						<li>•</li>
						<li class="mx-1 hover:underline">
							<a href="#">Myspace</a>
						</li>
						<li>•</li>
						<li class="mx-1 hover:underline">
							<a href="#">4chan</a>
						</li>
					</ul>
					<a href="https://discord.gg/yrwUpMcfcR">
						<div
							class="mt-5 rounded-md bg-gray-800 py-1 px-10 text-center font-mono text-gray-200 shadow-lg "
						>
							Crafted by Wave Studios
						</div>
					</a>
				</div>
				<div class="flex gap-14 font-mono mx-auto sm:mx-0">
					<section>
						<h3 class="mb-1 text-lg font-bold">Title</h3>
						<ul :class="white ? 'text-gray-700' : 'text-gray-300'">
							<li>Stuff</li>
							<li>more stuffz</li>
							<li>imposter</li>
						</ul>
					</section>
					<section>
						<h3 class="mb-1 text-lg font-bold">Title</h3>
						<ul :class="white ? 'text-gray-700' : 'text-gray-300'">
							<li>Stuff</li>
							<li>more stuffz</li>
							<li>imposter</li>
						</ul>
					</section>
					<section>
						<h3 class="mb-1 text-lg font-bold">Title</h3>
						<ul :class="white ? 'text-gray-700' : 'text-gray-300'">
							<li>Stuff</li>
							<li>more stuffz</li>
							<li>imposter</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Footer",
	props: ["white"],
	data() {
		return {};
	},
};
</script>

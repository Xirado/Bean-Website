<template>
	<div
		:class="
			white ? 'bg-grid bg-white text-gray-800' : 'bg-black text-gray-200 '
		"
		class=""
	>
		<div :class="compact ? 'py-4' : 'py-14'">
			<div
				class="mx-auto flex max-w-screen-lg flex-col justify-between px-4 sm:flex-row"
			>
				<div class="mb-8 flex flex-col sm:mb-0">
					<h2
						class="text-center font-semibold sm:mx-0 md:text-left"
						:class="compact ? 'text-3xl' : 'text-5xl'"
					>
						Bean Discord Bot
					</h2>
					<ul class="mx-auto mt-3 flex font-mono text-lg md:mx-0">
						<li class="mx-1 hover:underline"><a href="#">Discord</a></li>
						<li>•</li>
						<li class="mx-1 hover:underline"><a href="#">Facebook</a></li>
						<li>•</li>
						<li class="mx-1 hover:underline">
							<a href="#">Myspace</a>
						</li>
					</ul>
					<a href="https://discord.gg/yrwUpMcfcR">
						<div
							class="rounded-md bg-gray-800 py-1 px-10 text-center font-mono text-gray-200 shadow-lg"
							:class="compact ? 'mt-2' : 'mt-5'"
						>
							Crafted by Wave Studios
						</div>
					</a>
				</div>
				<div
					class="mx-auto gap-14 space-y-4 font-mono sm:mx-0 xs:flex xs:space-y-0"
				>
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
	props: {
		white: Boolean,
		compact: Boolean,
	},
	data() {
		return {};
	},
};
</script>

<template>
	<div :class="white ? 'bg-white' : 'bg-zinc-900'" class="">
		<div
			:class="white ? 'bg-grid text-gray-800' : 'text-gray-100'"
			class="py-14"
		>
			<div class="max-w-screen-lg px-4 mx-auto flex justify-between">
				<div>
					<h2 class="text-center text-5xl font-semibold md:text-left">
						Bean Discord Bot
					</h2>
					<ul class="font-mono text-lg mt-1 flex">
						<li class="mx-1">Discord</li>
						<li>•</li>
						<li class="mx-1">Facebook</li>
						<li>•</li>
						<li class="mx-1">Myspace</li>
						<li>•</li>
						<li class="mx-1 hover:underline">4chan</li>
					</ul>
				</div>
				<div class="flex gap-14 font-mono">
					<section>
						<h3 class="font-bold text-lg mb-1">Title</h3>
						<ul :class="white ? 'text-gray-700' : 'text-gray-300'">
							<li>Stuff</li>
							<li>more stuffz</li>
							<li>imposter</li>
						</ul>
					</section>
					<section>
						<h3 class="font-bold text-lg mb-1">Title</h3>
						<ul :class="white ? 'text-gray-700' : 'text-gray-300'">
							<li>Stuff</li>
							<li>more stuffz</li>
							<li>imposter</li>
						</ul>
					</section>
					<section>
						<h3 class="font-bold text-lg mb-1">Title</h3>
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

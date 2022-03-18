<template>
	<figure
		class="flex flex-col-reverse items-center justify-center lg:justify-between"
		:class="{ 'lg:flex-row-reverse': right, 'lg:flex-row': !right }"
	>
		<div
			class="relative flex max-w-sm flex-col rounded-lg p-7 shadow-2xl"
			:class="bg + ' ' + text + ' ' + shadow"
		>
			<h3 class="mb-2 text-2xl font-semibold">{{ title }}</h3>
			<slot></slot>
			<a
				class="btn -bottom-5 -right-12 mt-4 rounded bg-indigo-600 px-4 py-2 font-semibold text-gray-50 shadow-xl shadow-indigo-600/20 sm:absolute sm:mx-0 sm:mt-0 xs:mx-auto xs:max-w-[15rem]"
			>
				{{ btn || "Add to Discord" }}
			</a>
		</div>
		<figcaption>
			<img
				:src="img"
				class="mt-8 mb-8 h-64 rounded shadow-xl lg:mt-0"
				:class="shadow"
			/>
		</figcaption>
	</figure>
</template>

<script>
export default {
	name: "FeatureBox",
	props: ["shadow", "bg", "text", "title", "right", "img", "btn"],
};
</script>

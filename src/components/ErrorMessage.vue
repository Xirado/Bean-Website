<template>
	<Wrapper>
		<div class="text-gray-100 flex flex-col">
			<div
				class="rounded-lg bg-indigo-600/20 mx-auto p-6 text-xl my-auto font-semibold mt-10 flex flex-col text-center min-w-[15rem]"
			>
				{{ title }}
				<span class="text-lg font-normal text-gray-400">{{ message }}</span>
				<div class="space-x-4 mx-auto mt-4 text-base">
					<router-link to="/">
						<button
							class="btn rounded bg-zinc-900 hover:brightness-75 transition duration-200 px-4 py-2 tet-gray-400"
						>
							Home
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</Wrapper>
</template>

<script>
import Wrapper from "./Wrapper.vue";
export default {
	name: "ErrorMessage",
	components: { Wrapper },
	props: {
		message: String,
		title: String,
		loading: Boolean,
	},
};
</script>

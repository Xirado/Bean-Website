<template>
	<Wrapper>
		<div class="flex flex-col text-gray-100">
			<div
				class="mx-auto my-auto mt-10 flex min-w-[15rem] flex-col rounded-lg p-6 text-center text-xl font-semibold shadow-xl"
				:class="red ? 'bg-red-600/30' : 'bg-indigo-600/20'"
			>
				{{ title }}
				<span class="text-lg font-normal text-gray-400">{{ message }}</span>
				<div class="mx-auto mt-4 space-x-4 text-base">
					<router-link to="/">
						<button
							class="btn tet-gray-400 rounded bg-zinc-900 px-4 py-2 transition duration-200 hover:brightness-75"
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
		red: Boolean,
	},
};
</script>

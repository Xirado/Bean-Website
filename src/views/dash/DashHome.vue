<template>
	<div>
		<DashWrapper title="Settings" :numb="1">
			<div class="rounded-md bg-black/30 p-4 text-sm font-medium tracking-wide">
				<h3 class="text-lg">Leveling</h3>
				<form class="mt-4">
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">Enable Leveling</label>
					</div>
				</form>
				<h3 class="mt-4 text-base">Disabled Channels</h3>
				<form
					class="mt-2 max-h-48 max-w-sm space-y-3 overflow-y-auto rounded bg-black/20 p-3"
				>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">#announcements</label>
					</div>

					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">#general</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">#movie-night</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">etc.</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">etc.</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">etc.</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">etc.</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">etc.</label>
					</div>
				</form>
			</div>
			<button
				class="btn mt-4 inline-flex rounded bg-indigo-700 px-4 py-1 font-medium"
			>
				Save
			</button>
		</DashWrapper>
	</div>
</template>

<script>
import DashWrapper from "../../components/DashWrapper.vue";

export default {
	name: "DashHome",
	components: {
		DashWrapper,
	},
};
</script>

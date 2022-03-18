<template>
	<div>
		<DashWrapper title="Music" :numb="3">
			<div class="rounded-md bg-black/30 p-4 text-sm font-medium tracking-wide">
				<h3 class="text-lg">Leveling</h3>
				<form class="mt-4">
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">Allow volume above 100%</label>
					</div>
				</form>
				<h3 class="mt-4 text-base">DJ Roles</h3>
				<form
					class="mt-2 max-h-48 max-w-sm space-y-3 overflow-y-auto rounded bg-black/20 p-3"
				>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">DJ</label>
					</div>

					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">Fakeadmin</label>
					</div>
					<div class="flex items-center">
						<input type="checkbox" name="1" class="mr-2 rounded-full" />
						<label for="1">Rock on dduuuddeeee</label>
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
			<div class="mt-4 inline-flex rounded bg-indigo-700 px-4 py-1 font-medium">
				Save
			</div>
		</DashWrapper>
	</div>
</template>

<script>
import DashWrapper from "../../components/DashWrapper.vue";

export default {
	name: "DashMusic",
	components: {
		DashWrapper,
	},
};
</script>

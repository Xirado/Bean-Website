<template>
	<router-view></router-view>
</template>

<script>
import { logout } from "@/api/api.js";
import "../public/output.css";
export default {
	name: "App",

	created() {
		if (localStorage.getItem("token") && localStorage.getItem("last_login")) {
			if (
				Date.now() / 1000 >
				Number.parseInt(localStorage.getItem("last_login")) + 259200
			)
				logout();
		} else {
			logout();
		}
	},
};
</script>

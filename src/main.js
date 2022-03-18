import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
//import Vuetify from "vuetify";
//import Vuetify from 'vuetify/lib/framework';
import VueSessionStorage from "vue-sessionstorage";

Vue.config.productionTip = false;

/*const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        background: "#FF0000",
      },
    },
  },
});*/

Vue.directive("click-outside", {
	priority: 700,
	bind() {
		let self = this;
		this.event = function (event) {
			console.log("emitting event");
			self.vm.$emit(self.expression, event);
		};
		this.el.addEventListener("click", this.stopProp);
		document.body.addEventListener("click", this.event);
	},

	unbind() {
		console.log("unbind");
		this.el.removeEventListener("click", this.stopProp);
		document.body.removeEventListener("click", this.event);
	},
	stopProp(event) {
		event.stopPropagation();
	},
});

Vue.use(VueSessionStorage);
new Vue({
	router,
	store,
	//vuetify,
	render: (h) => h(App),
}).$mount("#app");

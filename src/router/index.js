import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import("@/views/Home");
const Dashboard = () => import("@/views/dash/Dashboard");
const Documentation = () => import("@/views/Documentation");
const DiscordOauth = () => import("@/views/DiscordOauth");
const Error404 = () => import("@/views/Error404");
const Commands = () => import("@/views/Commands");
const Leaderboard = () => import("@/views/Leaderboard");
const DashHome = () => import("@/views/dash/DashHome");
const DashLogs = () => import("@/views/dash/DashLogs");
const DashMusic = () => import("@/views/dash/DashMusic");

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/dashboard/home",
		name: "DashHome",
		component: DashHome,
	},
	{
		path: "/dashboard/logs",
		name: "DashLogs",
		component: DashLogs,
	},
	{
		path: "/dashboard/music",
		name: "DashMusic",
		component: DashMusic,
	},
	{
		path: "/documentation",
		name: "Documentation",
		component: Documentation,
	},
	{
		path: "/auth/discord",
		name: "DiscordOauth2",
		component: DiscordOauth,
	},
	{
		path: "/guild",
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/commands",
		name: "Commands",
		component: Commands,
	},
	{
		path: "/leaderboard",
		name: "Leaderboard",
		component: Leaderboard,
	},
	{
		path: "*",
		name: "Error404",
		component: Error404,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;

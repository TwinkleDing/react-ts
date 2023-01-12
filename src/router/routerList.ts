import { lazy } from "react";
const Undone = lazy(() => import("@/views/undone"));
const Progress = lazy(() => import("@/views/progress"));
const Task = lazy(() => import("@/views/task"));
const Management = lazy(() => import("@/views/management"));
const My = lazy(() => import("@/views/my"));

const routerList = [
	{
		path: "/",
		name: "undone",
		component: Undone
	},
	{
		path: "/undone",
		name: "undone",
		component: Undone
	},
	{
		path: "/progress",
		name: "progress",
		component: Progress
	},
	{
		path: "/task",
		name: "task",
		component: Task
	},
	{
		path: "/management",
		name: "management",
		component: Management
	},
	{
		path: "/my",
		name: "my",
		component: My
	}
];

export default routerList;

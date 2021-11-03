import Undone from "../views/undone";
import Progress from "../views/progress";
import Task from "../views/task";
import Management from "../views/management";
import My from "../views/my";

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

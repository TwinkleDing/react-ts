import Form from "../views/form";
import Table from "../views/table";
import Task from "../views/task";
import Home from "../views/home";
import Login from "../views/login";

const routerList = [
    {
        path: "/",
        name: "task",
        component: Task
    },
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/form",
        name: "form",
        component: Form
    },
    {
        path: "/table",
        name: "table",
        component: Table
    },
    {
        path: "/task",
        name: "task",
        component: Task
    }
];

export default routerList;

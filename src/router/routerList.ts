import Form from "../views/form";
import Table from "../views/table";
import Chart from "../views/chart";
import Home from "../views/home";
import Login from "../views/login";

const routerList = [
    {
        path: "/",
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
        path: "/chart",
        name: "chart",
        component: Chart
    }
];

export default routerList;
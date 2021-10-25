import Form from "../views/form";
import Table from "../views/table";
import Chart from "../views/chart";
import { RouterType } from "../interface";

const routerList:RouterType = [
    {
        name: "form",
        path: "/form",
        component: Form
    },
    {
        name: "table",
        path: "/table",
        component: Table
    },
    {
        name: "chart",
        path: "/chart",
        component: Chart
    }
];

export default routerList;
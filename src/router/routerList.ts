import Form from "../views/form";
import Table from "../views/table";
import Chart from "../views/chart";

type RouterType = {
    path: string,
    name: string,
    component: React.LazyExoticComponent<any>
}

const routerList:RouterType[] = [
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
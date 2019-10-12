import { Layout } from "win-biz";
import Directional from "@/page/fram/view/Directional.vue";
import Flow from "@/page/flow/view/Exchange.vue";
let routers = [
    {
        path: "/",
        name: "layout",
        component: Layout,
        children: [
            {
                path: "/directional",
                name: "directional",
                component: Directional
            }
        ]
    }
];

const routerChildren = [
    {
        path: "/flow",
        name: "Flow",
        component: Flow
    }]

if ("development" === process.env.NODE_ENV) {
    routerChildren.forEach(item => {
        routers[0].children.push(item);
    });
    localStorage.setItem("Authorization", "development");
} else {
    routerChildren.forEach(item => {
        if (item.children) {
            routers.push({ ...item, children: item.children });
        } else {
            routers.push({ ...item, children: [] });
        }
    });
}
export default routers;




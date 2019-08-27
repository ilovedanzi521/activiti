import Flow from "@/page/flow/view/Exchange.vue";
let routers = [
    {
        path: "/flow",
        name: "Flow",
        component: Flow,
        children: [
            {
                path: "/flow",
                name: "Flow",
                component: Flow
            }
        ]
    }
];

export default routers;

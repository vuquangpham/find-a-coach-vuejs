import {createRouter, createWebHistory} from "vue-router";
import store from '../store/index';
import CoachesList from "../views/coaches/CoachesList";
import NotFound from "../views/NotFound";

const routes = [
    {
        path: "/",
        redirect: "/coaches",
    },
    {
        path: "/coaches",
        name: "coaches",
        component: CoachesList,
    },
    {
        path: "/coaches/:id",
        name: "coach",
        component: () => import("../views/coaches/CoachDetail"),
        props: true,
        children: [
            {
                path: "contact",
                component: () => import("../views/requests/ContactCoach"),
            },
        ],
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/coaches/CoachRegister"),
        meta: {requireAuth: true}
    },
    {
        path: "/requests",
        name: "requests",
        component: () => import("../views/requests/RequestsReceived"),
        meta: {requireAuth: true}
    },
    {
        path: "/auth",
        name: "auth",
        component: () => import("../views/auth/UserAuth"),
        meta: {requireUnAuth: true}
    },
    {
        path: "/:notFound(.*)",
        name: "not-found",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // require auth & not authenticated => redirect to login
    if(to.meta.requireAuth && !store.getters.isAuthenticated){
        next('/auth');
    }else if(to.meta.requireUnAuth && store.getters.isAuthenticated){
        next('/coaches');
    }else{
        next();
    }
});

export default router;

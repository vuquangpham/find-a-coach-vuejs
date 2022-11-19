import { createRouter, createWebHistory } from "vue-router";
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
  },
  {
    path: "/requests",
    name: "requests",
    component: () => import("../views/requests/RequestsReceived"),
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

export default router;

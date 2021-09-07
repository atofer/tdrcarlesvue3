import { createRouter, createWebHistory } from "vue-router";
import Inici from "../views/Inici.vue";
import Aprox1 from "../views/Aprox1.vue";
import Aprox2 from "../views/Aprox2.vue";
import Documentacio from "../views/Documentacio.vue";
import Llegir from "../views/Llegir.vue";

const routes = [
  {
    path: "/",
    name: "Inici",
    component: Inici,
  },
  {
    path: "/documentacio",
    name: "Documentacio",
    component: Documentacio,
  },
  {
    path: "/llegir",
    name: "Llegir",
    component: Llegir,
  },
  {
    path: "/aprox1",
    name: "Aprox1",
    component: Aprox1,
  },
  {
    path: "/aprox2",
    name: "Aprox2",
    component: Aprox2,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
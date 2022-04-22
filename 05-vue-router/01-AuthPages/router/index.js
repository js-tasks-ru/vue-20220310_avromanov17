import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/PageIndex'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/PageLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/PageRegister'),
  },
];

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes,
});

import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/MainPageView.vue') },
  { path: '/auth', component: () => import('@/pages/AuthenticationView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

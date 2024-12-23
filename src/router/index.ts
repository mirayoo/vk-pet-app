import { createWebHistory, createRouter } from 'vue-router'
import AppService from '@/services/appService'

const routes = [
  { path: '/', name: 'Profile', component: () => import('@/pages/MainPageView.vue') },
  { path: '/auth', name: 'SignIn', component: () => import('@/pages/AuthenticationView.vue') },
  { path: '/user/:id', name: 'User', component: () => import('@/pages/UserView.vue'), props: true },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/MainPageView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const isUserLoggedIn = await AppService.isUserLoggedIn()

  if (!isUserLoggedIn && to.name !== 'SignIn') {
    return {
      name: 'SignIn',
    }
  }

  if (isUserLoggedIn && to.name === 'SignIn') {
    return {
      name: 'Profile',
    }
  }
})

export default router

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/tetris',
    name: 'Tetris',
    component: () => import('../views/Tetris.vue'),
  },
  {
    path: '/slot',
    name: 'Slot',
    component: () => import('../views/Slot.vue'),
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../views/Ranking.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

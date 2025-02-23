import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

import HomeView from './views/HomeView.vue'
import SearchView from './views/SearchView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
    props: (route: RouteLocationNormalized) => ({ query: route.query.query }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/proyecto/:id', name: 'project', component: ProjectDetail, props: true },
  { path: '/project/:id', redirect: to => ({ path: `/proyecto/${to.params.id}` }) },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router

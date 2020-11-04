import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "details" */ '../views/home/Home.vue'),
    props: true
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import(/* webpackChunkName: "details" */ '../views/movies/Movies.vue'),
    props: true
  },
  {
    path: '/tvshows',
    name: 'tvshows',
    component: () => import(/* webpackChunkName: "details" */ '../views/tvshows/TvShows.vue'),
    props: true
  },
  {
    path: '/details',
    name: 'details',
    component: () => import(/* webpackChunkName: "details" */ '../views/details/Details.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

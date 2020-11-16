import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: () => import(/* webpackChunkName: "details" */ '../views/home/Home.vue'),
  },
  {
    path: '/movies',
    name: 'movies',
    meta: {
      title: 'Movies'
    },
    component: () => import(/* webpackChunkName: "details" */ '../views/movies/Movies.vue'),
  },
  {
    path: '/tvshows',
    name: 'tvshows',
    meta: {
      title: 'TV-Shows'
    },
    component: () => import(/* webpackChunkName: "details" */ '../views/tvshows/TvShows.vue'),
  },
  {
    path: '/details/:mediatype/:id',
    name: 'details',
    meta: {
      title: 'Search Details'
    },
    component: () => import(/* webpackChunkName: "details" */ '../views/details/Details.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})


export default router

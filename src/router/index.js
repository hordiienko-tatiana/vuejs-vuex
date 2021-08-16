import Vue from 'vue'
import VueRouter from 'vue-router'
import FeedGlobal from '@/views/FeedGlobal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/AuthRegister.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/AuthLogin.vue'),
  },
  {
    path: '/',
    name: 'feedGlobal',
    component: FeedGlobal,
  },
  {
    path: '/feed',
    name: 'feedUser',
    component: () =>
      import(/* webpackChunkName: "feedUser" */ '@/views/FeedUser.vue'),
  },
  {
    path: '/tags/:slug',
    name: 'feedTag',
    component: () =>
      import(/* webpackChunkName: "feedTag" */ '@/views/FeedTag.vue'),
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: () =>
      import(
        /* webpackChunkName: "createArticle" */ '@/views/ArticleCreate.vue'
      ),
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: () =>
      import(/* webpackChunkName: "editArticle" */ '@/views/ArticleEdit.vue'),
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: () =>
      import(/* webpackChunkName: "article" */ '@/views/ArticlePage.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: FeedGlobal,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: FeedGlobal,
  },
  {
    path: '/profiles/:slug/favourites',
    name: 'userProfileFavourites',
    component: FeedGlobal,
  },
]

const router = new VueRouter({
  routes,
})

export default router

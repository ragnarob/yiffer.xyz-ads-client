import Vue from 'vue'
import store from '@/store.js'
import Router from 'vue-router'
import LandingPage from '@/pages/landing-page/LandingPage.vue'
import Dashboard from '@/pages/dashboard/Dashboard.vue'
import ApplicationForm from '@/pages/ApplicationForm.vue'
import Login from '@/pages/Login.vue'

Vue.use(Router)

async function rerouteIfNotLoggedIn(to, from, next) {
  try {
    let isLoggedIn = await store.dispatch('checkAndSetLoginStatus')
    if (isLoggedIn) {
      next()
    }
    else {
      next({ name: 'login' })
    }
  }
  catch (err) {
    next({ name: 'login' })
  }
}

async function rerouteIfLoggedIn(to, from, next) {
  try {
    let isLoggedIn = await store.dispatch('checkAndSetLoginStatus')
    if (!isLoggedIn) {
      next()
    }
    else {
      next({ name: 'landingPage' })
    }
  }
  catch (err) {
    next({ name: 'landingPage' })
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: LandingPage,
      meta: {
        redirectOnLogout: true,
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: ApplicationForm,
      beforeEnter: rerouteIfNotLoggedIn,
      meta: {
        redirectOnLogout: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: rerouteIfLoggedIn,
      meta: {
        redirectOnLogin: true,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: rerouteIfNotLoggedIn,
      meta: {
        redirectOnLogout: true,
      }
    },
  ],
  scrollBehavior () {
    return {x: 0, y: 0}
  }
})

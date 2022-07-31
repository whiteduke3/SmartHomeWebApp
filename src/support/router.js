import Vue from 'vue'
import Router from 'vue-router'
import Store from '../support/store';

Vue.use(Router)

const router = new Router({
  //mode: 'history',
  routes: [
    //app
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/app/LogIn.vue')
    },
    
    {
      path: '/nastavitve',
      name: 'settings',
      component: () => import('../pages/app/Settings.vue')
    },
    {
      path: '/uporabniki',
      name: 'users',
      component: () => import('../pages/app/Users.vue')
    },
    {
      path: '/zgodovina',
      name: 'history',
      component: () => import('../pages/app/History.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/app/Home.vue')
    },
    { 
    path: '/', 
      redirect: { name: 'home' }
    },

    //custom
    {
      path: '/garaza',
      component: () => import('../pages/custom/Floor00.vue')
    },
    {
      path: '/pritlicje',
      component: () => import('../pages/custom/Floor01.vue')
    },
    {
      path: '/nadstropje',
      component: () => import('../pages/custom/Floor02.vue')
    },
    {
      path: '/vlomna',
      component: () => import('../pages/custom/Paradox.vue')
    },
    {
      path: '/klime',
      component: () => import('../pages/custom/AirCondition.vue')
    },
    {
      path: '/vremenska-postaja',
      component: () => import('../pages/custom/WeatherStation.vue')
    },

    
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router;


router.beforeEach((to, from, next) => {
  if (!Store.state.loggedIn && to.name!='login'){
    next({ name: 'login'});
  }
  next();

  // if (Store.getters.permission(to.path)){
  //   next();
  // }else{
  //   next(false);
  // }

})

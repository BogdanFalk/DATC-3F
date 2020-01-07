import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'

// import axios from "axios"

Vue.use(Router)
/* eslint-disable */
export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/dashboard',
            name: 'Admin',
            component: Admin
        }
    ]

})
router.beforeEach((to, from, next) => {

  
    next();
   
}
)
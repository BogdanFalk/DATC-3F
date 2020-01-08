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
        },
        {
            path: '/*',
            name: 'Admin',
            component: Admin
        }
    ]

})
router.beforeEach((to, from, next) => {

    // console.log(to.path);
    if(to.path!="/dashboard")
    {
        let isAdminLogged = false;
        if(localStorage.hasOwnProperty('adminLogged'))
        {
            console.log(localStorage.getItem("adminLogged"))
        }
     
        isAdminLogged = localStorage.getItem("adminLogged");
        console.log(isAdminLogged);
        if(isAdminLogged == "false")
        {
            console.log("going to dashboard");
            next('/dashboard');

        }
        else
        {
            next();
        }
    }
    else
    {
        next();
    }
   

 
   
}
)
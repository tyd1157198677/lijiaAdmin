import Vue from 'vue'
import Router from 'vue-router'

// import Login from '@/pages/login/login'
// import NotFound from '@/pages/errorPage/404'
// import Forbidden from '@/pages/errorPage/403'
// import Layout from '@/pages/layout/index'
// import Home from '@/pages/home/index'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch((err) => err)
    }
    /* 初始路由 */
export default new Router({
    routes: [{
        path: '/login',
        component: (res) => require(['@/pages/login/login'], res),
    }, ],
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [{
        path: '',
        component: (res) => require(['@/pages/layout/index'], res),
        name: 'container',
        // redirect: 'home',
        redirect: '/order/list',
        meta: {
            requiresAuth: true,
            name: '首页',
        },
        children: [
            //   {
            //     id: 1,
            //     path: 'home',
            //     component: Home,
            //     name: 'home',
            //     meta: {
            //         name: '首页',
            //         icon: 'tree',
            //     },
            // },
        ],
    },
    {
        path: '/403',
        component: (res) => require(['@/pages/errorPage/403'], res),
    },
    {
        path: '*',
        component: (res) => require(['@/pages/errorPage/404'], res),
    },
]
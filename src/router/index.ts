import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        name: 'start',
        path: '/',
        component: () => import("../pages/Start.vue"),
        children: [
            {
                path: '/',
                component: () => import("../pages/World.vue")
            },
            {
                name: 'user',
                path: '/user',
                component: () => import("../pages/user/User.vue"),
                beforeEnter: (to, from) => {
                    if (localStorage.getItem("token") == null && to.name !== 'login') {
                        return {name: "login"}
                    }
                },
                children: [
                    {
                        name: 'userInfo',
                        path: '/user/',
                        component: () => import("../pages/user/UserInfo.vue")
                    },
                    {
                        name: 'userTask',
                        path: '/user/task',
                        component: () => import("../pages/user/UserTask.vue")
                    },
                    {
                        name: 'userLove',
                        path: '/user/love',
                        component: () => import("../pages/user/UserLove.vue")
                    }
                ]
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import("../pages/user/LoginOrRegister.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
import {createWebHashHistory, createRouter} from 'vue-router';
import Login from '../components/main/Login.vue'
import Register from '../components/main/Register.vue'
import mainIndex from "../components/main/main-index.vue"
import userMain from "../components/user/user-main.vue"
import SelfInformation from "../components/user/self-information.vue"
import Reservation from "../components/user/reservation.vue"
import AboutUs from "../components/main/about-us.vue"
import MainContent from "../components/main/main-content.vue"
import store from "../store";

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        component: mainIndex,
        children: [
            {
                path: "",
                component: MainContent
            },
            {
                path: 'about-us',
                component: AboutUs,
            },
        ]
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/user',
        component: userMain,
        redirect: "/user/self-information",
        children: [
            {
                path: "self-information",
                component: SelfInformation
            },
            {
                path: "reservation",
                component: Reservation
            }
        ]
    }
]

const router = new createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    if (to.path.startsWith("/user")) {
        if (localStorage.getItem("token")) {
            // store.commit('flesh');
            next();
        } else {
            alert("请先登录！！");
            return next("/login");
        }
    } else {
        next();
    }
})
export default router
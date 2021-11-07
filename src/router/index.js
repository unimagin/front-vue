import {createWebHashHistory, createRouter} from 'vue-router';
import Login from '../components/main/Login.vue'
import Register from '../components/main/Register.vue'
import mainIndex from "../components/main/main-index.vue"
import userMain from "../components/user/information/user-main.vue"
import SelfInformation from "../components/user/information/self-information.vue"
import ReservationMain from "../components/user/reservation/reservation-main.vue"
import AboutUs from "../components/main/about-us.vue"
import MainContent from "../components/main/main-content.vue"
import ParkingSituation from "../components/user/reservation/park-situation.vue"
import ReservationSituation from "../components/user/reservation/reservation-situation.vue"
import ReservationInformation from "../components/user/information/reservation-information.vue"
import BasicInformation from "../components/user/information/basic-information.vue"

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
                component: SelfInformation,
                redirect: "/user/self-information/basic",
                children: [
                    {
                        path: 'basic',
                        component: BasicInformation,
                    },
                    {
                        path: 'reservation-information',
                        component: ReservationInformation,
                    }
                ]
            },
            {
                path: "reservation",
                component: ReservationMain,
                redirect: "/user/reservation/park-situation",
                children: [
                    {
                        path: 'park-situation',
                        component: ParkingSituation
                    },
                    {
                        path: 'reservation-situation',
                        component: ReservationSituation
                    }
                ]

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
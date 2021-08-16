import { createWebHistory, createRouter } from 'vue-router';
const history = createWebHistory();

import Home from '@/views/Home';
import CoinDetail from '@/views/CoinDetail.vue'
import About from '@/views/About'
import Error from '@/views/Error.vue';



export default createRouter({
    history,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/coin/:id",
            name: "coin-details",
            component: CoinDetail
        },
        {
            path: "/about", 
            name: "About",
            component: About
        },
        {
            path: "/:catchAll(.*)", 
            name: "Error",
            component: Error
        }
    ]
});

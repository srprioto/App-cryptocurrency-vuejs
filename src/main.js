import { createApp } from 'vue';
import '@/assets/css/tailwind.css';
import App from './App.vue';
import router from "@/router"

// import { VueSpinners } from '@saeris/vue-spinners'
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'



createApp(App)
    .use(router)
    .use(VueChartkick)
    // .use(PulseLoader)
    // .use(VueSpinners)
    .mount('#app');


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faJsSquare } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';

library.add(faJsSquare, faSquareFacebook, faInstagram, faPinterest);

const app = createApp(App)

app.use(createPinia())

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')

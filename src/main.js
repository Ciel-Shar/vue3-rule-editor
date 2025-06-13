import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronDown, faChevronRight);

// 创建Vue应用实例
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
// 挂载应用
app.mount('#app')

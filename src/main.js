import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

library.add(faChevronDown, faChevronRight);

// 创建Vue应用实例
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);

// Register all Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Configure Element Plus theme
app.use(ElementPlus, {
  size: 'default',
  zIndex: 3000,
  button: {
    autoInsertSpace: true
  }
});

// 挂载应用
app.mount('#app')
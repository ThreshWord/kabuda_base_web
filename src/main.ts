import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { Config } from './config/config'
import { routes } from './router'
import ElementPlus from 'element-plus'
import '@/assets/styles/base.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import setDirectives from './directives/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(Config.createRouter(routes))
app.use(setDirectives)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')

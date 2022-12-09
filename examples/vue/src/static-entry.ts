import { createSSRApp } from 'vue'
import Static from './Static.vue'

export function createStaticApp() {
  return createSSRApp(Static)
}

export function renderStatic() {
  return createStaticApp().mount('#static')
}

import { createSSRApp, createApp } from 'vue'
import Static from './Static.vue'

export function createStaticApp() {
  // Currently, static generation is only used in production in order to reduce complexity in development.
  if (import.meta.env.PROD) {
    return createSSRApp(Static)
  } else {
    return createApp(Static)
  }
}

export function renderStatic() {
  return createStaticApp().mount('#static')
}

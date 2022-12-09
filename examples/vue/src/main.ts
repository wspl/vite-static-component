import { createApp } from 'vue'
import App from './App.vue'
import { renderStatic } from './static-entry'

createApp(App).mount('#app')

renderStatic()

# vite-static-component
A Vite plugin that allows you to pre-render a subset of components in your project based on server-side rendering (SSR) technology. Using this plugin is simple and requires only a few easy configurations.

## Installation

To install this plugin, run the following command:

```sh
npm install vite-ssr-plugin
```
## Usage
1. Add a mount anchor to an HTML file, such as `#static`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Example</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- Add an anchor here -->
    <div id="static"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```
2. Create a file named `static-entry.ts`
```typescript
import { createSSRApp } from 'vue'
import Static from './Static.vue'

export function createStaticApp() {
  return createSSRApp(Static)
}

export function renderStatic() {
  return createStaticApp().mount('#static')
}
```
This file is the entry point for your statically-rendered component, and it actually creates a new Vue SSR app.

3. Then, in the entry point of your application, call the `renderStatic` function you just created.
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { renderStatic } from './static-entry'

createApp(App).mount('#app')

// Call the render function (It actually performs the hydration work in SSR.)
renderStatic()
```

4. Finally, import this plugin in your vite.config.ts file and specify the entry point file you just created, as well as the selector for the anchor you added to the HTML file.
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import staticComponent from 'vite-static-component'

export default defineConfig({
  plugins: [
    vue(),
    // Add and configure the plugin to vite.
    staticComponent({
      entry: 'src/static-entry.ts',
      selector: '#static',
    })
  ],
})
```

5. Now, you can build your project to see the resulting output.

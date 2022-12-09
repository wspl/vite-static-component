import { execSync } from 'child_process'
import path from 'path'
import fs from 'fs'
import type { Plugin } from 'vite'
import { parse } from 'node-html-parser'

async function generateStatic(entry: string) {
  const tempDir = path.resolve('.vite-static-component-temp')
  const entryRelative = path.relative(tempDir, path.resolve(entry)).replaceAll('\\', '/')
  const generateJs = `
    import { renderToString } from 'vue/server-renderer'
    import { createStaticApp } from '${entryRelative}'
    const app = createStaticApp()
    export function render() {
      return renderToString(app)
    }
  `
  await fs.promises.mkdir(path.join(tempDir, 'out'), { recursive: true })
  await fs.promises.writeFile(path.join(tempDir, 'generate.js'), generateJs)
  execSync('vite build --ssr .vite-static-component-temp/generate.js --outDir .vite-static-component-temp/out')

  const files = await fs.promises.readdir(path.join(tempDir, 'out'))
  const generateDistJs = path.join(tempDir, 'out', files.find(f => f.endsWith('.js')) ?? '')
  await fs.promises.rename(generateDistJs, `${generateDistJs}.mjs`)
  const { render } = await import(`file://${generateDistJs}.mjs`)
  const html = await render()
  await fs.promises.rm(tempDir, { recursive: true, force: true })
  return html
}

export const isSSG = process.argv.includes('--ssr')

export interface StaticComponentOptions {
  entry: string
  selector: string
}
export default function staticComponent({ entry, selector }: StaticComponentOptions): Plugin[] {
  return [{
    name: 'static-component',
    apply: 'build',
    enforce: 'post',
    async transformIndexHtml(code) {
      const staticRenderedHTML = await generateStatic(entry)
      const html = parse(code, {
        comment: true,
      })
      const staticDOM = html.querySelector(selector)
      if (staticDOM)
        staticDOM.innerHTML = staticRenderedHTML
      return html.toString()
    },
  }]
}

import { type Plugin, type UserConfig, defineConfig, searchForWorkspaceRoot } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import { APP_PATH, CLIENT_PATH, resolveAliases } from './alias'
import { createMarkdownToVueRenderFn } from './markdownToVue'

const cleanUrl = (url: string): string =>
  url.replace(/#.*$/s, '').replace(/\?.*$/s, '')

export function createWitepressPlugin() {
  let markdownToVue: any

  const witepressPlugin: Plugin = {
    name: 'witepress',

    async configResolved() {
      markdownToVue = await createMarkdownToVueRenderFn()
    },

    config() {
      const baseConfig = defineConfig({
        resolve: {
          alias: resolveAliases(),
        },
        server: {
          fs: {
            allow: [
              CLIENT_PATH,
              searchForWorkspaceRoot(process.cwd()),
            ],
          },
        },
      })

      return baseConfig as UserConfig
    },

    async transform(code, id) {
      if (id.endsWith('.md')) {
        const { vueSrc } = await markdownToVue(code, id)
        return vueSrc
      }
      return code
    },

    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const url = req.url && cleanUrl(req.url)
          if (url?.endsWith('.html')) {
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            let html = `<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/@fs/${APP_PATH}/index.ts"></script>
  </body>
</html>`
            html = await server.transformIndexHtml(url, html, req.originalUrl)
            res.end(html)
            return
          }
          next()
        })
      }
    },
  }

  return [
    witepressPlugin,
    pluginVue({
      include: [/\.vue$/, /\.md$/],
    }),
  ]
}

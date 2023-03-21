import { type App, createApp as createClientApp, createSSRApp, defineComponent, h } from 'vue'
import RawTheme from '@theme/index'
import { Content } from './components/Content'
import { CompTest } from './components/CompTest'
import { type Router, RouterSymbol, createRouter } from './router'
import { inBrowser, pathToFile } from './utils'

function resolveThemeExtends(theme: typeof RawTheme) {
  if (theme.extends) {
    // hold on
  }
  return theme
}

const Theme = resolveThemeExtends(RawTheme)

const WitePressApp = defineComponent({
  name: 'WitepressApp',
  setup() {
    return () => h(Theme.Layout)
  },
})

async function createApp() {
  const app = newApp()

  const router = newRouter()
  app.provide(RouterSymbol, router)

  app.component('WContent', Content)
  app.component('WCompTest', CompTest)

  return {
    app,
    router,
  }
}

function newApp(): App {
  return import.meta.env.PROD
    ? createSSRApp(WitePressApp)
    : createClientApp(WitePressApp)
}

function newRouter(): Router {
  return createRouter((path) => {
    const pageFilePath = pathToFile(path)

    return import(
      /*
        @vite-ignore
      */
      pageFilePath
    )
  })
}

if (inBrowser) {
  createApp().then(({ app, router }) => {
    router.go().then(() => {
      app.mount('#app')
    })
  })
}

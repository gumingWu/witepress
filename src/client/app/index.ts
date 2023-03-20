import { type App, createApp as createClientApp, createSSRApp, defineComponent, h } from 'vue'
import RawTheme from '@theme/index'
import { Content } from './components/Content'
import { inBrowser } from './utils'

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

  app.component('WContent', Content)

  return {
    app,
  }
}

function newApp(): App {
  return import.meta.env.PROD
    ? createSSRApp(WitePressApp)
    : createClientApp(WitePressApp)
}

if (inBrowser) {
  createApp().then(({ app }) => {
    app.mount('#app')
  })
}

import { type App, createApp as createClientApp, createSSRApp, defineComponent, h } from 'vue'
import { inBrowser } from './utils'

const WitePressApp = defineComponent({
  name: 'WitepressApp',
  setup() {
    return () => h('div', '哈哈哈我是witepress')
  },
})

async function createApp() {
  const app = newApp()

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

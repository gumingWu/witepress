import { type Component, type InjectionKey, inject, markRaw, nextTick, reactive } from 'vue'
import { inBrowser } from './utils'

export interface Route {
  path: string
  component: Component | null
}

export interface Router {
  route: Route
  go: (href?: string) => Promise<void>
}

export const RouterSymbol: InjectionKey<Router> = Symbol('WitepressRouter')
const fakeHost = 'http://a.com'

const getDefaultRoute = (): Route => ({
  path: '/',
  component: null,
})

export function createRouter(
  loadPageModule: (path: string) => Promise<any>,
): Router {
  const route = reactive(getDefaultRoute())

  const router: Router = <Router>{
    route,
    go,
  }

  async function go(href: string = inBrowser ? location.href : '/') {
    // const url = new URL(href, fakeHost)
    await loadPage(href)
  }

  async function loadPage(href: string, scrollPosition = 0) {
    const targetLoc = new URL(href, fakeHost)
    const pendingPath = targetLoc.pathname
    try {
      const page = await loadPageModule(pendingPath)

      const { default: comp } = page
      if (!comp)
        throw new Error(`Invalid route component: ${comp}`)

      route.path = inBrowser ? pendingPath : pendingPath
      route.component = markRaw(comp)

      if (inBrowser) {
        nextTick(() => {
          window.scrollTo(0, scrollPosition)
        })
      }
    } catch (e: any) {
      console.error(e.message)
    }
  }

  return router
}

export function useRouter(): Router {
  const router = inject(RouterSymbol)
  if (!router)
    throw new Error('useRouter() is called without provider.')

  return router
}

export function useRoute() {
  return useRouter().route
}

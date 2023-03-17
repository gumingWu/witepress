import { type ServerOptions, createServer as createViteServer } from 'vite'
import pluginVue from '@vitejs/plugin-vue'
import { createWitepressPlugin } from './plugin'

export async function createServer(root: string = process.cwd(), serverOptions: ServerOptions = {}) {
  return createViteServer({
    root,
    plugins: [...createWitepressPlugin(), pluginVue()],
  })
}

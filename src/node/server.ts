import { type ServerOptions, createServer as createViteServer } from 'vite'

export function createServer(root: string = process.cwd(), serverOptions: ServerOptions = {}) {
  return createViteServer({
    root,
  })
}

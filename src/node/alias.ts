import { createRequire } from 'module'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')

export const DIST_CLIENT_PATH = resolve(PKG_ROOT, 'client')
export const APP_PATH = join(DIST_CLIENT_PATH, 'app')

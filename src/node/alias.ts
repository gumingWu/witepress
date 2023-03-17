import { createRequire } from 'module'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import type { Alias, AliasOptions } from 'vite'

const require = createRequire(import.meta.url)
const PKG_ROOT = resolve(fileURLToPath(import.meta.url), '../..')

export const CLIENT_PATH = resolve(PKG_ROOT, 'client')
export const APP_PATH = join(CLIENT_PATH, 'app')
export const DEFAULT_THEME_PATH = join(CLIENT_PATH, 'theme-default')

export function resolveAliases(): AliasOptions {
  const paths: Record<string, string> = {
    '@theme': DEFAULT_THEME_PATH,
  }

  const aliases: Alias[] = [
    ...Object.keys(paths).map(p => ({
      find: p,
      replacement: paths[p],
    })),
  ]

  return aliases
}

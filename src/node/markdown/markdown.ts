import MarkdownIt from 'markdown-it'
import { componentPlugin } from '@mdit-vue/plugin-component'
import { sfcPlugin } from '@mdit-vue/plugin-sfc'

export type MarkdownRenderer = MarkdownIt

export async function createMarkdownRenderer(): Promise<MarkdownRenderer> {
  const md = MarkdownIt({
    html: true,
    linkify: true,
  }) as MarkdownRenderer

  // md.use(componentPlugin)
  //   .use(sfcPlugin)

  return md
}

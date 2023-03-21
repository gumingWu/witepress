import { createMarkdownRenderer } from './markdown'

interface MarkdownCompileResult {
  vueSrc: string
}

export async function createMarkdownToVueRenderFn() {
  const md = await createMarkdownRenderer()

  return async (src: string, file: string): Promise<MarkdownCompileResult> => {
    const env = {
      path: file,
    }
    // console.log({src});
    // { src: '# Hello Witepress\r\n' }

    const html = md.render(src, env)
    // console.log({html});
    // { html: '<h1>Hello Witepress</h1>\n' }

    const vueSrc = [
      `<template><div>
        ${html}
      </div></template>`,
    ].join('\n')

    return {
      vueSrc,
    }
  }
}

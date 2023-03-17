declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@theme/index' {
  import type { Component } from 'vue'
  type Theme = {
    Layout: Component,
    extends?: Theme
  }
  const theme: Theme
  export default theme
}
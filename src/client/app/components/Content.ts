import { defineComponent, h } from 'vue'

export const Content = defineComponent({
  name: 'WitepressContent',
  setup() {
    return () => h('div', '我是Content')
  },
})

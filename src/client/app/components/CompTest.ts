import { defineComponent, h, ref } from 'vue'

export const CompTest = defineComponent({
  name: 'CompTest',
  setup() {
    const num = ref(0)
    const click = () => {
      num.value = num.value + 1
    }

    return () => h('div', null, [
      h('div', `我是组件测试${num.value}`),
      h('button', {
        onClick: click,
      }, '按钮'),
    ])
  },
})

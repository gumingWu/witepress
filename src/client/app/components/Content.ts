import { defineComponent, h } from 'vue'
import { useRoute } from '../router'

export const Content = defineComponent({
  name: 'WitepressContent',
  props: {
    as: {
      type: [Object, String],
      default: 'div',
    },
  },
  setup(props) {
    const route = useRoute()

    return () => h(
      props.as,
      { style: { position: 'relative' } },
      [
        route.component ? h(route.component) : '404',
      ],
    )
  },
})

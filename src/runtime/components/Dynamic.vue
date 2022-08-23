<template>
  <component
    :is="LazyComponent"
    v-if="LazyComponent"
    v-bind="{
      ...attrs,
    }"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>

    <template
      v-for="(_, scopedSlotName) in $slots"
      #[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </component>
</template>

<script setup>
import { useSwitchCases } from './../composables/useSwitchCases'
import { useHydrate } from './../composables/useHydrate'
import { useAttrs, computed, ref } from '#imports'

const { toPascalCase } = useSwitchCases()

const props = defineProps({
  /*
   * name of the component (as registered by nuxt) to be loaded
   * */
  isComponent: {
    type: String,
    required: true
  },

  /*
   * if `true`: component gets never hydrated and is instead instantly loaded (async)
   * */
  never: {
    type: Boolean,
    default: false
  },

  /*
   * if `true`: component gets hydrated when browser is idle (or after default timeout of 2000ms)
   * if `Number` is passed: max timeout can be defined
   * */
  whenIdle: {
    type: [Boolean, Number],
    default: null
  },

  /*
   * if `true`: component gets hydrated when visible
   * if `Object` is passed: observer options can be defined according to: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
   * */
  whenVisible: {
    type: [Boolean, Object],
    default: null
  },

  /*
   * if `true`: component gets hydrated on event 'focus'
   * if `String` is passed: has to be event name to hydrate component on
   * if `Array` is passed: has to be an array with event names to hydrate component on
   * */
  on: {
    type: [Boolean, Array, String],
    default: null
  },

  /**
   * Object with properties:
   * `type` as String ('never'|'whenIdle'|'whenVisible'|'on')
   * `options` (e.g. Number for timeout if 'whenIdle' was defined)
   * */
  hydration: {
    type: Object,
    default: () => ({})
  }
})

const attrs = useAttrs()

/*
 * get the name
 * attrs.component will be deprecated in a future release
 * */
const componentName = computed(() =>
  toPascalCase(props.isComponent ?? attrs.component)
)

/*
 * get the hydration type and config
 * */
const hydration = {
  never: props.never,
  whenIdle: props.whenIdle,
  whenVisible: props.whenVisible,
  on: props.on,
  ...Object.fromEntries([Object.values(props.hydration).concat(true)])
}
const { hydrate } = useHydrate(hydration)

/*
 * load (and hydrate if configured) the component
 * */
const LazyComponent = ref(null)

watch(
  [() => props],
  ([{ never, whenIdle, whenVisible, on }]) => {
    LazyComponent.value = hydrate(() =>
      import('#components').then((c) => {
        if (c.componentNames.includes(componentName.value)) {
          return c[componentName.value]
        }
        return c.NotFound
      })
    )
  },
  { immediate: true, deep: true }
)
</script>

<script>
export default {
  name: 'Dynamic',

  inheritAttrs: false
}
</script>

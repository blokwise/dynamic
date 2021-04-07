<template>
  <component
    v-if="lazyComponent"
    :is="lazyComponent"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- pass through normal slots -->
    <template v-for="(_, slotName) in $slots" v-slot:[slotName]>
      <slot :name="slotName" />
    </template>

    <!-- pass through scoped slots -->
    <template
      v-for="(_, scopedSlotName) in $scopedSlots"
      v-slot:[scopedSlotName]="slotData"
    >
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </component>
</template>

<script>
import {
  hydrateOnInteraction,
  hydrateWhenIdle,
  hydrateWhenVisible,
  hydrateSsrOnly,
} from "vue-lazy-hydration";
import { toPascalCase } from "./../utils/cases";

// inspiration for slot handling:
// https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2
export default {
  name: "Dynamic",

  inheritAttrs: false,

  props: {
    name: {
      type: String,
      required: true,
    },
    /**
     * options: [
     *   OnInteraction,
     *   WhenIdle,
     *   WhenVisible,
     *   Never,
     * ]
     */
    hydration: {
      type: String,
      default: "WhenIdle",
    },
  },

  computed: {
    hydrate() {
      return this[`hydrate${this.hydration}`] ?? null;
    },

    componentLoader() {
      const loaders = ["", ...this.$nuxtDynamic.prefixes]
        .map((prefix) => {
          const name = `Lazy${prefix}${toPascalCase(this.name)}`;
          return name in this.$nuxtDynamic.loaders
            ? this.$nuxtDynamic.loaders[name]
            : null;
        })
        .filter((loader) => loader);
      return loaders.shift() ?? null;
    },

    lazyComponent() {
      return this.hydrate && this.componentLoader
        ? this.hydrate(this.componentLoader)
        : this.name;
    },
  },

  methods: {
    hydrateOnInteraction: hydrateOnInteraction,
    hydrateWhenIdle: hydrateWhenIdle,
    hydrateWhenVisible: hydrateWhenVisible,
    hydrateNever: hydrateSsrOnly,
  },
};
</script>

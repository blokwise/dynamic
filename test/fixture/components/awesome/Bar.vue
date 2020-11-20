<template>
  <div>
    <h1>Content of Bar</h1>
    <slot name="some-slot" :tags="tags" />
  </div>
</template>

<script>
export default {
  name: "Bar",

  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

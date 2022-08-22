<template>
  <div>
    <h2>AwesomeBar</h2>
    <slot name="some-slot" :tags="tags" />
  </div>
</template>

<script>
export default {
  name: 'Bar',

  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

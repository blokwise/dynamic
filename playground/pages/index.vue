<template>
  <div>
    <h1>index.vue</h1>
    <NuxtDynamic
      is-component="ComponentA"
      :on="on"
    />

    <NuxtDynamic
      is-component="component-b"
      :hydration="{ type: 'whenIdle' }"
      @submit="onSubmit"
    >
      <span>passed through slot</span>
    </NuxtDynamic>
  </div>
</template>

<script setup>
const on = ref(['click'])

onMounted(() => {
  setTimeout(() => {
    on.value.push('mouseover')
  }, 10000)
})
</script>

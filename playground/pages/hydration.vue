
<template>
  <div>
    <h1>hydation</h1>

    <!-- instant hydration -->
    <NuxtDynamic
      is-component="ComponentA"
    />

    <!-- no hydration -->
    <NuxtDynamic
      is-component="ComponentA"
      never
    />

    <!-- hydration when idle (with default timeout of 2000ms) -->
    <NuxtDynamic
      is-component="ComponentA"
      when-idle
    />

    <!-- hydration when idle with provided timeout -->
    <NuxtDynamic
      is-component="ComponentA"
      :when-idle="5000"
    />

    <!-- hydration when visible -->
    <NuxtDynamic
      is-component="ComponentA"
      when-visible
    />

    <!-- hydration when visible with provided object for intersection observer api -->
    <NuxtDynamic
      is-component="ComponentA"
      :when-visible="{
        rootMargin: '120px',
        threshold: 1.0
      }"
    />

    <!-- hydration on default interaction (focus) -->
    <NuxtDynamic
      is-component="ComponentA"
      on
    />

    <!-- hydration on interaction (provided as String) -->
    <NuxtDynamic
      is-component="ComponentA"
      on="mouseover"
    />

    <!-- hydration on interaction (provided as Array) -->
    <NuxtDynamic
      is-component="ComponentA"
      :on="['mouseover, focus, click']"
    />

    <!-- hydration on interaction (provided as changing variable) -->
    <NuxtDynamic
      is-component="ComponentA"
      :on="on"
    />

    <!-- hydration with hydration config as object -->
    <NuxtDynamic
      is-component="ComponentB"
      :hydration="{ type: 'whenIdle' }"
    />
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

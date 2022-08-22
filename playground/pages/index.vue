<template>
  <div>
    <h1>index</h1>

    <!-- test all different component name cases -->
    <NuxtDynamic
      v-for="(item, i) in [
        'PascalCase',
        'snake-case',
        'kebab-case',
      ]"
      :key="i"
      :is-component="item"
    />

    <!-- test fallback for old component name configuration (attrs.component is used) -->
    <NuxtDynamic
      v-for="(item, i) in [
        'AwesomeFoo',
        'awesome-bar',
      ]"
      :key="i"
      :component="item"
    />
  </div>
</template>

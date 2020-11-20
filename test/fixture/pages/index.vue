<template>
  <div>
    <NuxtDynamic
      v-for="(item, i) in [
        'AwesomeFoo',
        'awesome-bar',
        'snake-case',
        'kebab-case',
      ]"
      :key="i"
      :name="item"
    />
  </div>
</template>

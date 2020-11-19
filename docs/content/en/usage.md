---
title: Usage
description: ""
position: 3
category: Guide
---

## Props

### `name`

- **Type**: `String`
- **Required**: `true`

The name of the component which should be imported.
If the component was initialized with a prefix in `@nuxt/components` config, it should be loaded as such. Nevertheless it is possible to **ommit the prefix to automatically detect the right component** _(if there are no conflincting names)_.

### `hydration`

- **Type**: `String`
- **Default**: `'WhenIdle'`
- _Options_: `'WhenIdle'`, `'WhenVisible'`, `'OnInteraction'`, `'SsrOnly'`

The hydration prop controls **when / how the component will be hydrated**. The hydration is implemented with `vue-lazy-hydration` thanks to [Markus Oberlehner](https://github.com/maoberlehner/vue-lazy-hydration).

## NuxtDynamic

Use `NuxtDynamic` to **auto import any component** which is initialized through `@nuxt/components` _dynamically_.

```vue
<template>
  <NuxtDynamic name="Logo" />

  <NuxtDynamic
    v-for="(component, i) in ['Logo', 'Grid', 'Nav']"
    :key="i"
    :name="component"
  />
</template>
```

## LazyNuxtDynamic

Use `LazyNuxtDynamic` if you want the component itself being imported lazily.

```vue
<template>
  <LazyNuxtDynamic name="Logo" />
</template>
```

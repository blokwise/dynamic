---
title: Usage
description: ""
position: 3
category: Guide
---

## Props

### `component`

- **Type**: `String`

The name of the component which should be imported.
If the component was initialized with a prefix in `@nuxt/components` config, it should be loaded as such. Nevertheless it is possible to **ommit the prefix to automatically detect the right component** _(if there are no conflincting names)_.

<alert type="info">
<b>
<i class="font-light"><span class="font-bold">Heads up</span>: Starting with version <code>v1.4.0</code> the prop <code>component`</code> replaces the deprecated prop <code>name</code>.
Passing the component name by using <code>name</code> still works through <code>$attrs.name</code> internally.
However, this workaround will be removed in the next major version (<code>v.2.0.0+</code>).</i>
</p>
</alert>

### `hydration`

- **Type**: `String`
- **Default**: `'WhenIdle'`
- _Options_: `'WhenIdle'`, `'WhenVisible'`, `'OnInteraction'`, `'Never'`

The hydration prop controls **when / how the component will be hydrated**. The hydration is implemented with `vue-lazy-hydration` thanks to [Markus Oberlehner](https://github.com/maoberlehner/vue-lazy-hydration).

### `componentRef`

- **Type**: `String` or `Number`
- **Default**: `null`

The componentRef prop adds a reference to the child component.

## NuxtDynamic

Use `NuxtDynamic` to **auto import any component** which is initialized through `@nuxt/components` _dynamically_.

```vue
<template>
  <NuxtDynamic component="Logo" />

  <NuxtDynamic
    v-for="(component, i) in ['Logo', 'Grid', 'Nav']"
    :key="i"
    :component="component"
  />
</template>
```

## LazyNuxtDynamic

Use `LazyNuxtDynamic` if you want the component itself being imported lazily.

```vue
<template>
  <LazyNuxtDynamic component="Logo" />
</template>
```


## Assign Ref to child component

Use `componentRef` to assign a `ref` to the child component.

```vue
<template>
  <NuxtDynamic component="Logo" componentRef="logoChild" ref="logo" />
</template>
```

This allows you to call methods on the child component or access its data:

```js
this.$refs.logo.[0].$refs.logoChild
```

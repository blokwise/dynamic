---
title: Usage
description: ""
position: 3
category: Guide
---

## Props

### `isComponent`

- Type: `String`

The name of the component which should be imported and rendered as registered by nuxt. The component name can be passed in PascalCase, snake_case or kebab-case.

<alert type="info">
<p>
<i class="font-light"><span class="font-bold">Heads up</span>: Starting with version <code>v2.0.0</code> the prop <code>isComponent`</code> replaces the deprecated prop <code>component</code>.
Passing the component name by using <code>component</code> still works through <code>$attrs.component</code> internally.
However, this workaround will be removed in the next major version (<code>v3.0.0+</code>).</i>
</p>
</alert>

### `never`

- Type: `Boolean`
- Default: `false`

If `true`, the component gets never hydrated.

### `whenIdle`

- Type: `[Booelan, Number]`
- Default: `null`

 If `true`, component gets hydrated when browser is idle (or after default timeout of 2000ms).
 If `Number` is passed, it'll be used as max timeout to start hydration.

### `whenVisible`

- Type: `[Number, Object]`
- Default: `null`

If `true`, the component gets hydrated when visible.
If custom configuration for Intersection Observer API is needed, an `Object` can be passed. The configuration needs to be defined according to [Official Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

### `on`

- Type: `[Boolean, Array, String]`
- Default: `null`

If `true`, the component gets hydrated on event 'focus'.
If you want to define custom events pass the event names as `String` or `Array` to hydrate the component when events are triggered.

### `hydration`

- Type: `Object`
- Default: `() => ({})`

The hydration prop controls **when / how the component will be hydrated** and can be assigned dynamically. The object passed:
- needs to have a property `type` as String (`'never'`, `'whenIdle'`, `'whenVisible'`, `'on'`)
- and optionally can have a property `options` to define further config as described in the above component props (e.g. if `type` is `whenIdle`, `options` could be used to set the max timeout to `7000`).

## NuxtDynamic

Use `NuxtDynamic` to **auto import any component** _dynamically_ which is registered by nuxt. If you want to ommit the hydration and load the component instantly (tho lazily / async), ommit any hydration prop such as `never`, `when-idle`, `when-visible` or `on`.

Some example of how to use the component:
```vue
<template>
  <NuxtDynamic is-component="Logo" />

  <NuxtDynamic is-component="Logo">
    <span>using the default slot as expected</span>
  </NuxtDynamic>

  <NuxtDynamic
    v-for="(componentName, i) in ['Logo', 'Grid', 'Nav']"
    :key="i"
    :is-component="componentName"
  />

  <!-- hydration -->
  <NuxtDynamic is-component="Logo" never />
  
  <NuxtDynamic is-component="Logo" when-idle />
  
  <NuxtDynamic is-component="Logo" :when-idle="4000" />
  
  <NuxtDynamic is-component="Logo" when-visible />
  
  <NuxtDynamic is-component="Logo" :when-visible="{
    rootMargin: '120px',
    threshold: 1.0
  }" />
  
  <NuxtDynamic is-component="Logo" on />
  
  <NuxtDynamic is-component="Logo" on="mouseover" />
  
  <NuxtDynamic is-component="Logo" :on="['mouseover', 'click']" />

  <NuxtDynamic is-component="Logo" :hydration="{
    type: 'whenVisible',
    options: {
      rootMargin: '120px',
      threshold: 1.0
    }
  }" />
</template>
```

## Credits

All the hydration magic is implemented with `vue3-lazy-hydration` thanks to [freddy38510](https://github.com/freddy38510/vue3-lazy-hydration).
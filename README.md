# @blokwise/dynamic

Read the official [docs](https://dynamic.blokwise.io)

## Installation

Add `@blokwise/dynamic` dependency to your project:

```bash
yarn add @blokwise/dynamic
```

```bash
npm install @blokwise/dynamic
```

Then, add `@blokwise/dynamic` to the `modules` section of `nuxt.config.js`:

```js[nuxt.config.js]
{
  modules: [
    '@blokwise/dynamic'
  ],
}
```

## Props

### `component`

- **Type**: `String`

The name of the component which should be imported.
If the component was initialized with a prefix in `@nuxt/components` config, it should be loaded as such. Nevertheless it is possible to **ommit the prefix to automatically detect the right component** _(if there are no conflincting names)_.

_**Heads up**: Starting with version `v1.4.0` the prop `component` replaces the deprecated prop `name`.
Passing the component name by using `name` still works through `$attrs.name` internally.
However, this workaround will be removed in the next major version (`v.2.0.0+`)._

### `hydration`

- **Type**: `String`
- **Default**: `'WhenIdle'`
- _Options_: `'WhenIdle'`, `'WhenVisible'`, `'OnInteraction'`, `'Never'`

The hydration prop controls **when / how the component will be hydrated**. The hydration is implemented with `vue-lazy-hydration` thanks to [Markus Oberlehner](https://github.com/maoberlehner/vue-lazy-hydration).

### `componentRef`

- **Type**: `String` or `Number`
- **Default**: `null`

The componentRef prop adds a reference to the child component.

## Usage

### Use dynamic component

The dynamic component will be loaded as `NuxtDynamic`. The component will be loaded whether you pass the name prefix or not. So in the following case it could load a component called `Logo` without prefix or a component called `BlokwiseLogo` which is prefixed with `Blokwise` according to `@nuxt/components` configuration of your project / third party libraries.

```vue
<template>
  <NuxtDynamic component="Logo" />
</template>
```

### Load the component lazily

The dynamic component can be loaded lazily as `LazyNuxtDynamic`.

```vue
<template>
  <LazyNuxtDynamic component="Logo" />
</template>
```

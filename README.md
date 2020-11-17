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

## Usage

### Use dynamic component

The dynamic component will be loaded as `NuxtDynamic`. The component will be loaded wheter you pass the name prefix or not. So in the following case it could load a component called `Logo` without prefix or a component called `BlokwiseLogo` which is prefixed with `Blokwise` according to `@nuxt/components` configuration of your project / third party libraries.

```vue
<template>
  <NuxtDynamic name="Logo" />
</template>
```

### Load the component lazily

The dynamic component can be loaded lazily as `LazyNuxtDynamic`.

```vue
<template>
  <LazyNuxtDynamic name="Logo" />
</template>
```

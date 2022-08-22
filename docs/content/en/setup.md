---
title: Setup
description: ""
position: 2
category: Guide
---

## Installation

Add `@blokwise/dynamic` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @blokwise/dynamic
```

  </code-block>
  <code-block label="NPM">

```bash
npm install @blokwise/dynamic
```

  </code-block>
</code-group>

Then, add `@blokwise/dynamic` to the `modules` section of `nuxt.config.js`:

```js[nuxt.config.js]
{
  modules: [
    '@blokwise/dynamic'
  ],
}
```

Use a different prefix for your `Dynamic` component if you like (default is `NuxtDynamic`). e.g. if you want to use the component as `HyperDynamic`:

```js[nuxt.config.js]
{
  modules: [
    '@blokwise/dynamic', {
      prefix: 'Hyper'
    }
  ],
}
```

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.

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

Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js.

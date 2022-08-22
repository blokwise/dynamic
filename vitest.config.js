import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    deps: {
      inline: ['@nuxt/test-utils-edge']
    },
    coverage: {
      include: ['src', 'dist'],
      reporter: ['text', 'json']
    }
  }
})

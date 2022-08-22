import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils-edge'

const playground = fileURLToPath(new URL('../../playground', import.meta.url))

await setup({
  rootDir: playground,
  server: true,
  browser: false
})

describe('Dynamic component with different name cases', () => {
  it('should render the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>index</h1>')
  }, 50000)

  it('should load component with name provided in PascalCase', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h2>PascalCase</h2>')
  }, 50000)

  it('should load component with name provided in snake_case', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h2>snake_case</h2>')
  }, 50000)

  it('should load component with name provided in kebab-case', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h2>kebab-case</h2>')
  }, 50000)

  it('should load component with name provided through component attribute', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h2>AwesomeFoo</h2>')
    expect(html).toContain('<h2>AwesomeBar</h2>')
  }, 50000)
})

describe('Slots of dynamic component', () => {
  it('should render the slots page', async () => {
    const html = await $fetch('/slots')
    expect(html).toContain('<h1>slots</h1>')
  }, 50000)

  it('should pass elements to default slot', async () => {
    const html = await $fetch('/slots')
    expect(html).toContain('<h2>ComponentB</h2>')
    expect(html).toContain('<span>passed through slot of ComponentB</span>')
  }, 50000)

  it('should pass elements to named slot and pass slotData', async () => {
    const html = await $fetch('/slots')
    expect(html).toContain('<h2>AwesomeBar</h2>')
    expect(html).toContain('additional content with slot data:')
    expect(html).toContain('tag: page')
    expect(html).toContain('tag: article')
  }, 50000)
})

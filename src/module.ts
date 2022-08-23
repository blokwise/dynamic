import { resolve } from 'path'
import { fileURLToPath } from 'url'
import consola from 'consola'
import { defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'

export interface ModuleOptions {
  withConsole: boolean,
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'blokwisedynamic'
  },
  defaults: {
    withConsole: false,
    prefix: 'nuxt'
  },

  setup (options, nuxt) {
    const logger = consola.withScope('@blokwise/dynamic')

    // transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // add blokwise dynamic components
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolve(runtimeDir, 'components'),
        prefix: options.prefix
      })
    })

    // Add blokwise dynamic composables
    nuxt.hook('autoImports:dirs', (dirs) => {
      dirs.push(resolve(runtimeDir, 'composables'))
    })

    if (options.withConsole) {
      nuxt.hook('components:extend', (components) => {
        logger.success({
          message: 'auto import for dynamic components ready',
          additional: `Module @blokwise/dynamic successfully registered.\nReady to auto import ${
            components.length
          } items as dynamic components lazily.\nRead docs: https://dynamic.blokwise.io`,
          badge: true
        })
      })
    }
  }
})

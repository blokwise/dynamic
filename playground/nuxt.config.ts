import { defineNuxtConfig } from 'nuxt'
import BlokwiseDynamic from '..'

export default defineNuxtConfig({
  typescript: {
    shim: false
  },

  modules: [
    BlokwiseDynamic
  ],

  blokwisedynamic: {
    withConsole: true
  }
})

import {
  hydrateNever,
  hydrateWhenIdle,
  hydrateWhenVisible,
  hydrateOnInteraction
} from 'vue3-lazy-hydration'
import { useDetectTypes } from './useDetectTypes'
import { defineAsyncComponent } from '#imports'

export const useHydrate = (
  hydration = { never: false, whenIdle: null, whenVisible: null, on: null }
) => {
  const { isNumber, isObject } = useDetectTypes()

  /* options can be:
   * empty to hydrate never - instantly load component (async)
   * `whenIdle` as `Boolean` or `Number` (with timeout in miliseconds) to hydrate when idle
   * `whenVisible` as `Boolean` or `Object` (with observer options) to hydrate when visible (see: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for observer options)
   * `on` as `Boolean``(for 'focus'), `String` (with event name) or `Array` (with event names) to hydrate on interaction
   * */
  const getHydrate = (hydration) => {
    if (hydration.never) {
      return component => hydrateNever(component)
    }
    if (hydration.whenIdle) {
      const defaultTimeout = 2000
      const timeout = isNumber(hydration.whenIdle)
        ? Number(hydration.whenIdle)
        : defaultTimeout
      return component => hydrateWhenIdle(component, timeout)
    }
    if (hydration.whenVisible) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      const observerOptions = {
        ...(isObject(hydration.whenVisible)
          ? { ...hydration.whenVisible }
          : {})
      }
      return component => hydrateWhenVisible(component, observerOptions)
    }
    if (hydration.on) {
      let events = ['focus']
      if (hydration.on !== true) {
        events = [].concat(hydration.on)
      }
      return component => hydrateOnInteraction(component, events)
    }
    return component => markRaw(defineAsyncComponent(component))
  }

  return {
    hydrate: getHydrate(hydration)
  }
}

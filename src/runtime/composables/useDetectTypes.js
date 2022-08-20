export const useDetectTypes = () => {
  const isNumber = (x) => {
    return typeof x !== 'boolean' && !isNaN(x)
  }

  const isObject = (x) => {
    return typeof x === 'object' && x !== null
  }

  return {
    isNumber,
    isObject
  }
}

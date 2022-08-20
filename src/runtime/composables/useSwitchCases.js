export const useSwitchCases = () => {
  const clearLodashAndUpper = (value) => {
    return value.replace(/_/, '').toUpperCase()
  }

  const clearHyphenAndUpper = (value) => {
    return value.replace(/-/, '').toUpperCase()
  }

  const toPascalCase = (value) => {
    // kebab-case
    value = value.replace(/(^\w|-\w)/g, clearHyphenAndUpper)
    // snake_case
    value = value.replace(/(^\w|_\w)/g, clearLodashAndUpper)
    return value
  }

  return {
    toPascalCase
  }
}

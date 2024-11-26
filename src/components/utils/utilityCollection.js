/**
 * Capitalises the first letter of a String
 * @param name string
 * @returns string with the Capital first letter
 */
export const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

// Helper
const stringIsNumber = (value) => isNaN(Number(value)) === false
/**
 * Turn enum into array
 * @param enumType the Enum, not 'typeof Enum': enumToArray(ECallType)
 * @returns string array with Enum names
 */
export const enumToArray = (enumType) => {
  return Object.keys(enumType)
    .filter(stringIsNumber)
    .map((key) => enumType[key])
}

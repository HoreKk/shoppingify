/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const useGroupBy = (arr: object[], criteria: string) => {
  return arr.reduce((acc: any, value) => {
    const key = value[criteria]
    if (!acc[key]) acc[key] = []
    acc[key].push(value)
    return acc
  }, {})
}

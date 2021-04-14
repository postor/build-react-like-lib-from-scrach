import { D } from "./d"

export const idIter = (function* () {
  let i = 0
  while (true) yield i++
})()

let REACT_LIKE_CUR_COMPONENT, REACT_LIKE_CUR_COMPONENT_STATEI
export const setREACT_LIKE_CUR_COMPONENT = x => REACT_LIKE_CUR_COMPONENT = x
/** @returns {D} */
export const getREACT_LIKE_CUR_COMPONENT = () => REACT_LIKE_CUR_COMPONENT
export const setREACT_LIKE_CUR_COMPONENT_STATEI = x => REACT_LIKE_CUR_COMPONENT_STATEI = x
/** @returns {number} */
export const getREACT_LIKE_CUR_COMPONENT_STATEI = () => REACT_LIKE_CUR_COMPONENT_STATEI

export function assignProps(el, props) {
  for (let k in props) {
    if (!el[k] || typeof props[k] != 'object') {
      el[k] = props[k]
      continue
    }
    assignProps(el[k], props[k])
  }
}

export function normalizeDArr(arr = []) {
  let arr1 = Array.isArray(arr) ? arr : [arr]
  return arr1.map(x => {
    if (x instanceof D) return x
    return new D(false, { children: x ? x : '' })
  })
}

export function checkPropChange(prev = {}, next = {}) {
  for (let k in prev) {
    if (prev[k] !== next[k]) return true
  }
  for (let k in next) {
    if (prev[k] !== next[k]) return true
  }
  return false
}
import { getREACT_LIKE_CUR_COMPONENT, getREACT_LIKE_CUR_COMPONENT_STATEI, setREACT_LIKE_CUR_COMPONENT_STATEI } from './utils'

export function useState(initalValue) {
  let d = getREACT_LIKE_CUR_COMPONENT()
  let i = getREACT_LIKE_CUR_COMPONENT_STATEI()
  if (d.states[i] === undefined) d.states[i] = initalValue
  let v = d.states[i]
  setREACT_LIKE_CUR_COMPONENT_STATEI(i + 1)

  return [v, v1 => {
    d.states[i] = v1
    d.updateState()
  }]
}
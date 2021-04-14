const EVENT_TYPES = ['click']

/**
 * 
 * @param {HTMLElement} el 
 */
export function listen(el) {
  return EVENT_TYPES.map(eventType => {
    let listener = e => {
      let key = 'on' + capitalize(eventType)
      bubble(e.target, e, key)
    }
    el.addEventListener(eventType, listener)
  })
}
/**
 * 
 * @param {HTMLElement} el 
 * @param {Event}
 */
function bubble(el, e, key) {
  if (!el) return
  if (el[key]) return el[key](e)
  bubble(el.parentElement, e, key)
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
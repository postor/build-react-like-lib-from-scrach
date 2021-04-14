import { assignProps, checkPropChange, idIter, normalizeDArr, setREACT_LIKE_CUR_COMPONENT, setREACT_LIKE_CUR_COMPONENT_STATEI, } from "./utils"

export class D {
  constructor(component, props = {}) {
    this.component = component
    this.props = props
    this.states = []
    this.id = idIter.next()
    /** @type {HTMLElement} */
    this.parent
    /** @type {HTMLElement} */
    this.el
    /** @type {D[]} */
    this.children = []
    this.stateChangeCount = 0
  }

  init(parent) {
    this.parent = parent
    if (!this.component) {
      // 文本 | text
      this.el = document.createTextNode(this.props.children)
    } else if (typeof this.component == 'string') {
      // 元素 | html element 
      this.el = document.createElement(this.component)
      let { children, ...rest } = this.props
      assignProps(this.el, rest)
      this.children = normalizeDArr(children)
    } else {
      // 组件 | component
      setREACT_LIKE_CUR_COMPONENT(this)
      setREACT_LIKE_CUR_COMPONENT_STATEI(0)
      this.children = normalizeDArr(this.component(this.props))
    }
    // 追加到 DOM 树 | append to DOM tree
    if (this.el) this.parent.append(this.el)
    // 递归初始化子组件/元素 | init children recursively
    this.children.forEach(x => x.init(this.el || this.parent))
  }

  updateState() {
    this.stateChangeCount++
    Promise.resolve().then(() => {
      if (!this.stateChangeCount) return
      this.stateChangeCount = 0
      if (this.el) {
        let { children, ...rest } = this.props
        assignProps(this.el, rest)
        if (!this.component) {
          return this.el.data = children
        }
      }
      let children = this.getChildren(this.props)
      if (children.length > this.children) {
        let leftover = this.children.slice(children.length)
        leftover.forEach(x => x.destory)
        this.children = this.children.slice(0, children.length)
      }

      for (let i = 0; i < Math.max(children.length, this.children.length); i++) {
        let c1 = this.children[i], c2 = children[i]
        if (c1) {
          if (c1.component === c2.component) {
            if (checkPropChange(c1.props, c2.props)) {
              c1.props = c2.props
              c1.updateState()
            }
            continue
          }
          c1.destory()
        }
        this.children[i] = c2
        c2.init(this.el || this.parent)
      }
    })
  }

  destory() {
    this.children.forEach(x => x.destory())
    this.el.remove()
  }

  getChildren(props) {
    if (!this.component) return []
    if (typeof this.component == 'string') return normalizeDArr(props.children)

    setREACT_LIKE_CUR_COMPONENT(this)
    setREACT_LIKE_CUR_COMPONENT_STATEI(0)
    return normalizeDArr(this.component(props))
  }
}
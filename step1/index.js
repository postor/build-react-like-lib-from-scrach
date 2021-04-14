import { D, render } from '../lib'

let el = document.createElement('div')
document.body.append(el)

render(el, new D('p', {
  children: [
    'hello world',
    new D('span', {
      children: '!',
      style: { color: 'red' }
    })
  ]
}))
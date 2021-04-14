import { D, render } from '../lib'
import App from './App'

let el = document.createElement('div')
document.body.append(el)

render(el, new D(App, {}))
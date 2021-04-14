import { D } from "./d";
import { listen } from "./event";

export function render(el, jsx = new D) {
  jsx.init(el)
  el.listeners = listen(el)
}
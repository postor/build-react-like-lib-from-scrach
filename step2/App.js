import { D, useState } from "../lib"

const App = () => {
  let [i, setI] = useState(0)
  let [str, setStr] = useState('hello counter!')
  return [
    str,
    new D('div', {
      children: [
        new D('button', {
          children: '-',
          onClick: () => setI(i - 1) || setStr('declining')
        }),
        i + '',
        new D('button', {
          children: '+',
          onClick: () => setI(i + 1) || setStr('increasing')
        })
      ]
    })
  ]
}

export default App
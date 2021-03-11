import {a} from './a.js' // 动态引入, 按需加载
import {JsxDemo} from './jsx-demo.jsx'  // 直接引入
import {TsxDemo} from './tsx-demo.tsx'  // 直接引入
import {x} from './ts-demo.ts'
const b = import ('./b')

console.log(x)
console.log(JsxDemo)
console.log(TsxDemo)

const hi = ()=>{
  console.log('QY')
  console.log(a)
  console.log(b)
  console.log(Promise.resolve('test promise')) // IE 不支持 ,需要添加 polyfill
}

hi()

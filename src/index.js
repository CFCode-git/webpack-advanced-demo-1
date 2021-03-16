import {a} from '@/a.js'
import {JsxDemo} from './jsx-demo.jsx'
import {TsxDemo} from './tsx-demo.tsx'
import {x} from './ts-demo.ts'
import '@/scss-demo.scss'
import vars from '@/./less-vars.less'
import '@/less-demo.less'
const b = import ('./b') // 动态引入, 按需加载
console.log(vars)

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

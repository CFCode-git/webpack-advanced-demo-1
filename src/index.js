import {a} from '@/a.js'
import {JsxDemo} from './jsx-demo.jsx'
import {TsxDemo} from './tsx-demo.tsx'
import {x} from './ts-demo.ts'
import '@/scss-demo.scss'
import vars from '@/stylus-vars.styl'
import '@/less-demo.less'
import '@/stylus-demo.styl'
import React from 'react'
import {shared} from '@/shared.js'

console.log(shared)

const b = import ('./b') // 动态引入, 按需加载
console.log(11,vars)
console.log(React)

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

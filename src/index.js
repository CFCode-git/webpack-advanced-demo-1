import {a} from './a.js'  // 直接引入
const b = import ('./b') // 动态引入, 按需加载

const hi = ()=>{
  console.log('QY')
  console.log(a)
  console.log(b)
  console.log(Promise.resolve('test promise')) // IE 不支持 ,需要添加 polyfill
}

hi()

import { observe } from './observe/index'

export function initState (vm) {
  const opts = vm.$options
  
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethod(vm)
  }
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initProps (vm) {

}
function initMethod (vm) {

}
function initData (vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  // 对象劫持
  // mvvm模式 数据变化可以驱动视图变化
  observe(data) // 响应式原理
}
function initComputed (vm) {

}
function initWatch (vm) {

}
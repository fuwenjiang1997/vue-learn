import { initState } from './state'

// 在原型上添加一个init方法
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this
    vm.$options = options // 传递的属性

    // 初始化状态
    initState(vm)
  }
}
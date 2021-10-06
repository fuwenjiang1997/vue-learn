import { initState } from './state'
import { compileToFunction } from './compiler/index.js'

// 在原型上添加一个init方法
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    // 数据劫持
    const vm = this
    vm.$options = options // 传递的属性

    // 初始化状态
    initState(vm)

    // 如果传入了el就要将el渲染出来
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    // render方法 -> template -> el中的内容
    const vm = this
    const options = this.$options
    el = document.querySelector(el)
    if (!options.render) {
      // 对模板进行编译
      let template = options.template
      if (!template && el) {
        template = el.outerHTML
      }
      // 将template转换为render方法
      const render = compileToFunction(template)
      options.render = render
    }
  }
}
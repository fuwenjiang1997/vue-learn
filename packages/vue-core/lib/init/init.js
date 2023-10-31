import { initState } from './state'
import { compileToFunction } from '../compiler/index'
import { mountComponent } from './lifecycle'

export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this
    vm.$options = options
    initState(vm)

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = this.$options
    el = document.querySelector(el)
    vm.$el = el
    // render函数不存在的情况下对模版进行编译
    if (!options.render) {
      let template = options.template
      if(!template && el) {
        template = el.outerHTML
      }
      const render = compileToFunction(template)
      options.render = render
    }

    // 挂载
    mountComponent(vm, el)
  }
}

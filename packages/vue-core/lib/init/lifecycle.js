import patch from '../vdom/patch';
import Watcher from '../observe/watcher'

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function(vnode){
    const vm = this
    vm.$el = patch(vm.$el, vnode)
  }
}

export function mountComponent(vm, el) {
  const updateComponent = function() {
    vm._update(vm._render())
  }
  new Watcher(vm, updateComponent, () => {
    console.log('回调');
  }, true) // true, 是渲染函数
}
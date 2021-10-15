export function renderMixin(Vue) {
  Vue.prototype._c = function () { // 创建元素，创建的是虚拟dom
    return createElement(...arguments)
  }
  Vue.prototype._s = function (val) { // stringify
    return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val
  }
  Vue.prototype._v = function (text) { // 创建虚拟文本元素dom
    return createTextVnode(text)
  }

  Vue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    let vnode = render.call(vm)
    return vnode
  }
}

function createElement(tag, data = {}, ...children) {
  console.log('参数', arguments);
  return vnode(tag, data, data.key, children)
}

function createTextVnode(text) {
  console.log('文本：', text);
  return vnode(undefined, undefined, undefined, undefined, text)
}
// 生成虚拟dom
function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text
  }
}
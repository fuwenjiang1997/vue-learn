import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './vdom/index'

function Vue(options) {
  // 将初始化拆分开，细化
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue) // 渲染
renderMixin(Vue)

export default Vue
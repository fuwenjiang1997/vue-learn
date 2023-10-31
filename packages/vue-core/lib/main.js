import { initMixin, renderMixin, lifecycleMixin } from './init'

function Vue(options) {
  this._init(options)
}

initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
import { initMixin } from './init'

function Vue (options) {
  // 将初始化拆分开，细化
  this._init(options)
}

initMixin(Vue)

export default Vue
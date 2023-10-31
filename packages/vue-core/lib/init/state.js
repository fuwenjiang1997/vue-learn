import { proxy } from '../util/index'
import { observe } from '../observe'

export function initState (vm) {
  const opts = vm.$options

  if (opts.props) {
    initProps(vm)
  }
  if (opts.data) {
    initData(vm)
  }
}

function initProps() {}

function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  for (const key in data) {
    proxy(vm, '_data', key)
  }

  observe(data)
}
import { isObject, def } from '../util/index'
import { arrayMethods } from './array'

class Observe {
  constructor (value) {
    def(value, '__ob__', this)
    if (Array.isArray(value)) { // 数组不对索引进行操作，否则性能有问题
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk (data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }

  observeArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}

function defineReactive (data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    configurable: false, // 是否可被删除
    enumerable: false, // 是否可被遍历
    get () {
      return value
    },
    set (newValue) {
      if (value === newValue) {
        return
      }
      observe(newValue)
      value = newValue
    }
  })
}

export function observe (data) {
  if (!isObject(data)) {
    return
  }

  return new Observe(data)
}
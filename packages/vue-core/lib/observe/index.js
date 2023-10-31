import { isObject, def } from '../util'
import Dep from './dep'

class Observe {
  constructor(value) {
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk(data) {
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

function defineReactive(data, key, value) {
  observe(value)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    configurable: false, // 是否可被删除
    enumerable: false, // 是否可被遍历
    get() {
      console.log('getValue', value, Dep.target);
      if (Dep.target) {
        dep.depend()
      }
      return value
    },
    set(newValue) {
      console.log('set newValue', value, newValue);
      if (value !== newValue) {
        observe(newValue)
        value = newValue
        dep.notify()
      }
    }
  })
}

export function observe(data) {
  if (!isObject(data)) {
    return
  }
  return new Observe(data)
}
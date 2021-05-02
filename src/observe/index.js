import { isObject } from '../util/index'

class Observe {
  constructor (value) {
    this.walk(value)
  }

  walk (data) {
    let keys = Object.keys(data)
    keys.forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive (data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
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
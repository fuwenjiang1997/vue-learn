const oldArrayMethods = Array.prototype
export let arrayMethods = Object.create(oldArrayMethods)

const reWriteArrMethods = ['push', 'pop', 'shift', 'unshit', 'reverse', 'sort', 'splice']
rewriteArrMethods.forEach(methodName => {
  arrayMethods[methodName] = function (...args) {
    oldArrayMethods[methodName].apply(this,...args)

    let inserted
    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice': // 删除、修改、新增
        inserted = args.slice(2); // splice(0,1, {name: 1})，拿到{name: 1}
        break;
      default:
        break;
    }
    if (inserted) {
      this.__ob__.observeArray(inserted)
    }
  }
})

export function arrayMethods() {

}
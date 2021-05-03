const oldArrayMethods = Array.prototype

export let arrayMethods = Object.create(oldArrayMethods)

const rewriteArrMethods = ['push', 'pop', 'shift', 'unshit', 'reverse', 'sort', 'splice']
rewriteArrMethods.forEach(method => {
  arrayMethods[method] = function (...args) {
    oldArrayMethods[method].apply(this, args)

    let inserted 
    switch (method) {
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
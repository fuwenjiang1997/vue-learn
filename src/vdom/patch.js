export default function patch(oldVnode, vnode) {
  // 将虚拟节点转为真实节点

  let el = createElm(vnode)
  console.log(el);
  const parentElm = oldVnode.parentNode
  parentElm.insertBefore(el, oldVnode.nextSibling) // 插入新dom
  parentElm.removeChild(oldVnode) // 删除旧的dom
}

function createElm(vnode) {
  const { tag, data, key, children, text } = vnode
  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  console.log(vnode);

  return vnode.el
}
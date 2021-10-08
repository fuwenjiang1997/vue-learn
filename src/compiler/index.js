import { parseHTML } from './parse-html'

// 将字符串模板转为render方法，生成ast语法书
// ast语法书：用对象来描述原生语法
// 虚拟dom： 用对象来描述dom节点
export function compileToFunction (template) {
  let root = parseHTML(template);
  return function render () {
    
  }
}
// // ast语法书
// <div id="app">
//   <p>hello</p>
// </div>
// let root = {
//   tag: 'div',
//   attrs: [{name: 'id', value: 'app'}],
//   parent: null,
//   children: [
//     {
//       tag: 'p',
//       attrs: [],
//       parent: root,
//       type: 1, // 元素
//       children: [
//         {
//           text: 'hello',
//           type: 3  // 文本
//         }
//       ]
//     }
//   ]
// }

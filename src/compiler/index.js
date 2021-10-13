import { generate } from './generate';
import { parseHTML } from './parse-html'

// 将字符串模板转为render方法，生成ast语法书
// ast语法书：用对象来描述原生语法
// 虚拟dom： 用对象来描述dom节点
export function compileToFunction (template) {
  let root = parseHTML(template);
  // console.log('生成的ast语法-->', root);
  // 将ast语法书变成render函数
  // <div class="wrapper" id="div"><p>hello {{ name }}</p> !</div>
  // 1、tag name 2、属性  3+、子节点
  // _c('div', { class: ['wrapper'], id: 'div }, _c('p', undefined, _v('hello' + _s(name))), _v('!')) 
  
  const code = generate(root) // render
  const render = new Function(`with(this){${code}}`)
  return render
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

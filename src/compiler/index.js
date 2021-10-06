const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*' // 匹配命名空间
const qnameCapture = `((?:${ncname}\\:)?(${ncname}))`  // <aaa:bbb>
const startTagOpen = new RegExp(`^<${ncname}`) // 匹配捕获 开始标签名
const endTag = new RegExp(`^<\\/${ncname}>`)  // 匹配捕获 结束标签名

//匹配例子    id    =   "df" 或  id  =  'df' 或  class=df
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"])*"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性
// console.log(`id="id123"`.match(attribute))

const startTagClose = /^\s*(\/?)>/  // 匹配标签结束的  <div >的>，可以是<input />这种自闭合
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// 将字符串模板转为render方法，生成ast语法书
// ast语法书：用对象来描述原生语法
// 虚拟dom： 用对象来描述dom节点
export function compileToFunction (template) {
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

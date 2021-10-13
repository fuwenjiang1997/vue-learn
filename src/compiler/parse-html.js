const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*' // 匹配命名空间
const qnameCapture = `(?:${ncname}\\:)?(${ncname})`  // <aaa:bbb>
const startTagOpen = new RegExp(`^<${qnameCapture}`) // 匹配捕获 开始标签名
const endTag = new RegExp(`^<\\/${qnameCapture}>`)  // 匹配捕获 结束标签名

//匹配例子    id    =   "df" 或  id  =  'df' 或  class=df
// https://github.com/vuejs/vue/blob/dev/src/compiler/parser/html-parser.js
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 匹配属性
// console.log(`id="id123"`.match(attribute))

const startTagClose = /^\s*(\/?)>/  // 匹配标签结束的  <div >的>，可以是<input />这种自闭合
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

let root = null    // 树根
let currentParent  // 保存当前节点的父节点的
let tagStack = []   // 标签栈，当遇到结束标签时，将开始标签出栈
const ELEMENT_TYPE = 1
const TEXT_TYPE = 3

export function parseHTML(html) {
  while(html) {
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      // 如果为0，肯定是个标签
      let startTagMatch = parseStartTag() // 通过这个方法获取到匹配的结果 tagNam,attrs
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)  // 1.解析开始标签
        continue
      }
      let endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])  // 2.解析结束标签
        continue
      }
    }
    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd) // 截取掉    <p>111</p></div>前的空格
    }
    if(text) {
      advance(text.length)
      chars(text)  // 3.解析文本
    }
    // break;
  }

  // 
  function advance(n) {
    html = html.substring(n)
  }
  function parseStartTag() {
    let start = html.match(startTagOpen)
    console.log(start);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      let end, attr;
      attr = html.match(attribute)
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length)
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5] // "", '', 没有单双引号的情况
        })
      }
      // 是>开头的话，去掉>
      if (end) {
        advance(end[0].length)
        return match
      }
    }
    
  }

  return root
}

function start(tagName, attrs) {
  // 遇到开始标签，创建一个ast
  let element = createASTElement(tagName, attrs)
  if(!root) {
    root = element
  }
  currentParent = element  // 把当前元素标记成父元素
  tagStack.push(element)   // 开始标签入栈
}
function end(tagName) {
  if (tagName === tagStack[tagStack.length - 1].tag) {
    let element = tagStack.pop()
    // 标识当前这是结束标签是当前节点 子节点的结束标签
    currentParent = tagStack[tagStack.length - 1]
    if (currentParent) {
      element.parent = currentParent
      currentParent.children.push(element)
    }
  }
  // console.log(root);
}
function chars(text) {
  text = text.replace(/\s/g, '')
  if (text) {
    currentParent.children.push({
      text,
      type: TEXT_TYPE
    })
  }
}
function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null
  }
}

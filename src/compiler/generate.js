const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export function generate(ast) {
  const children = genChildren(ast)
  // console.log(ast);
  let code = `_c('${ast.tag}', ${
    ast.attrs.length ? `{${genProps(ast.attrs)}}` : 'undefined'
  }${
    ast.children ? `,${children}`: ''
  })`
  // 将字符串转为函数
  // console.log(code, render);
  return code
}

function genChildren(ast) {
  const children = ast.children
  if (children) {
    return children.map(child => gen(child)).join(',')
  }
}

function genProps(attrs) {
  let str = ''
  for(let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {}
      attr.value.split(';').forEach(item => {
        const [key, value] = item.split(':')
        obj[key] = value
      })
      attr.value = obj
      // str += `${attr.name}:${JSON.stringify(obj)},`
      // continue
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return str.slice(0,-1)
}

function gen(ast) {
  if (ast.type === 1) {
    return generate(ast)
  } else {
    let text = ast.text
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(ast.text)})`
    }

    let tokens = [] // 保存每一段text
    let lastIndex = defaultTagRE.lastIndex = 0  // 如果正则是全局模式，每次使用前要置为0
    let match
    while (match = defaultTagRE.exec(text)) {
      let index = match.index // 保存索引
      if(index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      tokens.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${tokens.join(' + ')})`
  }
}
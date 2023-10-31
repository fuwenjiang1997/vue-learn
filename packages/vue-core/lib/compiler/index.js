import { generate } from './generate';
import { parseHTML } from './parse-html'

export function compileToFunction(template) {
  let root = parseHTML(template)
  const code = generate(root) // render
  const vnodeRender = new Function(`with(this){return ${code}}`)
  return vnodeRender
}
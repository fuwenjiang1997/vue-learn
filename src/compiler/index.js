const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*'
const qnameCapture = `((?:${ncname}\\:)?(${ncname}))`
const startTagOpen = new RegExp(`^<${ncname}`)

export function compileToFunction (template) {
  return function render () {
    
  }
}
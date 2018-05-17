import prepend from './prepend'

let head

function injectStyle(css) {
  head = head || document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')
  style.type = 'text/css'
  /* istanbul ignore if */
  if (style.styleSheet) {
    style.styleSheet.cssText = css // for IE8 and below
  } else {
    style.appendChild(document.createTextNode(css))
  }
  prepend(head, style)
}

export function injectClassFontStyle(klass) {
  injectStyle(`.${klass}{font-size:1em;}`)
}

export function injectSVGFontStyle(klass) {
  injectStyle(`.${klass}{display:inline-block;width:1em;height:1em;fill:currentColor;vertical-align:-0.11em;font-size:1em;}`)
}

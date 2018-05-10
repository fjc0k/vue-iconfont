function injectStyle(style) {
  document.write(`<style>${style}</style>`)
}

export function injectClassFontStyle(klass) {
  injectStyle(`.${klass}{font-size:1em;}`)
}

export function injectSVGFontStyle(klass) {
  injectStyle(`.${klass}{display:inline-block;width:1em;height:1em;fill:currentColor;vertical-align:-0.11em;font-size:1em;}`)
}

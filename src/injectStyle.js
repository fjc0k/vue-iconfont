function injectStyle(style) {
  document.write(`<style>${style}</style>`)
}

export function injectClassFontStyle(klass, fontFamily) {
  injectStyle(`.${klass}{font-family:"${fontFamily}"!important;font-size:1em;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}`)
}

export function injectSVGFontStyle(klass) {
  injectStyle(`.${klass}{display:inline-block;width:1em;height:1em;fill:currentColor;vertical-align:-0.11em;font-size:1em;}`)
}

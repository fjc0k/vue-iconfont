import extendData from './extendData'
import { injectSVGFontStyle, injectClassFontStyle } from './injectStyle'
import { FONT_ICON, SVG_ICON, FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from './constant'

let classFontStyleInjected = Object.create(null)
let svgFontStyleInjected = false

export default ({
  prefix: defaultPrefix = 'icon',
  type: defaultType = FONT_ICON
} = {}) => ({
  name: 'Icon',

  functional: true,

  props: {
    name: String,
    prefix: {
      type: String,
      default: defaultPrefix
    },
    type: {
      type: String,
      default: defaultType,
      validator: type => [FONT_ICON, SVG_ICON].indexOf(type) >= 0
    }
  },

  render(h, { parent, data, props: { name, prefix, type } }) {
    if (!name) return null

    // font-class 引用
    if (type === FONT_ICON) {
      const classFontClass = `${FONT_ICON_CLASSNAME}${prefix}`

      // 插入 font-class 的样式
      if (!classFontStyleInjected[prefix]) {
        classFontStyleInjected[prefix] = true
        if (parent._isMounted) {
          injectClassFontStyle(classFontClass, prefix)
        } else {
          parent.$once('hook:mounted', () => {
            injectClassFontStyle(classFontClass, prefix)
          })
        }
      }

      return h(
        'i',
        extendData(data, {
          staticClass: `${classFontClass} ${prefix} ${prefix}-${name}`
        })
      )
    }

    // 插入 SVG 字体的样式
    if (!svgFontStyleInjected) {
      svgFontStyleInjected = true
      if (parent._isMounted) {
        injectSVGFontStyle(SVG_ICON_CLASSNAME)
      } else {
        parent.$once('hook:mounted', () => {
          injectSVGFontStyle(SVG_ICON_CLASSNAME)
        })
      }
    }

    // symbol 引用
    return h('svg', extendData(data, {
      staticClass: SVG_ICON_CLASSNAME,
      attrs: {
        'aria-hidden': true
      }
    }), [
      h('use', {
        attrs: {
          'xlink:href': `#${prefix}-${name}`
        }
      })
    ])
  },

  FONT_ICON,

  SVG_ICON
})

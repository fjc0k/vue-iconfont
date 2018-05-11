import extendData from './extendData'
import { injectSVGFontStyle, injectClassFontStyle } from './injectStyle'
import { FONT_ICON, SVG_ICON, FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from './constant'

let fontIconStyleInjected = false
let svgIconStyleInjected = false

export default ({
  prefix: defaultPrefix = 'icon',
  family: defaultFamily,
  type: defaultType = FONT_ICON
} = {}) => ({
  name: 'Icon',

  functional: true,

  props: {
    name: String,
    family: {
      type: String,
      default: defaultFamily
    },
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

  render(h, { parent, data, props: { name, prefix, family = prefix, type }, children }) {
    // font-class 引用
    if (type === FONT_ICON) {
      // 插入 font-class 的样式
      if (!fontIconStyleInjected) {
        fontIconStyleInjected = true

        /* istanbul ignore if */
        if (parent._isMounted) {
          injectClassFontStyle(FONT_ICON_CLASSNAME)
        } else {
          parent.$once('hook:mounted', () => {
            injectClassFontStyle(FONT_ICON_CLASSNAME)
          })
        }
      }

      return h(
        'i',
        extendData(data, {
          staticClass: (
            `${FONT_ICON_CLASSNAME} ${family}` +
            (name ? ` ${prefix ? prefix + '-' : ''}${name}` : '')
          )
        }),
        children
      )
    }

    // 插入 SVG 字体的样式
    if (!svgIconStyleInjected) {
      svgIconStyleInjected = true

      /* istanbul ignore if */
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
  }
})

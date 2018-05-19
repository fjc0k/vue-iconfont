import extendData from 'vue-merge-data'
import loadSVGSprite from './loadSVGSprite'
import { injectSVGFontStyle, injectClassFontStyle } from './injectStyle'
import { FONT_ICON, SVG_ICON, FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from './constant'

let fontIconStyleInjected = false
let svgIconStyleInjected = false
let svgSpriteInjected = Object.create(null)

const parentMounted = (parent, callback) => {
  /* istanbul ignore if */
  if (parent._isMounted) {
    callback()
  } else {
    parent.$once('hook:mounted', callback)
  }
}

export default ({
  prefix = '',
  family = prefix,
  type = SVG_ICON,
  sprite,
  component: {
    name: componentName = 'Icon',
    props: extraProps = {},
    beforeRender,
    ...componentOptions
  } = {}
} = {}) => ({
  ...componentOptions,

  name: componentName,

  functional: true,

  props: {
    ...extraProps,
    name: String
  },

  render(h, ctx) {
    if (typeof beforeRender === 'function') {
      const _h = beforeRender(h, ctx)
      if (typeof _h === 'function') {
        h = _h
      }
    }

    const { parent, data, props: { name }, children } = ctx

    const fullName = name ? `${prefix ? prefix + '-' : ''}${name}` : ''

    // font-class 引用
    if (type === FONT_ICON) {
      // 插入 font-class 的样式
      if (!fontIconStyleInjected) {
        fontIconStyleInjected = true
        parentMounted(parent, () => {
          injectClassFontStyle(FONT_ICON_CLASSNAME)
        })
      }

      return h(
        'i',
        extendData(data, {
          staticClass: (
            `${FONT_ICON_CLASSNAME}` +
            (family ? ` ${family}` : '') +
            (fullName ? ` ${fullName}` : '')
          )
        }),
        children
      )
    }

    // 插入 SVG 字体的样式
    if (!svgIconStyleInjected) {
      svgIconStyleInjected = true
      parentMounted(parent, () => {
        injectSVGFontStyle(SVG_ICON_CLASSNAME)
      })
    }

    // 插入 SVG Sprite
    if (sprite && !(sprite in svgSpriteInjected)) {
      svgSpriteInjected[sprite] = true
      parentMounted(parent, () => {
        loadSVGSprite(sprite)
      })
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
          'xlink:href': `#${fullName}`
        }
      })
    ])
  }
})

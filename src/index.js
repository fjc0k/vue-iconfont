export default {
  name: 'Icon',

  functional: true,

  props: {
    name: String,
    family: {
      type: String,
      default: 'iconfont'
    },
    prefix: {
      type: String,
      default: 'icon'
    }
  },

  render(h, { data, props: { name, family, prefix }, children }) {
    const nameIsValid = Boolean(name)
    const isSVGType = nameIsValid && name[0] === '$'
    const isClassType = nameIsValid && !isSVGType
    const isUnicodeType = !nameIsValid && Boolean(children)
    const isNullType = !nameIsValid && !isUnicodeType

    if (isNullType) return null

    // unicode 引用
    if (isUnicodeType) {
      return h(
        'i',
        extendData(data, {
          staticClass: family
        }),
        children
      )
    }

    name = isClassType ? name : name.substr(1)

    // font-class 引用
    if (isClassType) {
      return h(
        'i',
        extendData(data, {
          staticClass: `${family} ${prefix}-${name}`
        })
      )
    }

    // symbol 引用
    return h('svg', extendData(data, {
      attrs: {
        'aria-hidden': true
      },
      domProps: {
        innerHTML: `<use xlink:href="#${prefix}-${name}"></use>`
      }
    }))
  }
}

function extendData(data, source) {
  const { staticClass, attrs } = data
  const { staticClass: _staticClass, attrs: _attrs } = source

  if (_staticClass) {
    data.staticClass = (staticClass ? `${staticClass} ` : '') + _staticClass
  }

  if (_attrs) {
    Object.keys(_attrs).forEach(key => {
      data.attrs[key] = attrs[key] || _attrs[key]
    })
  }

  return data
}

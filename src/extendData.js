export default (data, source) => {
  const { staticClass, attrs } = data
  const { staticClass: _staticClass, attrs: _attrs } = source

  data.staticClass = _staticClass + (staticClass ? ` ${staticClass}` : '')

  if (_attrs) {
    Object.keys(_attrs).forEach(key => {
      data.attrs[key] = attrs[key] || _attrs[key]
    })
  }

  return data
}

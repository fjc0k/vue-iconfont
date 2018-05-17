import prepend from './prepend'

export default SVGSprite => {
  const wrapper = document.createElement('div')

  wrapper.style.position = 'absolute'
  wrapper.style.width = 0
  wrapper.style.height = 0
  wrapper.style.overflow = 'hidden'
  wrapper.style.display = 'none'

  wrapper.innerHTML = SVGSprite

  prepend(document.body, wrapper)
}

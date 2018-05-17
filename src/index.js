import getIcon from './getIcon'

getIcon.install = (Vue, options) => {
  /* istanbul ignore if */
  if (!options || typeof options !== 'object') {
    options = {}
  }

  if (!Array.isArray(options)) options = [options]

  options.forEach($options => {
    const Icon = getIcon($options)
    Vue.component(
      $options.tag || Icon.name,
      Icon
    )
  })
}

export default getIcon


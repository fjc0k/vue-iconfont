import getIcon from './getIcon'

const Icon = getIcon()

Icon.install = (Vue, options) => {
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

Icon.getIcon = getIcon

export default Icon


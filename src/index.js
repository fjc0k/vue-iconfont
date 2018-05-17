import getIcon from './getIcon'

const Icon = getIcon()

Icon.install = (Vue, options) => {
  if (!options || typeof options !== 'object') {
    options = {}
  }

  if (!Array.isArray(options)) options = [options]

  options.forEach($options => {
    const IconComponent = getIcon($options)
    Vue.component(
      $options.tag || Icon.name,
      IconComponent
    )
  })
}

Icon.getIcon = getIcon

export default Icon


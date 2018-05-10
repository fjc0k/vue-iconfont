import getIcon from './getIcon'
import { ICON_COMPONENTS_REGISTER } from './constant'

const Icon = getIcon()

Icon.install = (Vue, options) => {
  if (!options || typeof options !== 'object') {
    options = {}
  }

  if (!Array.isArray(options)) options = [options]

  options.forEach($options => {
    if (!Vue[ICON_COMPONENTS_REGISTER]) {
      Vue[ICON_COMPONENTS_REGISTER] = Object.create(null)
    }

    const key = `${$options.tag}/${$options.type}/${$options.prefix}`

    if (key in Vue[ICON_COMPONENTS_REGISTER]) return

    Vue[ICON_COMPONENTS_REGISTER][key] = true

    const Icon = getIcon($options)

    Vue.component(
      $options.tag || Icon.name,
      Icon
    )
  })
}

export default Icon

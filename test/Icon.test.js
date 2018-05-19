import { mount } from '@vue/test-utils'
import getIcon from '../src'
import { FONT_ICON_CLASSNAME, SVG_ICON_CLASSNAME } from '../src/constant'

const sprite = `
<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden;">
  <symbol id="arrow-forward" viewBox="0 0 1024 1024">
    <path d="M588.2 512L334 258c-18.8-18.8-18.8-49.2 0-67.8s49.2-18.6 68 0L690 478c18.2 18.2 18.6 47.4 1.4 66.2L402.2 834c-9.4 9.4-21.8 14-34 14s-24.6-4.6-34-14c-18.8-18.8-18.8-49.2 0-67.8l254-254.2z"></path>
  </symbol>
</svg>
`

const assertHTML = (template, html) => expect(
  mount({ template }, {
    components: {
      Icon: getIcon({
        type: 'font'
      }),
      SizedIcon: getIcon({
        type: 'font',
        component: {
          props: {
            size: String
          },
          beforeRender(h, { data, props: { size } }) {
            data.class = {
              ...data.class,
              [size]: true
            }
          }
        }
      }),
      FaIcon: getIcon({
        type: 'font',
        prefix: 'fa'
      }),
      FabIcon: getIcon({
        type: 'font',
        prefix: 'fa',
        family: 'fab'
      }),
      SvgIcon: getIcon({
        type: 'svg'
      }),
      FaSvgIcon: getIcon({
        type: 'svg',
        prefix: 'fa'
      }),
      CustomSvgIcon: getIcon({
        type: 'svg',
        sprite: sprite
      })
    }
  }).html()
).toBe(html)

test('正确渲染 Font Icons', () => {
  assertHTML(
    '<Icon name="ok" />',
    `<i class="${FONT_ICON_CLASSNAME} ok"></i>`
  )
  assertHTML(
    '<SizedIcon name="ok" size="small" />',
    `<i class="${FONT_ICON_CLASSNAME} ok small"></i>`
  )
  assertHTML(
    '<FaIcon name="ok" />',
    `<i class="${FONT_ICON_CLASSNAME} fa fa-ok"></i>`
  )
  assertHTML(
    '<FabIcon name="github" />',
    `<i class="${FONT_ICON_CLASSNAME} fab fa-github"></i>`
  )
})

test('正确渲染 SVG Icons', () => {
  assertHTML(
    '<SvgIcon name="ok" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#ok"></use></svg>`
  )
  assertHTML(
    '<FaSvgIcon name="ok" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#fa-ok"></use></svg>`
  )
})

test('正确设置 sprite', () => {
  assertHTML(
    '<CustomSvgIcon name="ok" />',
    `<svg aria-hidden="true" class="${SVG_ICON_CLASSNAME}"><use xlink:href="#ok"></use></svg>`
  )
  expect(document.body.firstChild.innerHTML).toBe(sprite)
})

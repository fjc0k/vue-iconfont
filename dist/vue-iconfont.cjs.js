/*!
 * vue-iconfont v2.4.0
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var extendData = _interopDefault(require('vue-merge-data'));

function injectStyle(style) {
  document.write("<style>" + style + "</style>");
}

function injectClassFontStyle(klass) {
  injectStyle("." + klass + "{font-size:1em;}");
}
function injectSVGFontStyle(klass) {
  injectStyle("." + klass + "{display:inline-block;width:1em;height:1em;fill:currentColor;vertical-align:-0.11em;font-size:1em;}");
}

var FONT_ICON = 'font';
var SVG_ICON = 'svg';
var FONT_ICON_CLASSNAME = '__font_icon__';
var SVG_ICON_CLASSNAME = '__svg_icon__';

var fontIconStyleInjected = false;
var svgIconStyleInjected = false;
var getIcon = (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$prefix = _ref.prefix,
      defaultPrefix = _ref$prefix === void 0 ? 'icon' : _ref$prefix,
      defaultFamily = _ref.family,
      _ref$type = _ref.type,
      defaultType = _ref$type === void 0 ? FONT_ICON : _ref$type,
      _ref$name = _ref.name,
      defaultName = _ref$name === void 0 ? 'Icon' : _ref$name,
      _ref$data = _ref.data,
      extraData = _ref$data === void 0 ? {} : _ref$data;

  return {
    name: defaultName,
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
        validator: function validator(type) {
          return [FONT_ICON, SVG_ICON].indexOf(type) >= 0;
        }
      }
    },
    render: function render(h, _ref2) {
      var parent = _ref2.parent,
          data = _ref2.data,
          _ref2$props = _ref2.props,
          name = _ref2$props.name,
          prefix = _ref2$props.prefix,
          _ref2$props$family = _ref2$props.family,
          family = _ref2$props$family === void 0 ? prefix : _ref2$props$family,
          type = _ref2$props.type,
          children = _ref2.children;

      // font-class 引用
      if (type === FONT_ICON) {
        // 插入 font-class 的样式
        if (!fontIconStyleInjected) {
          fontIconStyleInjected = true;
          /* istanbul ignore if */

          if (parent._isMounted) {
            injectClassFontStyle(FONT_ICON_CLASSNAME);
          } else {
            parent.$once('hook:mounted', function () {
              injectClassFontStyle(FONT_ICON_CLASSNAME);
            });
          }
        }

        return h('i', extendData(data, extraData, {
          staticClass: FONT_ICON_CLASSNAME + " " + family + (name ? " " + (prefix ? prefix + '-' : '') + name : '')
        }), children);
      } // 插入 SVG 字体的样式


      if (!svgIconStyleInjected) {
        svgIconStyleInjected = true;
        /* istanbul ignore if */

        if (parent._isMounted) {
          injectSVGFontStyle(SVG_ICON_CLASSNAME);
        } else {
          parent.$once('hook:mounted', function () {
            injectSVGFontStyle(SVG_ICON_CLASSNAME);
          });
        }
      } // symbol 引用


      return h('svg', extendData(data, extraData, {
        staticClass: SVG_ICON_CLASSNAME,
        attrs: {
          'aria-hidden': true
        }
      }), [h('use', {
        attrs: {
          'xlink:href': "#" + prefix + "-" + name
        }
      })]);
    }
  };
});

var Icon = getIcon();

Icon.install = function (Vue, options) {
  if (!options || typeof options !== 'object') {
    options = {};
  }

  if (!Array.isArray(options)) options = [options];
  options.forEach(function ($options) {
    var IconComponent = getIcon($options);
    Vue.component($options.tag || Icon.name, IconComponent);
  });
};

Icon.getIcon = getIcon;

module.exports = Icon;

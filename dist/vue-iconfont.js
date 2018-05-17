/*!
 * vue-iconfont v2.4.0
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueIconfont = factory());
}(this, (function () { 'use strict';

  /*!
   * vue-merge-data v0.2.0
   * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
   * Released under the MIT License.
   */
  /* eslint guard-for-in: 0, no-case-declarations: 0, max-depth: 0 */
  var assign = function assign(target, source, handler) {
    var sourceKeys = Object.keys(source);

    for (var index in sourceKeys) {
      var sourceKey = sourceKeys[index];

      if (source[sourceKey] != null) {
        // eslint-disable-line
        if (handler) {
          handler(sourceKey, target, source);
        } else {
          target[sourceKey] = source[sourceKey];
        }
      }
    }

    return target;
  };

  function mergeData() {
    var args = [].slice.call(arguments);
    var target = assign({}, args[0]);
    var sources = args.slice(1);

    var _loop = function _loop(i) {
      var source = sources[i];
      assign(target, source, function (propName) {
        var targetValue = target[propName];
        var sourceValue = source[propName];

        if (targetValue) {
          switch (propName) {
            // append
            case 'staticClass':
              target[propName] = (targetValue + ' ' + sourceValue).trim();
              break;
            // override

            case 'attrs':
            case 'domProps':
            case 'scopedSlots':
            case 'staticStyle':
            case 'props':
            case 'hook':
            case 'transition':
              assign(targetValue, sourceValue);
              break;
            // expand

            case 'class':
            case 'style':
            case 'directives':
              target[propName] = [].concat(sourceValue, targetValue);
              break;
            // expand

            case 'on':
            case 'nativeOn':
              assign(targetValue, sourceValue, function (listenerName) {
                if (targetValue[listenerName]) {
                  targetValue[listenerName] = [].concat(sourceValue[listenerName], targetValue[listenerName]);
                } else {
                  targetValue[listenerName] = sourceValue[listenerName];
                }
              });
              break;
            // override

            default:
              target[propName] = source[propName];
              break;
          }
        } else {
          target[propName] = sourceValue;
        }
      });
    };

    for (var i in sources) {
      _loop(i);
    }

    return target;
  }

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

          return h('i', mergeData(data, extraData, {
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


        return h('svg', mergeData(data, extraData, {
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

  return Icon;

})));

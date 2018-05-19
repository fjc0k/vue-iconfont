/*!
 * vue-iconfont v2.5.1
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueIconfont = factory());
}(this, (function () { 'use strict';

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

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

  var prepend = (function (target, element) {
    if (target.firstChild) {
      target.insertBefore(element, target.firstChild);
    } else {
      target.appendChild(element);
    }
  });

  var loadSVGSprite = (function (SVGSprite) {
    var wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.width = 0;
    wrapper.style.height = 0;
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'none';
    wrapper.innerHTML = SVGSprite;
    prepend(document.body, wrapper);
  });

  var head;

  function injectStyle(css) {
    head = head || document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    /* istanbul ignore if */

    if (style.styleSheet) {
      style.styleSheet.cssText = css; // for IE8 and below
    } else {
      style.appendChild(document.createTextNode(css));
    }

    prepend(head, style);
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
  var svgSpriteInjected = Object.create(null);

  var parentMounted = function parentMounted(parent, callback) {
    /* istanbul ignore if */
    if (parent._isMounted) {
      callback();
    } else {
      parent.$once('hook:mounted', callback);
    }
  };

  var getIcon = (function (_ref) {
    if (_ref === void 0) {
      _ref = {};
    }

    var _ref2 = _ref,
        _ref2$prefix = _ref2.prefix,
        prefix = _ref2$prefix === void 0 ? '' : _ref2$prefix,
        _ref2$family = _ref2.family,
        family = _ref2$family === void 0 ? prefix : _ref2$family,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? SVG_ICON : _ref2$type,
        sprite = _ref2.sprite,
        _ref2$component = _ref2.component;
    _ref2$component = _ref2$component === void 0 ? {} : _ref2$component;

    var _ref2$component$name = _ref2$component.name,
        componentName = _ref2$component$name === void 0 ? 'Icon' : _ref2$component$name,
        _ref2$component$props = _ref2$component.props,
        extraProps = _ref2$component$props === void 0 ? {} : _ref2$component$props,
        beforeRender = _ref2$component.beforeRender,
        componentOptions = _objectWithoutProperties(_ref2$component, ["name", "props", "beforeRender"]);

    return _extends({}, componentOptions, {
      name: componentName,
      functional: true,
      props: _extends({}, extraProps, {
        name: String
      }),
      render: function render(h, ctx) {
        if (typeof beforeRender === 'function') {
          var _h = beforeRender(h, ctx);

          if (typeof _h === 'function') {
            h = _h;
          }
        }

        var parent = ctx.parent,
            data = ctx.data,
            name = ctx.props.name,
            children = ctx.children;
        var fullName = name ? "" + (prefix ? prefix + '-' : '') + name : ''; // font-class 引用

        if (type === FONT_ICON) {
          // 插入 font-class 的样式
          if (!fontIconStyleInjected) {
            fontIconStyleInjected = true;
            parentMounted(parent, function () {
              injectClassFontStyle(FONT_ICON_CLASSNAME);
            });
          }

          return h('i', mergeData(data, {
            staticClass: "" + FONT_ICON_CLASSNAME + (family ? " " + family : '') + (fullName ? " " + fullName : '')
          }), children);
        } // 插入 SVG 字体的样式


        if (!svgIconStyleInjected) {
          svgIconStyleInjected = true;
          parentMounted(parent, function () {
            injectSVGFontStyle(SVG_ICON_CLASSNAME);
          });
        } // 插入 SVG Sprite


        if (sprite && !(sprite in svgSpriteInjected)) {
          svgSpriteInjected[sprite] = true;
          parentMounted(parent, function () {
            loadSVGSprite(sprite);
          });
        } // symbol 引用


        return h('svg', mergeData(data, {
          staticClass: SVG_ICON_CLASSNAME,
          attrs: {
            'aria-hidden': true
          }
        }), [h('use', {
          attrs: {
            'xlink:href': "#" + fullName
          }
        })]);
      }
    });
  });

  getIcon.install = function (Vue, options) {
    /* istanbul ignore if */
    if (!options || typeof options !== 'object') {
      options = {};
    }

    if (!Array.isArray(options)) options = [options];
    options.forEach(function ($options) {
      var Icon = getIcon($options);
      Vue.component($options.tag || Icon.name, Icon);
    });
  };

  return getIcon;

})));

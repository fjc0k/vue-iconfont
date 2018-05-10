/*!
 * vue-iconfont v2.0.0
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueIconfont = factory());
}(this, (function () { 'use strict';

  var extendData = (function (data, source) {
    var staticClass = data.staticClass,
        attrs = data.attrs;
    var _staticClass = source.staticClass,
        _attrs = source.attrs;
    data.staticClass = _staticClass + (staticClass ? " " + staticClass : '');

    if (_attrs) {
      Object.keys(_attrs).forEach(function (key) {
        data.attrs[key] = attrs[key] || _attrs[key];
      });
    }

    return data;
  });

  function injectStyle(style) {
    document.write("<style>" + style + "</style>");
  }

  function injectClassFontStyle(klass, fontFamily) {
    injectStyle("." + klass + "{font-family:\"" + fontFamily + "\"!important;font-size:1em;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}");
  }
  function injectSVGFontStyle(klass) {
    injectStyle("." + klass + "{display:inline-block;width:1em;height:1em;fill:currentColor;vertical-align:-0.11em;font-size:1em;}");
  }

  var FONT_ICON = 'font';
  var SVG_ICON = 'svg';
  var FONT_ICON_CLASSNAME = '__font_icon__';
  var SVG_ICON_CLASSNAME = '__svg_icon__';
  var ICON_COMPONENTS_REGISTER = '__icon_components_register__';

  var classFontStyleInjected = Object.create(null);
  var svgFontStyleInjected = false;
  var getIcon = (function (_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$prefix = _ref.prefix,
        defaultPrefix = _ref$prefix === void 0 ? 'icon' : _ref$prefix,
        _ref$type = _ref.type,
        defaultType = _ref$type === void 0 ? FONT_ICON : _ref$type;

    return {
      name: 'Icon',
      functional: true,
      props: {
        name: String,
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
            type = _ref2$props.type;
        if (!name) return null; // font-class 引用

        if (type === FONT_ICON) {
          var classFontClass = "" + FONT_ICON_CLASSNAME + prefix; // 插入 font-class 的样式

          if (!classFontStyleInjected[prefix]) {
            classFontStyleInjected[prefix] = true;

            if (parent._isMounted) {
              injectClassFontStyle(classFontClass, prefix);
            } else {
              parent.$once('hook:mounted', function () {
                injectClassFontStyle(classFontClass, prefix);
              });
            }
          }

          return h('i', extendData(data, {
            staticClass: classFontClass + " " + prefix + " " + prefix + "-" + name
          }));
        } // 插入 SVG 字体的样式


        if (!svgFontStyleInjected) {
          svgFontStyleInjected = true;

          if (parent._isMounted) {
            injectSVGFontStyle(SVG_ICON_CLASSNAME);
          } else {
            parent.$once('hook:mounted', function () {
              injectSVGFontStyle(SVG_ICON_CLASSNAME);
            });
          }
        } // symbol 引用


        return h('svg', extendData(data, {
          staticClass: SVG_ICON_CLASSNAME,
          attrs: {
            'aria-hidden': true
          }
        }), [h('use', {
          attrs: {
            'xlink:href': "#" + prefix + "-" + name
          }
        })]);
      },
      FONT_ICON: FONT_ICON,
      SVG_ICON: SVG_ICON
    };
  });

  var Icon = getIcon();

  Icon.install = function (Vue, options) {
    if (!options || typeof options !== 'object') {
      options = {};
    }

    if (!Array.isArray(options)) options = [options];
    options.forEach(function ($options) {
      if (!Vue[ICON_COMPONENTS_REGISTER]) {
        Vue[ICON_COMPONENTS_REGISTER] = Object.create(null);
      }

      var key = $options.tag + "/" + $options.type + "/" + $options.prefix;
      if (key in Vue[ICON_COMPONENTS_REGISTER]) return;
      Vue[ICON_COMPONENTS_REGISTER][key] = true;
      var Icon = getIcon($options);
      Vue.component($options.tag || Icon.name, Icon);
    });
  };

  return Icon;

})));

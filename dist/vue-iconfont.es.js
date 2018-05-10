/*!
 * vue-iconfont v2.0.0
 * (c) 2017-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
var extendData = (function (data, source) {
  var staticClass = data.staticClass,
      attrs = data.attrs;
  var _staticClass = source.staticClass,
      _attrs = source.attrs;
  data.staticClass = (staticClass ? staticClass + " " : '') + _staticClass;

  if (_attrs) {
    Object.keys(_attrs).forEach(function (key) {
      data.attrs[key] = attrs[key] || _attrs[key];
    });
  }

  return data;
});

var injectSVGFontStyle = (function (klass) {
  document.write("<style>." + klass + "{display:inline-block;width:1em;height:1em;fill:currentColor;vertical-align:-0.1em;font-size:1em;}</style>");
});

var injectFontClassStyle = (function (klass, fontFamily) {
  document.write("<style>." + klass + "{font-family:\"" + fontFamily + "\"!important;font-size:1em;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}</style>");
});

var FONT_CLASS = 'font-class';
var SYMBOL = 'symbol';
var FONT_CLASS_CLASSNAME = '__vi-font-class__';
var SVG_FONT_CLASSNAME = '__vi-svg-font__';
var fontClassStyleInjected = false;
var svgFontStyleInjected = false;
var getIcon = (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$prefix = _ref.prefix,
      defaultPrefix = _ref$prefix === void 0 ? 'icon' : _ref$prefix,
      _ref$type = _ref.type,
      defaultType = _ref$type === void 0 ? 'font-class' : _ref$type;

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
          return [FONT_CLASS, SYMBOL].indexOf(type) >= 0;
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

      if (type === FONT_CLASS) {
        // 插入 font-class 的样式
        if (!fontClassStyleInjected) {
          fontClassStyleInjected = true;

          if (parent._isMounted) {
            injectFontClassStyle(FONT_CLASS_CLASSNAME, prefix);
          } else {
            parent.$once('hook:mounted', function () {
              injectFontClassStyle(FONT_CLASS_CLASSNAME, prefix);
            });
          }
        }

        return h('i', extendData(data, {
          staticClass: prefix + " " + prefix + "-" + name + " " + FONT_CLASS_CLASSNAME
        }));
      } // 插入 SVG 字体的样式


      if (!svgFontStyleInjected) {
        svgFontStyleInjected = true;

        if (parent._isMounted) {
          injectSVGFontStyle(SVG_FONT_CLASSNAME);
        } else {
          parent.$once('hook:mounted', function () {
            injectSVGFontStyle(SVG_FONT_CLASSNAME);
          });
        }
      } // symbol 引用


      return h('svg', extendData(data, {
        staticClass: SVG_FONT_CLASSNAME,
        attrs: {
          'aria-hidden': true
        }
      }), [h('use', {
        attrs: {
          'xlink:href': "#" + prefix + "-" + name
        }
      })]);
    },
    FONT_CLASS: FONT_CLASS,
    SYMBOL: SYMBOL
  };
});

var REG_KEY = '__registeredIconComponents';
var Icon = getIcon();

Icon.install = function (Vue, options) {
  if (!options || typeof options !== 'object') {
    options = {};
  }

  if (!Vue[REG_KEY]) {
    Vue[REG_KEY] = Object.create(null);
  }

  var key = options.tag + "/" + options.type + "/" + options.prefix;
  if (key in Vue[REG_KEY]) return;
  Vue[REG_KEY][key] = true;
  var Icon = getIcon(options);
  Vue.component(options.tag || Icon.name, Icon);
};

export default Icon;

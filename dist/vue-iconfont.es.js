/*!
 * vue-iconfont v2.5.0
 * (c) 2018-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
import extendData from 'vue-merge-data';

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

var getIcon = (function (_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '' : _ref$prefix,
      _ref$family = _ref.family,
      family = _ref$family === void 0 ? prefix : _ref$family,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? SVG_ICON : _ref$type,
      sprite = _ref.sprite,
      _ref$component = _ref.component;

  _ref$component = _ref$component === void 0 ? {} : _ref$component;
  var _ref$component$name = _ref$component.name,
      componentName = _ref$component$name === void 0 ? 'Icon' : _ref$component$name,
      _ref$component$props = _ref$component.props,
      extraProps = _ref$component$props === void 0 ? {} : _ref$component$props,
      beforeRender = _ref$component.beforeRender;
  return {
    name: componentName,
    functional: true,
    props: _extends({}, extraProps, {
      name: String
    }),
    render: function render(h, ctx) {
      if (typeof beforeRender === 'function') {
        beforeRender(ctx);
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

        return h('i', extendData(data, {
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


      return h('svg', extendData(data, {
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
  };
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

export default getIcon;

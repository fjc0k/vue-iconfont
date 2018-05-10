/*!
 * vue-iconfont v2.0.0
 * (c) 2017-present fjc0k <fjc0kb@gmail.com> (https://github.com/fjc0k)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueIconfont = factory());
}(this, (function () { 'use strict';

  var index = {
    name: 'Icon',
    functional: true,
    props: {
      name: String,
      family: {
        type: String,
        default: 'iconfont'
      },
      prefix: {
        type: String,
        default: 'icon'
      }
    },
    render: function render(h, _ref) {
      var data = _ref.data,
          _ref$props = _ref.props,
          name = _ref$props.name,
          family = _ref$props.family,
          prefix = _ref$props.prefix,
          children = _ref.children;
      var nameIsValid = Boolean(name);
      var isSVGType = nameIsValid && name[0] === '$';
      var isClassType = nameIsValid && !isSVGType;
      var isUnicodeType = !nameIsValid && Boolean(children);
      var isNullType = !nameIsValid && !isUnicodeType;
      if (isNullType) return null;
      name = isClassType ? name : isSVGType ? name.substr(1) : null;
      return isUnicodeType ? h('i', extendData(data, {
        staticClass: family
      }), children) : isClassType ? h('i', extendData(data, {
        staticClass: family + " " + prefix + "-" + name
      })) : h('svg', extendData(data, {
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

  function extendData(data, source) {
    var staticClass = data.staticClass,
        attrs = data.attrs;
    var _staticClass = source.staticClass,
        _attrs = source.attrs;

    if (_staticClass) {
      data.staticClass = (staticClass ? staticClass + " " : '') + _staticClass;
    }

    if (_attrs) {
      Object.keys(_attrs).forEach(function (key) {
        data.attrs[key] = attrs[key] || _attrs[key];
      });
    }

    return data;
  }

  return index;

})));

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.createComponentInstanceForVnode = createComponentInstanceForVnode;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(render) {
  return new _vue.default({
    render
  })._render();
}

function createComponentInstanceForVnode(vnode) {
  const opts = vnode.componentOptions;
  return new opts.Ctor({
    _isComponent: true,
    parent: opts.parent,
    propsData: opts.propsData,
    _componentTag: opts.tag,
    _parentVnode: vnode,
    _parentListeners: opts.listeners,
    _renderChildren: opts.children
  });
}
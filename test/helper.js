import Vue from 'vue'

export function render(render) {
    return new Vue({
        render
    })._render()
}

export function createComponentInstanceForVnode(vnode) {
    const opts = vnode.componentOptions
    return new opts.Ctor({
        _isComponent: true,
        parent: opts.parent,
        propsData: opts.propsData,
        _componentTag: opts.tag,
        _parentVnode: vnode,
        _parentListeners: opts.listeners,
        _renderChildren: opts.children
    })
}
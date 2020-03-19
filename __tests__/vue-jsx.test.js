"use strict";

var _babelHelperVueJsxMergeProps = _interopRequireDefault(require("@vue/babel-helper-vue-jsx-merge-props"));

var _helper = require("./helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// helpers
describe('babel-plugin-transform-vue-jsx', () => {
  test('should contain text', () => {
    const vnode = (0, _helper.render)(h => h("div", ["test"]));
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('should bind text', () => {
    const text = 'foo';
    const vnode = (0, _helper.render)(h => h("div", [text]));
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('foo');
  });
  test('should extract attrs', () => {
    const vnode = (0, _helper.render)(h => h("div", {
      "attrs": {
        "id": "hi",
        "dir": "ltr"
      }
    }));
    expect(vnode.data.attrs.id).toEqual('hi');
    expect(vnode.data.attrs.dir).toEqual('ltr');
  });
  test('should bind attr', () => {
    const id = 'foo';
    const vnode = (0, _helper.render)(h => h("div", {
      "attrs": {
        "id": id
      }
    }));
    expect(vnode.data.attrs.id).toEqual('foo');
  });
  test('should omit attribs if possible', () => {
    const vnode = (0, _helper.render)(h => h("div", ["test"]));
    expect(vnode.data).toEqual(undefined);
  });
  test('should omit children argument if possible', () => {
    const vnode = (0, _helper.render)(h => h("div"));
    const children = vnode.children;
    expect(children).toEqual(undefined);
  });
  test('should handle top-level special attrs', () => {
    const vnode = (0, _helper.render)(h => h("div", {
      "class": "foo",
      "style": "bar",
      "key": "key",
      "ref": "ref",
      "refInFor": true,
      "slot": "slot"
    }));
    expect(vnode.data.class).toEqual('foo');
    expect(vnode.data.style).toEqual('bar');
    expect(vnode.data.key).toEqual('key');
    expect(vnode.data.ref).toEqual('ref');
    expect(vnode.data.refInFor).toBeTruthy();
    expect(vnode.data.slot).toEqual('slot');
  });
  test('should handle nested properties', () => {
    const noop = _ => _;

    const vnode = (0, _helper.render)(h => h("div", {
      "props": {
        "on-success": noop
      },
      "on": {
        "click": noop,
        "kebab-case": noop
      },
      "domProps": {
        "innerHTML": "<p>hi</p>"
      },
      "hook": {
        "insert": noop
      }
    }));
    expect(vnode.data.props['on-success']).toEqual(noop);
    expect(vnode.data.on.click).toEqual(noop);
    expect(vnode.data.on['kebab-case']).toEqual(noop);
    expect(vnode.data.domProps.innerHTML).toEqual('<p>hi</p>');
    expect(vnode.data.hook.insert).toEqual(noop);
  });
  test('should handle nested properties (camelCase)', () => {
    const noop = _ => _;

    const vnode = (0, _helper.render)(h => h("div", {
      "props": {
        "onSuccess": noop
      },
      "on": {
        "click": noop,
        "camelCase": noop
      },
      "domProps": {
        "innerHTML": "<p>hi</p>"
      },
      "hook": {
        "insert": noop
      }
    }));
    expect(vnode.data.props.onSuccess).toEqual(noop);
    expect(vnode.data.on.click).toEqual(noop);
    expect(vnode.data.on.camelCase).toEqual(noop);
    expect(vnode.data.domProps.innerHTML).toEqual('<p>hi</p>');
    expect(vnode.data.hook.insert).toEqual(noop);
  });
  test('should support data attributes', () => {
    const vnode = (0, _helper.render)(h => h("div", {
      "attrs": {
        "data-id": "1"
      }
    }));
    expect(vnode.data.attrs['data-id']).toEqual('1');
  });
  test('should handle identifier tag name as components', () => {
    const Test = {};
    const vnode = (0, _helper.render)(h => h(Test));
    expect(vnode.tag).toContain('vue-component');
  });
  test('should work for components with children', () => {
    const Test = {};
    const vnode = (0, _helper.render)(h => h(Test, [h("div", ["hi"])]));
    const children = vnode.componentOptions.children;
    expect(children[0].tag).toEqual('div');
  });
  test('should bind things in thunk with correct this context', () => {
    const Test = {
      render(h) {
        return h("div", [this.$slots.default]);
      }

    };
    const context = {
      test: 'foo'
    };
    const vnode = (0, _helper.render)(function (h) {
      return h(Test, [this.test]);
    }.bind(context));
    const vm = (0, _helper.createComponentInstanceForVnode)(vnode);

    const childVnode = vm._render();

    expect(childVnode.tag).toEqual('div');
    expect(childVnode.children[0].text).toEqual('foo');
  });
  test('spread (single object expression)', () => {
    const props = {
      innerHTML: 2
    };
    const vnode = (0, _helper.render)(h => h("div", {
      "props": { ...props
      }
    }));
    expect(vnode.data.props.innerHTML).toEqual(2);
  });
  test('spread (mixed)', () => {
    const calls = [];
    const data = {
      attrs: {
        id: 'hehe'
      },
      on: {
        click: function () {
          calls.push(1);
        }
      },
      props: {
        innerHTML: 2
      },
      hook: {
        insert: function () {
          calls.push(3);
        }
      },
      class: ['a', 'b']
    };
    const vnode = (0, _helper.render)(h => h("div", (0, _babelHelperVueJsxMergeProps.default)([{
      "attrs": {
        "href": "huhu"
      }
    }, data, {
      "class": {
        c: true
      },
      "on": {
        "click": () => calls.push(2)
      },
      "hook": {
        "insert": () => calls.push(4)
      }
    }])));
    expect(vnode.data.attrs.id).toEqual('hehe');
    expect(vnode.data.attrs.href).toEqual('huhu');
    expect(vnode.data.props.innerHTML).toEqual(2);
    expect(vnode.data.class).toEqual(['a', 'b', {
      c: true
    }]); // merge handlers properly for on

    vnode.data.on.click();
    expect(calls).toEqual([1, 2]); // merge hooks properly

    vnode.data.hook.insert();
    expect(calls).toEqual([1, 2, 3, 4]);
  });
  test('custom directives', () => {
    const vnode = (0, _helper.render)(h => h("div", {
      "directives": [{
        name: "test",
        value: 123
      }, {
        name: "other",
        value: 234
      }]
    }));
    expect(vnode.data.directives.length).toEqual(2);
    expect(vnode.data.directives[0]).toEqual({
      name: 'test',
      value: 123
    });
    expect(vnode.data.directives[1]).toEqual({
      name: 'other',
      value: 234
    });
  });
  test('xlink:href', () => {
    const vnode = (0, _helper.render)(h => h("use", {
      "attrs": {
        "xlink:href": '#name'
      }
    }));
    expect(vnode.data.attrs['xlink:href']).toEqual('#name');
  });
  test('merge class', () => {
    const vnode = (0, _helper.render)(h => h("div", (0, _babelHelperVueJsxMergeProps.default)([{
      "class": "a"
    }, {
      class: 'b'
    }])));
    expect(vnode.data.class).toEqual({
      a: true,
      b: true
    });
  });
  test('h injection in object methods', () => {
    const obj = {
      method() {
        const h = this.$createElement;
        return h("div", ["test"]);
      }

    };
    const vnode = (0, _helper.render)(h => obj.method.call({
      $createElement: h
    }));
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('h should not be injected in nested JSX expressions', () => {
    const obj = {
      method() {
        const h = this.$createElement;
        return h("div", {
          "attrs": {
            "foo": {
              render() {
                return h("div", ["bar"]);
              }

            }
          }
        }, ["test"]);
      }

    };
    const vnode = (0, _helper.render)(h => obj.method.call({
      $createElement: h
    }));
    expect(vnode.tag).toEqual('div');
    const nested = vnode.data.attrs.foo.render();
    expect(nested.tag).toEqual('div');
    expect(nested.children[0].text).toEqual('bar');
  });
  test('h injection in object getters', () => {
    const obj = {
      get computed() {
        const h = this.$createElement;
        return h("div", ["test"]);
      }

    };
    const vnode = (0, _helper.render)(h => {
      obj.$createElement = h;
      return obj.computed;
    });
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('h injection in multi-level object getters', () => {
    const obj = {
      inherited: {
        get computed() {
          const h = this.$createElement;
          return h("div", ["test"]);
        }

      }
    };
    const vnode = (0, _helper.render)(h => {
      obj.inherited.$createElement = h;
      return obj.inherited.computed;
    });
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('h injection in class methods', () => {
    class Test {
      constructor(h) {
        this.$createElement = h;
      }

      render() {
        const h = arguments[0];
        return h("div", ["test"]);
      }

    }

    const vnode = (0, _helper.render)(h => new Test(h).render(h));
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('h injection in class getters', () => {
    class Test {
      constructor(h) {
        this.$createElement = h;
      }

      get computed() {
        const h = this.$createElement;
        return h("div", ["test"]);
      }

    }

    const vnode = (0, _helper.render)(h => new Test(h).computed);
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('h injection in methods with parameters', () => {
    class Test {
      constructor(h) {
        this.$createElement = h;
      }

      notRender(notH) {
        const h = this.$createElement;
        return h("div", [notH]);
      }

    }

    const vnode = (0, _helper.render)(h => new Test(h).notRender('test'));
    expect(vnode.tag).toEqual('div');
    expect(vnode.children[0].text).toEqual('test');
  });
  test('should handle special attrs properties', () => {
    const vnode = (0, _helper.render)(h => h("input", {
      "attrs": {
        "value": "value"
      }
    }));
    expect(vnode.data.attrs.value).toEqual('value');
  });
  test('should handle special domProps properties', () => {
    const vnode = (0, _helper.render)(h => h("input", {
      "domProps": {
        "value": 'some jsx expression'
      }
    }));
    expect(vnode.data.domProps.value).toEqual('some jsx expression');
  });
});
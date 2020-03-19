define('index', function(require, exports, module) {

  "use strict";
  
  var _vue = _interopRequireDefault(require("node_modules/vue/dist/vue.runtime.common"));
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  new _vue.default({
    el: '#app',
    data: function data() {
      return {
        message: 'hi'
      };
    },
    render: function render(h) {
      return h("div", [this.message]);
    }
  });

});

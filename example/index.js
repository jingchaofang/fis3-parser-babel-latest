import Vue from 'vue';

new Vue({
  el: '#app',
  data() {
    return {
        message: 'hi'
    }
  },
  render(h) {
      return (<div>{this.message}</div>)
  }
});

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css'; //样式文件
import '@/assets/icon/iconfont.css';

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
Vue.directive('dom', {
  bind: function (el, binding) {
    var obj = binding.value;
    if (obj != null) {
      var key = Object.keys(binding.modifiers)[0] || "el";
      Vue.set(obj, key, el);
    }
  },
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

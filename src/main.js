import Vue from 'vue'
import App from './App.vue'
import ActionCable from 'actioncable'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

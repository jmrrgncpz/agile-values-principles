import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire';
import vuetify from './plugins/vuetify'
import store from './store';

Vue.use(firestorePlugin);
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

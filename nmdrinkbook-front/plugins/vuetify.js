import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    icons: {
      iconfont: 'mdi'
    }
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}

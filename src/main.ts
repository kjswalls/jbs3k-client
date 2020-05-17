import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import VueCompositionApi, { provide } from '@vue/composition-api'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/apollo/client'
import registerGlobalComponents from '@/util/registerComponents'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
registerGlobalComponents()

new Vue({
    setup() {
        provide(DefaultApolloClient, apolloClient)
        return {}
    },
    router,
    render: h => h(App),
}).$mount('#app')

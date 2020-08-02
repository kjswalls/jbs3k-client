import Vue from 'vue';
import VueCompositionApi, { provide } from '@vue/composition-api';
import VTooltip from 'v-tooltip';
import PortalVue from 'portal-vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from '@/App.vue';
import router from '@/router';
import registerGlobalComponents from '@/util/registerComponents';
import { apolloClient } from '@/apollo/client';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VTooltip, { disposeTimeout: 0 });
Vue.use(PortalVue);
registerGlobalComponents();

new Vue({
    setup() {
        provide(DefaultApolloClient, apolloClient);
        return {};
    },
    router,
    render: h => h(App),
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './support/router'
import store from "./support/store"

//vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);

// Bootstrap import
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon);

import SideBarMenuIcon from "./components/navigation/SideBarMenuIcon.vue";
import AlarmBadge from './components/alarms/AlarmBadge.vue'
import SideBar from "./components/navigation/SideBarMenu.vue";
Vue.component('side-bar-menu', SideBar);
Vue.component('side-bar-menu-icon', SideBarMenuIcon);
Vue.component('alarm-badge', AlarmBadge);

import ScadaCard from './components/app/ScadaCard.vue'
import SvgCard from './components/floor-plan/svg-card'
import ScadaCardList from './components/app/ScadaCardList.vue'
import ScadaResizable from './components/app/ScadaResizable.vue';
Vue.component('scada-card', ScadaCard);
Vue.component('svg-card', SvgCard);
Vue.component('scada-card-list', ScadaCardList);
Vue.component('scada-resizable', ScadaResizable);

import ScadaHide from './components/scada/ScadaHide.vue'
import ScadaNumber from './components/scada/ScadaNumber.vue'
import ScadaShowValue from './components/scada/ScadaShowValue.vue'
import ScadaText from './components/scada/ScadaText.vue'
import ScadaSetValue from './components/scada/ScadaSetValue.vue'
import ScadaSetTime from './components/scada/ScadaSetTime.vue'
import ScadaSwitch from './components/scada/ScadaSwitch.vue'
import ScadaDropdown from './components/scada/ScadaDropdown.vue'
import ScadaTable from './components/scada/ScadaTable.vue'
import ScadaImage from './components/scada/ScadaImage.vue'
import ScadaIcon from './components/scada/ScadaIcon.vue'
import ScadaButtonIcon from './components/scada/ScadaButtonIcon.vue'
import ScadaGauge from './components/scada/ScadaGauge.vue'

import HistoryLineChart from './components/chart/HistoryLineChart'
import LiveLineChart from './components/chart/LiveLineChart.vue'

Vue.component('scada-hide', ScadaHide);
Vue.component('scada-number', ScadaNumber);
Vue.component('scada-value', ScadaShowValue);
Vue.component('scada-text', ScadaText);
Vue.component('scada-set-value', ScadaSetValue);
Vue.component('scada-set-time', ScadaSetTime);
Vue.component('scada-switch', ScadaSwitch);
Vue.component('scada-dropdown', ScadaDropdown);
Vue.component('scada-table',ScadaTable);
Vue.component('scada-image',ScadaImage);
Vue.component('scada-icon',ScadaIcon);
Vue.component('scada-button-icon',ScadaButtonIcon);
Vue.component('scada-gauge',ScadaGauge);

Vue.component('history-line-chart',HistoryLineChart);
Vue.component('live-line-chart',LiveLineChart);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

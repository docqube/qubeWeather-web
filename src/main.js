// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config.json'

// import libraries
import VueResource from 'vue-resource'

// apply vue-material design rules
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'mdi/css/materialdesignicons.min.css'
Vue.use(VueMaterial)

// import components
import StationOverview from '@/components/Overview'
import TemperatureCard from '@/components/data_cards/Temperature'
import HumidityCard from '@/components/data_cards/Humidity'
import PressureCard from '@/components/data_cards/Pressure'
import WindCard from '@/components/data_cards/Wind'
import PrecipitationCard from '@/components/data_cards/Precipitation'
import LightlevelCard from '@/components/data_cards/Lightlevel'

// add components
Vue.use(VueResource)
Vue.component('station-overview', StationOverview)
Vue.component('station-temperature', TemperatureCard)
Vue.component('station-humidity', HumidityCard)
Vue.component('station-pressure', PressureCard)
Vue.component('station-wind', WindCard)
Vue.component('station-precipitation', PrecipitationCard)
Vue.component('station-lightlevel', LightlevelCard)

Vue.config.productionTip = false

// resource config
Vue.http.options.root = config.url.api
Vue.http.options.timeout = 30000
delete Vue.http.headers.common['Content-Type']

document.title = config.station.name + ' | qubeWeather station';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

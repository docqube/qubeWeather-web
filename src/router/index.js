import Vue from 'vue'
import Router from 'vue-router'
import StationData from '@/components/StationData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Station data',
      component: StationData
    }
  ]
})

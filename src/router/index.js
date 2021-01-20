import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import customerDetails from "../components/Orders/customerDetails.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Orders',
    name: 'Customer Details',
    component: customerDetails
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

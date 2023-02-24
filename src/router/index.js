import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // Redirects
  // {
  //   path: '/',
  //   redirect: '/employee-vue'
  // },
  // {
  //   path: '/employee',
  //   redirect: '/employee-vue/employee'
  // },
  // {
  //   path: '/employee/add',
  //   redirect: '/employee-vue/employee/add'
  // },
  // {
  //   path: '/employee/update/:id',
  //   redirect: '/employee-vue/employee/update/:id',
  // },
  
  // Actual paths
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employee',
    name: 'employee',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeView.vue')
  },
  {
    path: '/employee/add',
    name: "add_employee",
    component: () => import("../views/AddEmployee.vue")
  },
  {
    path: '/employee/update/:id?',
    name: "update_employee",
    component: () => import("../views/UpdateEmployee.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

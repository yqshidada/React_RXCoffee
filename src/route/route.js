import Main from '../views/Main/Main'
import Detail from '../views/Detail/Detail'
import Login from '../views/Login/Login'
import Register from '../views/Register/Register'
import Home from '../views/Home/Home'
import Menu from '../views/Menu/Menu'
import Shopbag from '../views/Shopbag/Shopbag'
import My from '../views/My/My'

//一级路由
export const route = [
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Detail',
    path: '/detail/:pid',
    component: Detail
  },
  {
    name: 'Main',
    path: '/',
    component: Main
  }
]

//二级路由
export const mainRoute = [
  {
    name: 'Menu',
    path: '/menu',
    component: Menu
  },
  {
    name: 'Shopbag',
    path: '/shopbag',
    component: Shopbag
  },
  {
    name: 'My',
    path: '/my',
    component: My
  },
  {
    name: 'Home',
    path: '/',
    component: Home
  }
]

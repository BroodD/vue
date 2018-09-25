import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Card from '@/components/Card'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import User from '@/components/User/User'
import Settings from '@/components/User/Settings'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
		},
		{
			path: '/card/:id',
			props: true,
			name: 'card',
			component: Card
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/registration',
			name: 'registration',
			component: Registration
		},
		{
			path: '/user/:id',
			props: true,
			name: 'user',
			component: User
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings
		}
	],
	mode: 'history'
})

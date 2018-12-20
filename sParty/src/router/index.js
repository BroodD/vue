import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import User from '@/components/User/User'
import Single from '@/components/Cards/Single'
import NewCard from '@/components/Cards/NewCard'
import Settings from '@/components/User/Settings'
import Visit from '@/components/User/Visit'


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
			component: Single
		},
		{
			path: '/new',
			props: true,
			name: 'new',
			component: NewCard,
			beforeEnter: AuthGuard 
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
			component: User,
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings,
			beforeEnter: AuthGuard 
		},
		{
			path: '/visit',
			name: 'visit',
			component: Visit
		},
		{
			path: '*',
			redirect: '/'
		}
	],
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		if (to.hash) {
			return { selector: to.hash }
		}

		return {
			x: 0,
			y: 0
		}
	}
})

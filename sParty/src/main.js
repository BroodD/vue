// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'

import Card from '@/components/Cards/Card'

Vue.config.devtools = true


Vue.use(Vuetify, {
	theme: {
		primary: '#097275'
	}
})

Vue.component('Card', Card)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
	store,
  components: { App, Card },
	template: '<App/>',
	created() {
		fb.initializeApp({
			apiKey: "AIzaSyB1B2yJmi94g0hGCMvPnpsJ7CbXzR2wL4I",
			authDomain: "sparty-3251e.firebaseapp.com",
			databaseURL: "https://sparty-3251e.firebaseio.com",
			projectId: "sparty-3251e",
			storageBucket: "sparty-3251e.appspot.com",
			messagingSenderId: "435493051386"
		})
		
		
		fb.auth().onAuthStateChanged(user => {
			if (user) {
				this.$store.dispatch('autoLoginUser', user)
			}
		})
		
		// this.$store.dispatch('createCard')
		this.$store.dispatch('fetchCards')
	}
})

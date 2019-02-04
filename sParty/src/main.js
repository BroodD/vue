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
		// primary: '#28c5b1'
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
	async beforeCreate() {
		await fb.initializeApp({
			apiKey: "AIzaSyB1B2yJmi94g0hGCMvPnpsJ7CbXzR2wL4I",
			authDomain: "sparty-3251e.firebaseapp.com",
			databaseURL: "https://sparty-3251e.firebaseio.com",
			projectId: "sparty-3251e",
			storageBucket: "sparty-3251e.appspot.com",
			messagingSenderId: "435493051386"

			// apiKey: "AIzaSyCh6LNMxHX3cfYBI7zdDXShoaCH0CT1ND4",
			// authDomain: "time-4-event.firebaseapp.com",
			// databaseURL: "https://time-4-event.firebaseio.com",
			// projectId: "time-4-event",
			// storageBucket: "time-4-event.appspot.com",
			// messagingSenderId: "984805020632"
		})

		await fb.auth().onAuthStateChanged(user => {
			console.log('--onAuthStateChanged--')
			if (user) {
				if (user.emailVerified) {
					this.$store.dispatch('autoLoginUser', user)
					this.$router.push('/')
				} else {
					var th = this
					user.sendEmailVerification().then(function () {
						// commit('setError', 'Email send')
						th.$store.commit('setError', { msg: 'Verification email sent to ' + user.email, color: 'orange' })
					}).catch(function (error) {
						th.$store.commit('setError', error)
					});
					// this.$store.commit('setError', 'Please verify your email ' + user.email)
				}
			} else {
				this.$store.commit('setError', 'No login')
			}
		})

	}
})

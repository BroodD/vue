import Vue from 'vue'
import Vuex from 'vuex'
import cards from './cards'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user, shared, cards
	}
})
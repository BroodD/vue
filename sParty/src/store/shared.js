export default {
  state: {
    loading: false,
		error: null,
		
		position: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
		},
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    clearError ({commit}) {
      commit('clearError')
		},

		setPosition({ commit }, payload) {
			commit('set', {v: 'position', val: payload})
		},
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
		},
  }
}

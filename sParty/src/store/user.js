import * as fb from 'firebase'

class User {
	constructor(id, name, image) {
		this.id = id
		this.name = name
		this.image = image
	}
}

export default {
	state: {
		user: null
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
			// this.$set(state.user, 'id', payload)
			// Object.assign(state.user, payload)
		}
	},
	actions: {
		async loginUser({ commit }, { email, password }) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const user = await fb.auth().signInWithEmailAndPassword(email, password)
				const key = user.user.uid

				const fbVal = await fb.database().ref('users/' + key).once('value')
				const userInfo = fbVal.val()

				commit('setUser', new User(key, userInfo.name, userInfo.image))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		async registerUser({ commit }, { email, password, name, image }) {
			commit('clearError')
			commit('setLoading', true)
			try {
				const user = await fb.auth().createUserWithEmailAndPassword(email, password)
				const key = user.user.uid
				let imageSrc
				let imageExt = image.name.slice(image.name.lastIndexOf('.') + 1)
				let fileData = await fb.storage().ref(`user/${key}.${imageExt}`).put(image)
					.then(snapshot => snapshot.ref.getDownloadURL())
					.then(url => imageSrc = url)
				await fb.database().ref('users/' + key).set({
					name,
					image: imageSrc
				})
				
				commit('setUser', new User(key, name, imageSrc))
				commit('setLoading', false)
			} catch (error) {
				commit('setLoading', false)
				commit('setError', error.message)
				throw error
			}
		},
		async autoLoginUser({ commit }, payload) {
			const fbVal = await fb.database().ref('users/' + payload.uid).once('value')
			const userInfo = fbVal.val()
			commit('setUser', new User(payload.uid, userInfo.name, userInfo.image))
		},
		logoutUser({ commit }) {
			fb.auth().signOut()
			commit('setUser', null)
		}
	},
	getters: {
		user(state) {
			return state.user
		},
		isUserLoggedIn(state) {
			return state.user !== null
		},
		userId(state) {
			return (state.user !== null) ? state.user.id : null
		}
	}
}

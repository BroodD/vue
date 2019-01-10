import * as fb from 'firebase'
import { Cards } from '@/class/Mixin'

export default {
	state: {
		comments: [],
		members: []
	},
	mutations: {
		toggleLike(state, id) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			if (card.like.red)
				card.like.red = false,
					card.like.length--
			else
				card.like.red = true,
					card.like.length++
		},
		toggleVisit(state, { id, red }) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			if (red)
				card.visit.length-- ,
					card.visit.red = false
			else
				card.visit.length++ ,
					card.visit.red = true
		},
		addComment(state, { key, text, user, id }) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			card.commLength++
			state.otherCard.comments.unshift({
				id: key,
				...user,
				text
			})
		}
	},
	actions: {
		// async fetchVisit({ commit, getters }) {
		// 	commit('clearError')
		// 	commit('setLoading', true)

		// 	try {
		// 		var u = getters.user
		// 		var _cards = await fb.database().ref("cards")
		// 		var _users = await fb.database().ref("users/" + u.id + "/visit")
		// 		var resultCards = []

		// 		_users.once("value", user => {
		// 			user.forEach(e => {
		// 				if(e.key != 'length')
		// 				_cards.child(e.key).once("value", card => {
		// 					var like = card.val().like[u.id]
		// 					console.log("like " + like)
		// 					let red = card.val().like[u.id] ? true : false
		// 					resultCards.push(
		// 						new Cards(
		// 							card.val().title,
		// 							card.val().desc,
		// 							card.val().ownerId,
		// 							card.val().time,
		// 							card.val().date,
		// 							{ length: card.val().like.length, red },
		// 							card.val().visit.length,
		// 							card.val().people,
		// 							card.val().comments.length,
		// 							u.name,
		// 							u.image,
		// 							card.val().img,
		// 							card.key
		// 						)
		// 					)
		// 				})
		// 			})
		// 		})

		// 		commit('loadCards', resultCards)
		// 		commit('setLoading', false)
		// 	} catch(error) {
		// 		commit('setError', error.message)
		// 		commit('setLoading', false)
		// 		throw error
		// 	}
		// },
		async toggleLike({ commit, getters }, { id, length }) {
			commit('clearError')
			commit('setLoading', true)

			const user = getters.userId

			if (user) {
				await fb.database().ref('cards/' + id + '/like/').child(user).once('value')
					.then(s => {
						if (s.val())
							// fb.database().ref('cards/' + id + '/like/').child(user).remove(),
							fb.database().ref('cards/' + id + '/like/').update({
								[user]: null,
								length: length - 1
							})
						else
							fb.database().ref('cards/' + id + '/like/').update({
								[user]: 1,
								length: length + 1,
							})
					})
				commit('toggleLike', id)
				commit('setLoading', false)
			} else {
				commit('setLoading', false)
				commit('setError', 'You must be logined')
			}
		},
		async toggleVisit({ commit, getters }, { id, length, red }) {
			commit('clearError')
			commit('setLoading', true)

			var user = getters.userId

			if (user) {
				var base = await fb.database();
				var update = {};
				if (red) {
					// console.log('remove')
					update['users/' + user + '/visit/' + id] = null
					update['visit/' + id] = null
					update['cards/' + id + '/visit/'] = length - 1
					base.ref().update(update)
					commit('setError', { msg: 'Remove from members', color: 'red' })
				}
				else {
					// console.log('add')
					update['users/' + user + '/visit/' + id] = 1
					update['visit/' + id + '/' + user] = 1
					update['cards/' + id + '/visit/'] = length + 1
					base.ref().update(update)
					commit('setError', { msg: 'Add to members', color: 'primary' })
				}

				commit('toggleVisit', { id, red })
				commit('setLoading', false)
			} else {
				commit('setLoading', false)
				commit('setError', 'You must be logined')
			}
		},
		async addComment({ commit, getters }, { id, text, length }) {
			commit('clearError')
			commit('setLoading', true)

			var user = getters.userId

			if (user) {
				var base = await fb.database();
				var update = {};

				update['cards/' + id + '/comments'] = length + 1
				base.ref().update(update)

				var key = base.ref('comments/' + id).push({
					text,
					user,
					like: 0
				}).key

				// commit('addComment', { key, text, user: getters.user, id })
				commit('setLoading', false)
				commit('setError', { msg: 'Сomment has been added', color: 'primary' })
			} else {
				commit('setLoading', false)
				commit('setError', 'You must be logined')
			}
		}
	},
	getters: {

	}
}
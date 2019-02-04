// import Vue from 'vue'
import * as fb from 'firebase'
import { Cards } from '@/class/Mixin'

export default {
  state: {
		cards: [],
		end: null
  },
  mutations: {
    createCard (state, payload) {
      state.cards.unshift(payload)
    },
    loadCards (state, payload) {
			state.cards = payload
		},
		setEnd(state, { end }) {
			state.end = end
		},
		toggleLike (state, { id, red }) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			if (red)
				card.like.red = false,
				card.like.length--
			else 
				card.like.red = true,
				card.like.length++
		},
		toggleVisit (state, { id, red }) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			if (red)
				card.visit.length--,
				card.visit.red = false
			else
				card.visit.length++,
				card.visit.red = true
		},
		addComment (state, { key, text, user, id }) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			card.commLength++
			state.otherCard.comments.unshift({
				id: key,
				...user,
				text
			})
		},
  },
  actions: {
    async createCard ({commit, getters}, payload) {
      commit('clearError')
			commit('setLoading', true)

			
      try {
				// var base = await fb.database().ref()
				
				// title, desc, ownerId, time, date, like, visit, people, comments, ownerName = null, ownerImg = null, img = null, id = null
        const newCard = new Cards(
					payload.title,
          payload.desc,
          getters.userId,
          payload.time,
          { length: 0 },
					{ length: 0 },
					payload.people,
					0,
				)
					
				let imageSrc = []
        const images = payload.images
  			const files = payload.files
				const key = await fb.database().ref('cards').push().key
				console.log(key)
				
				for (let i = 0; i < images.length; i++) {
					let imageExt = images[i].name.slice(images[i].name.lastIndexOf('.') + 1)
				
					let fileData = await fb.storage().ref(`cards/${key}_${i}.${imageExt}`).put(files[i])
						.then(snapshot => snapshot.ref.getDownloadURL())
						.then(url => imageSrc.push(url))
				}
				
				newCard.img = imageSrc
				newCard.create = -Date.now()

				await base.child('cards').push(newCard)

        newCard.ownerName = getters.user.name
				newCard.ownerImg = getters.user.image
				newCard.visit = {
					length: 0,
					red: false
				}
				newCard.like = {
					length: 0,
					red: false
				}

				base.child('users/' + getters.userId + '/cards').update({
					[key]: 1
				})

				commit('createCard', newCard)
				commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchCards ({commit, getters}, endAt) {
      commit('clearError')
			commit('setLoading', true)
			

			console.log('fetchCards')

			var resultCards = []
			var end = []

      try {
				var base = await fb
					.database()
					.ref()
				var _cards

				if (endAt) {
					_cards = base
						.child("cards")
						// .orderByChild('create')
						.orderByKey()
						.limitToLast(4)
						.endAt(endAt)
				} else {
					_cards = base
						.child("cards")
						// .orderByChild('create')
						.orderByKey()
						.limitToLast(3)
				}

				// var _cards = await fb.database().ref('cards').orderByKey().limitToLast(4).endAt('-LTmPiKMZA7XRXUfCj_f')
				var _users = base.child('users')
				
				await _cards.once('value', snap => {
					snap.forEach(e => {
						if (e.key != endAt ) {
							end.push(e.key)
							_users.child(e.val().ownerId).once('value', user => {
									let red = e.val().like[getters.userId] ? true : false;
									let visit = e.val().visit[getters.userId] ? true : false;

									resultCards.push(
										new Cards(
											e.val().title,
											e.val().desc,
											e.val().ownerId,
											e.val().time,
											{ length: e.val().like.length, red},
											{ length: e.val().visit.length, red: visit},
											e.val().people,
											e.val().comments,
											user.val().login,
											user.val().image,
											e.val().img,
											e.key
										)
									)
							})
						}
					})
				})

				resultCards = resultCards.concat(getters.cards)
				
				commit('loadCards', resultCards)
				commit('setEnd', { end: end[0] })
				commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
				commit('setLoading', false)
        throw error
      }
		},
		async userCards({ commit, getters }, { id, user, endAt }) {
			commit('clearError')
			commit('setLoading', true)

			
			console.log('userCards', id, user, endAt)

			try {
				var base = await fb.database().ref()
				var _cards = base.child("cards")
				var _userCards
				var end = []
				var resultCards = []

				if (endAt) {
					_userCards = base
						.child('users/' + id + '/cards')
						.orderByKey()
						.limitToLast(4)
						.endAt(endAt)
				} else {
					_userCards = base
						.child('users/' + id + '/cards')
						.orderByKey()
						.limitToLast(3)
				}

				await _userCards.once('value', snap => {
					snap.forEach(e => {
						if (e.key != endAt) {
							end.push(e.key)
							_cards.child(e.key).once('value', card => {
								let red = card.val().like[getters.userId] ? true : false;
								let visit = card.val().visit[getters.userId] ? true : false;
								resultCards.push(
									new Cards(
										card.val().title,
										card.val().desc,
										card.val().ownerId,
										card.val().time,
										{ length: card.val().like.length, red },
										{ length: card.val().visit.length, red: visit },
										card.val().people,
										card.val().comments,
										user.login,
										user.image,
										card.val().img,
										e.key
									)
								)
							})
						}
					})
				})

				resultCards = resultCards.concat(getters.cards)

				commit('loadCards', resultCards)
				commit('setEnd', { end: end[0] })
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchVisit({ commit, getters }) {
			commit('clearError')
			commit('setLoading', true)

			console.log('fetchVisit')

			try {
				var base = await fb.database().ref()
				var u = getters.user
				console.log(u)
				var _cards = base.child("cards")
				var _users = base.child("users/" + u.id + "/visit")
				var resultCards = []

				await _users.once("value", user => {
					user.forEach(e => {
						if(e.key != 'length')
						_cards.child(e.key).once("value", card => {
							let red = card.val().like[u.id] ? true : false;
							let visit = card.val().visit[u.id] ? true : false;

							resultCards.push(
								new Cards(
									card.val().title,
									card.val().desc,
									card.val().ownerId,
									card.val().time,
									{ length: card.val().like.length, red },
									{ length: card.val().visit.length, red: visit },
									card.val().people,
									card.val().comments,
									u.login,
									u.image,
									card.val().img,
									e.key
								)
							)
						})
					})
				})

				commit('loadCards', resultCards)
				commit('setLoading', false)
			} catch(error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async toggleLike({ commit, getters }, { id, length, red }) {
			commit('clearError')
			commit('setLoading', true)
			
			var user = getters.userId

			if( user ) {
				var base = await fb.database().ref();
				if (red) {
					// console.log('remove')
					await base.child('cards/' + id + '/like').update({
						length: length - 1,
						[user]: null
					})
				}
				else {
					// console.log('add')
					await base.child('cards/' + id + '/like').update({
						length: length + 1,
						[user]: 1
					})
				}

				commit('toggleLike', { id, red })
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

			if( user ) {
				var base = await fb.database().ref();
				if(red) {
					// console.log('remove')
					base.child('cards/' + id + '/visit/').update({
						length: length - 1,
						[user]: null
					})
					base.child('users/' + user + '/visit/').update({
						[id]: null
					})
					commit('setError', { msg:'Remove from members', color: 'red'})
				}
				else {
					// console.log('add')
					base.child('cards/' + id + '/visit/').update({
						length: length + 1,
						[user]: 1
					})
					base.child('users/' + user + '/visit/').update({
						[id]: 1
					})
					commit('setError', { msg:'Add to members', color: 'primary'})
				}

				commit('toggleVisit', { id, red })
				commit('setLoading', false)
			} else {
				commit('setLoading', false)
				commit('setError', 'You must be logined')
			}
		},
		async addComment ({commit, getters}, { id, text, length }) {
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
    cards (state) {
      return state.cards
    },
    myCards (state, getters) {
      return state.cards.filter(card => card.ownerId === getters.userId)
    },
   	userCards (state) {
			return userId => {
				return state.cards.filter(card => card.ownerId === userId)
			}
    },
    cardById (state) {
      return cardId => {
        return state.cards.find(card => card.id === cardId)
      }
		},
		end (state) {
			return state.end || null
		}
  }
}

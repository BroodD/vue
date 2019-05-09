// import Vue from 'vue'
import * as fb from 'firebase'
import { Cards } from '@/class/Mixin'

export default {
  state: {
		cards: [],
		userCards: [],
		visitCards: [],
		end: null,
		userEnd: null,
		visitEnd: null,
		single: null
  },
  mutations: {
    createCard (state, payload) {
      state.cards.unshift(payload)
    },
    loadCards (state, payload) {
			state.cards = payload
		},
		set(state, { v, val }) {
			state[v] = val
		},
  },
  actions: {
    async createCard ({commit, getters}, payload) {
      commit('clearError')
			commit('setLoading', true)

			var base = await fb.database().ref()
			
      try {
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
				newCard.create = -Date.now()
				var key = await base.child('cards').push(newCard).key
					
				var imageSrc = []
				const files = payload.files

				// const key = await base.child('cards').push().key
				// console.log(key)
				
				for (let i = 0; i < files.length; i++) {
					let imageExt = files[i].name.slice(files[i].name.lastIndexOf('.') + 1)
					let path = `cards/${key}_${i}.${imageExt}`
					
					let fileData = await fb.storage().ref(path).put(files[i])
						.then(snapshot => snapshot.ref.getDownloadURL())
						.then(url => imageSrc.push(url))
				}
				
				newCard.img = imageSrc

				base.child('cards/' + key).update({
					img: imageSrc
				})
				
				// await base.child('cards').push(newCard)

        newCard.ownerName = getters.user.name
				newCard.ownerImg = getters.user.image
				newCard.id = key
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
		async deleteCard({ commit, getters }, { id, ownerId, images }) {
			commit('clearError')
			commit('setLoading', true)

			var uid = getters.userId
			// console.log('deleteCard [id, ownerId, images]', id, ownerId, images)

			try {
				if (uid === ownerId) {
					var base = await fb.database().ref();
					var update = {};

					update['cards/' + id] = null
					update['users/' + ownerId + '/cards' + id] = null
					base.update(update)

					if(images) {
						images.forEach(s => {
							let indq = s.indexOf('?')
							let inde = s.lastIndexOf('cards%2F', indq) + 8
							let name = s.slice(inde, indq)
							// console.log('deleteCard [indq, inde, name]', indq, inde, name)
							fb.storage().ref("cards/" + name).delete()
						})
					}

					commit('setLoading', false)
					commit('setError', { msg: 'Card delete', color: 'red' })
				} else {
					commit('setLoading', false)
					commit('setError', 'You must be author this card')
				}
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async editCard({ commit, getters }, { id, update, orderImg, files }) {
			// TODO check security

			commit('clearError')
			commit('setLoading', true)

			// var uid = getters.userId
			// console.log('deleteCard [id, ownerId, images]', id, ownerId, images)

			try {
				// if (uid === ownerId) {
					var base = await fb.database().ref();
					var imageSrc = []

				console.log("EditCard [id, update, orderImg, files]", id, update, orderImg, files)

					if(files.length) {
						console.log('files true')
						var imgVal = await base
							.child("cards/" + id + "/img")
							.once("value")
						var img = await imgVal.val()

						if(img) {
							console.log('img true')
							for (let i = 0; i < img.length; i++) {
								console.log('deleteImg', i)
								let indq = img[i].indexOf("?")
								let inde = img[i].lastIndexOf("cards%2F", indq) + 8
								let name = img[i].slice(inde, indq)
								await fb
									.storage()
									.ref("cards/" + name)
									.delete()
							}
						}

						var imageSrc = []
						for (let i = 0; i < files.length; i++) {
							console.log('filePut', i)
							let imageExt = files[i].name.slice(files[i].name.lastIndexOf('.') + 1)
							let path = `cards/${id}_${i}.${imageExt}`
							
							await fb.storage().ref(path).put(files[i])
								.then(snapshot => snapshot.ref.getDownloadURL())
								.then(url => imageSrc.push(url))
						}
						base.child('cards/' + id).update({
							...update,
							img: imageSrc
						})
					} else if (orderImg.length) {
						console.log('orderImg true')
						base.child('cards/' + id).update({
							...update,
							img: orderImg
						})
					} else {
						console.log('else true')
						base.child('cards/' + id).update({
							...update,
						})
					}

					commit('setLoading', false)
					commit('setError', { msg: 'Card update', color: 'primary' })
				// } else {
				// 	commit('setLoading', false)
				// 	commit('setError', 'You must be author this card')
				// }
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
    async fetchCards ({commit, getters}, endAt) {
      commit('clearError')
			commit('setLoading', true)
			

			console.log('fetchCards [endAt]', endAt)

      try {
				var resultCards = [],
					end = [],
					base = await fb.database().ref()
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
						if (e.key != endAt) {
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
											{ length: e.val().like.length, red },
											{ length: e.val().visit.length, red: visit },
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
				commit('set', { v: 'end', val: end[0] })
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

			console.log('userCards [id, user, endAt]', id, user, endAt)

			try {
				var base = await fb.database().ref(),
						_cards = base.child("cards"),
						_userCards,
						end = [],
						resultCards = []

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

				resultCards = resultCards.concat(getters.get('userCards'))

				commit('set', { v: 'userCards', val: resultCards })
				commit('set', { v: 'userEnd', val: end[0] })
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchVisit({ commit, getters }, endAt) {
			commit('clearError')
			commit('setLoading', true)

			console.log('fetchVisit [endAt]', endAt)

			try {
				var base = await fb.database().ref(),
						uid = getters.userId,
						_cards = base.child("cards"),
						_visits,
						_users = base.child("users"),
						resultCards = [],
						end = []

				if (endAt) {
					_visits = base
						.child("users/" + uid + "/visit")
						.orderByKey()
						.limitToLast(4)
						.endAt(endAt)
				} else {
					_visits = base
						.child("users/" + uid + "/visit")
						.orderByKey()
						.limitToLast(3)
				}

				await _visits.once("value", visit => {
					visit.forEach( e => {
						if(e.key != endAt) {
							end.push(e.key)
							_cards.child(e.key).once("value", card => {
								let red = card.val().like[uid] ? true : false;
								let visit = card.val().visit[uid] ? true : false;

								_users.child(card.val().ownerId).once('value', user => {
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
											user.val().login,
											user.val().image,
											card.val().img,
											e.key
										)
									)
								})
							})
						}
					})
				})

				resultCards = resultCards.concat(getters.get('visitCards'))

				commit('set', { v: 'visitCards', val: resultCards})
				commit('set', { v: 'visitEnd', val: end[0]})
				commit('setLoading', false)
			} catch(error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async fetchSingle({ commit, getters }, id) {
			commit('clearError')
			commit('setLoading', true)

			console.log('fetchSingle [id]', id)

			try {
				var base = await fb.database().ref(),
					uid = getters.userId,
					_cards = base.child("cards/" + id),
					_users = base.child("users"),
					resultCards

				await fb.database().ref("cards/" + id).once("value", card => {
						let red = card.val().like[uid] ? true : false;
						let visit = card.val().visit[uid] ? true : false;

						_users.child(card.val().ownerId).once('value', user => {
							resultCards = new Cards(
									card.val().title,
									card.val().desc,
									card.val().ownerId,
									card.val().time,
									{ length: card.val().like.length, red },
									{ length: card.val().visit.length, red: visit },
									card.val().people,
									card.val().comments,
									user.val().login,
									user.val().image,
									card.val().img,
									id
								)
							commit('set', { v: 'single', val: resultCards })
						})
					})
					
				console.log(resultCards)
				// commit('set', { v: 'single', val: resultCards[0] })
				commit('setLoading', false)
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async toggleLike({ commit, getters }, { id, length, red }) {
			commit('clearError')
			commit('setLoading', true)
			
			var user = getters.userId

			try {
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

					// commit('toggleLike', { id, red })
					commit('setLoading', false)
				} else {
					commit('setLoading', false)
					commit('setError', 'You must be logined')
				}
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async toggleVisit({ commit, getters }, { id, length, red }) {
			commit('clearError')
			commit('setLoading', true)
			
			var user = getters.userId

			try {
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

					// commit('toggleVisit', { id, red })
					commit('setLoading', false)
				} else {
					commit('setLoading', false)
					commit('setError', 'You must be logined')
				}
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
		async addComment ({commit, getters}, { id, text, length }) {
			commit('clearError')
			commit('setLoading', true)

			var user = getters.userId

			try {
				if (user) {
					var base = await fb.database().ref();
					var update = {};

					update['cards/' + id + '/comments'] = length + 1
					base.update(update)

					var key = base.child('comments/' + id).push({
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
			} catch (error) {
				commit('setError', error.message)
				commit('setLoading', false)
				throw error
			}
		},
  },
  getters: {
    cards (state) {
      return state.cards
    },
		get (state) {
			return type => {
				return state[type]
			}
		}
  }
}

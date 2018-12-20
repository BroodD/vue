// import Vue from 'vue'
import * as fb from 'firebase'

class Cards {
	constructor(title, desc, ownerId, time, date, like, visit, people, commLength = null, ownerName = null, ownerImg = null, img = null, id = null) {
		this.title = title
		this.desc = desc
		this.ownerId = ownerId
		this.time = time
		this.date = date
		this.like = like
		this.visit = visit
		this.people = people
		this.commLength = commLength
		this.ownerName = ownerName
		this.ownerImg = ownerImg
		this.img = img
		this.id = id
	}
}

export default {
  state: {
		cards: [],
		otherCard: {
			comments: [],
			// commLength: 0
		}
  },
  mutations: {
    createCard (state, payload) {
      state.cards.unshift(payload)
    },
    loadCards (state, payload) {
			state.cards = payload
		},
		toggleLike (state, id) {
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
		toggleVisit (state, { id, stage }) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			if (stage)
				card.visit--
			else
				card.visit++
		},
		loadComments (state, payload) {
			state.otherCard.comments = payload
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
		}
  },
  actions: {
    async createCard ({commit, getters}, payload) {
      commit('clearError')
			commit('setLoading', true)

      try {
				// title, desc, ownerId, time, date, like, visit, people, commLength, ownerName = null, ownerImg = null, img = null, id = null
        const newCard = new Cards(
          payload.title,
          payload.desc,
          getters.userId,
          payload.time,
					payload.date,
          { length: 0 },
          { length: 0 },
					payload.people,
        )

        let imageSrc = []
        const images = payload.images
  			const files = payload.files
				const key = await fb.database().ref('cards').push().key
				
				for (let i = 0; i < images.length; i++) {
					let imageExt = images[i].name.slice(images[i].name.lastIndexOf('.') + 1)
				
					let fileData = await fb.storage().ref(`cards/${key}_${i}.${imageExt}`).put(files[i])
						.then(snapshot => snapshot.ref.getDownloadURL())
						.then(url => imageSrc.push(url))
				}
				
				//await fb.database().ref('cards').child(card.key).child('img').push(imageSrc)
				// await fb.database().ref('cards').child(card.key).child('img').update(imageSrc)
				newCard.img = imageSrc
				newCard.comments = { length: 0 }
				// newCard.id = key
				await fb.database().ref('cards').push(newCard)

				newCard.comments = null
        newCard.ownerName = getters.user.name
        newCard.ownerImg = getters.user.image

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

      var resultCards = []

      try {
				var _cards

				if (endAt) {
					_cards = await fb
						.database()
						.ref("cards")
						.orderByKey()
						// .limitToLast(3)
						// .endAt(endAt)
				} else {
					_cards = await fb
						.database()
						.ref("cards")
						.orderByKey()
						// .limitToLast(3)
				}

				// var _cards = await fb.database().ref('cards').orderByKey().limitToLast(4).endAt('-LTmPiKMZA7XRXUfCj_f')
				var _users = await fb.database().ref('users')
				
				_cards.once('value', snap => {
          snap.forEach(e => {
  					_users.child(e.val().ownerId).once('value', user => {
							let red = e.val().like[getters.userId] ? true : false;
  						resultCards.push(
  							new Cards(
  								e.val().title,
  								e.val().desc,
  								e.val().ownerId,
  								e.val().time,
									e.val().date,
  								{length: e.val().like.length, red},
  								e.val().visit.length,
  								e.val().people,
									e.val().comments.length,
  								user.val().name,
  								user.val().image,
  								e.val().img,
  								e.key
  							)
							)
            })
					})
				})
				
        commit('loadCards', resultCards)
				commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
				commit('setLoading', false)
        throw error
      }
		},
		async toggleLike({ commit, getters }, { id, length }) {
			commit('clearError')
			commit('setLoading', true)
			
			const user = getters.userId

			if( user ) {
				await fb.database().ref('cards/' + id + '/like/').child(user).once('value')
					.then(s => {
						if(s.val())
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
		async toggleVisit({ commit, getters }, { id, length }) {
			commit('clearError')
			commit('setLoading', true)
			
			var user = getters.userId
			var stage = false

			if( user ) {
				var base = await fb.database();
				base.ref('cards/' + id + '/visit/').child(user).once('value')
					.then(s => {
						if(s.val())
							// fb.database().ref('cards/' + id + '/like/').child(user).remove(),
							base.ref('cards/' + id + '/visit/').update({
								[user]: null,
								length: length - 1
							}),
							stage = true,
							base.ref('users/' + user + '/visit').update({
								[id]: null
							})
						else
							base.ref('cards/' + id + '/visit/').update({
								[user]: 1,
								length: length + 1,
							}),
							base.ref('users/' + user + '/visit').update({
								[id]: 1
							})
					})
				commit('toggleVisit', { id, stage })
				commit('setLoading', false)
			} else {
				commit('setLoading', false)
				commit('setError', 'You must be logined')
			}
		},
		async fetchComments({ commit }, { id }) {
			commit('clearError')
			commit('setLoading', true)

			var comments = []

			var _cards = await fb.database().ref('cards/' + id + '/comments')
			var _users = await fb.database().ref('users')

			/*
			cards
				- LTRULzL5608tctiKkAa
					comments
						- LTcwTEQoA80xBeyCTlu          <-- comment
							7YiH9GYOIlWy1iPok4aa1xW7QhX2: <-- uid   "awd"  <-- [comment][uid]
						- LTd1LiPJJxPpXOF5DQw
							7YiH9GYOIlWy1iPok4aa1xW7QhX2: "okey let me go"
						length: 1
			*/
			_cards.once("value", snap => {
				if (typeof snap.val() == "object" && snap.val())
					// see up ^
					Object.keys(snap.val()).map(comment => {
						Object.keys(snap.val()[comment]).map(uid => {
							_users.child(uid).once("value", user => {
								comments.push({
									id: comment,
									name: user.val().name,
									img: user.val().image,
									text: snap.val()[comment][uid]
								});
							});
						});
					});
			});

			commit('loadComments', comments)
			commit('setLoading', false)
		},
		async addComment ({commit, getters}, { id, text, length }) {
			commit('clearError')
			commit('setLoading', true)

			var user = getters.userId
			var userInfo

			if (user) {
				var key = fb.database().ref('cards/' + id + '/comments/').push({
					[user]: text
				}).key
				
				fb.database().ref('cards/' + id + '/comments/').update({
					// [user]: text,
					length: length + 1,
				})

				await fb.database().ref('users').child(user).once("value", u => {
					userInfo = {
						id: user,	
						name: u.val().name,
						img: u.val().image
					}
				});

				commit('addComment', { key, text, user: userInfo, id })
				commit('setLoading', false)
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
		otherCard (state) {
			return state.otherCard
		}
  }
}

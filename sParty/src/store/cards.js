import Vue from 'vue'
import * as fb from 'firebase'

class Cards {
  constructor (title, desc, ownerId, time, date, like, visit, people, ownerName = null, ownerImg = null, img = null, id = null) {
    this.title = title
    this.desc = desc
    this.ownerId = ownerId
    this.time = time
    this.date = date
		this.like = like
		this.visit = visit
		this.people = people
    this.ownerName = ownerName
    this.ownerImg = ownerImg
    this.img = img
    this.id = id
  }
}

export default {
  state: {
		cards: []
  },
  mutations: {
    createCard (state, payload) {
      state.cards.unshift(payload)
    },
    loadCards (state, payload) {
      state.cards = payload
		},
		toggleLike (state, {user, id}) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			if (card.like[user])
				Vue.delete(card.like, user),
				Vue.set(card.like, 'length', card.like.length - 1)
			else 
				Vue.set(card.like, user, id),
				Vue.set(card.like, 'length', card.like.length + 1)
		},
		// addComment (state, {id, user, text}) {
		// 	const card = state.cards.find(c => {
		// 		return c.id === id
		// 	})
		// 	card.comments.
		// }
  },
  actions: {
    async createCard ({commit, getters}, payload) {
      commit('clearError')
			commit('setLoading', true)

      try {
        // title, desc, ownerId, time, date, like, visit, people, ownerName, ownerImg, img = null, id = null
        const newCard = new Cards(
          payload.title,
          payload.desc,
          getters.userId,
          payload.time,
          payload.date,
          [ getters.userId ],
          [ payload.visit ],
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
				newCard.id = key
				await fb.database().ref('cards').push(newCard)
				
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
    async fetchCards ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultCards = []

      try {
				var _cards = await fb.database().ref('cards').orderByKey()
				var _users = await fb.database().ref('users')
				// _cards.on('value', snap => {
				// 	console.log(snap.val())
				// })
				
				_cards.once('value', snap => {
					// console.log('----', snap.val())
          snap.forEach(e => {
  					_users.child(e.val().ownerId).once('value', user => {
  						resultCards.push(
  							new Cards(
  								e.val().title,
  								e.val().desc,
  								e.val().ownerId,
  								e.val().time,
  								e.val().date,
  								e.val().like,
  								e.val().visit,
  								e.val().people,
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
		async toggleLike ({commit, getters}, id, length) {
			commit('clearError')
			commit('setLoading', true)
			
			const user = getters.userId
			console.log(length)

			if( user ) {
				var fbVal = await fb.database().ref('cards/' + id + '/like/').child(user).once('value')
				var k = fbVal.val() == null ? null : Object.keys(fbVal.val())[0];

				console.log(k, fbVal.val())

				if(k == null)
					// await fb.database().ref('cards/' + id + '/like/').child(user).remove(),
					await fb.database().ref('cards/' + id + '/like/').update({
						[user]: null,
						// length: length - 1
					})
				else
					await fb.database().ref('cards/' + id + '/like/').update({
						[user]: 1,
						// length: length + 1
					})
				commit('toggleLike', {user, id})
				commit('setLoading', false)
			} else {
				commit('setLoading', false)
				commit('setError', 'You must be logined')
			}
		},
		// async addComment ({commit, getters}, text) {
		// 	commit('clearError')
		// 	commit('setLoading', true)
			
		// 	const user = getters.user

		// 	if (user.id) {
		// 		const com = {
		// 			ownerId: user.id,
		// 			ownerName: user.name,
		// 			ownerImg: user.image,
		// 			text
		// 		}

		// 		const comment = await fb.database().ref('cards/' + id + '/comments').push(com)
		// 		// commit('addComment', { comment.key, ...com })
		// 		commit('setLoading', false)
		// 	} else {
		// 		commit('setLoading', false)
		// 		commit('setError', 'You must be logined')
		// 	}
		// }
  },
  getters: {
    cards (state) {
      return state.cards
    },
    myCards (state, getters) {
      return state.cards.filter(card => {
        return card.ownerId === getters.userId
      })
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
    }
  }
}

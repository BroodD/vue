import * as fb from 'firebase'

class Cards {
  constructor (title, desc, ownerId, time, date, like, visit, people, ownerName, ownerImg, img = null, id = null) {
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
      state.cards.push(payload)
    },
    loadCards (state, payload) {
      state.cards = payload
		},
		toggleLike (state, {user, id}) {
			const card = state.cards.find(c => {
				return c.id === id
			})
			let index = card.like.lastIndexOf(user) 
			if (index == -1)
				card.like.push(user)
			else 
				card.like.splice(index, 1)
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
          getters.user.name,
					getters.user.image,
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
					

				// commit('createCard', {
				// 	...newCard,
				// 	// img: imageSrc,
				// 	id: card.key,
				// })
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
				var _cards = await fb.database().ref().child('cards').orderByKey()
				var _users = await fb.database().ref().child('users')

				// _cards.on('value', snap => {
				// 	console.log(snap.val())
				// })
				
				_cards.on('child_added', snap => {
					// console.log('----', snap.val())
					_users.child(snap.val().ownerId).once('value', user => {
						resultCards.push(
							new Cards(
								snap.val().title,
								snap.val().desc,
								snap.val().ownerId,
								snap.val().time,
								snap.val().date,
								snap.val().like,
								snap.val().visit,
								snap.val().people,
								user.val().name,
								user.val().image,
								snap.val().img,
								snap.key
							)
						)
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
		async toggleLike ({commit, getters}, id) {
			commit('clearError')
			commit('setLoading', true)
			
			const user = getters.userId

			if( user ) {
				// try
				// async code database...
				// await fb.database().ref('cards/' + id + '/like').update({
				// 	'10': '9012'
				// })
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

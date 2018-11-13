import * as fb from 'firebase'

class Cards {
  constructor (title, desc, ownerId, time, date, like, visit, people, img = null, id = null, ownerName, ownerImg) {
    this.title = title
    this.desc = desc
    this.ownerId = ownerId
    this.time = time
    this.date = date
		this.like = like
		this.visit = visit
		this.people = people
		this.img = img
    this.id = id
    this.ownerName = ownerName
    this.ownerImg = ownerImg
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
      console.log(state.cards)
      console.log(id)
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
			
			const images = payload.images
			let imageSrc = []

      try {
				// title, desc, ownerId, time, date, like, visit, people, img = null, id = null
        const newCard = new Cards(
					payload.title,
					payload.desc,
					getters.userId,
					payload.time,
					payload.date,
					[ getters.userId ],
					[ payload.visit ],
					payload.people,
					''
				)

				const card = await fb.database().ref('cards').push(newCard)

				for (let i = 0; i < images.length; i++) {
					let imageExt = images[i].name.slice(images[i].name.lastIndexOf('.') + 1)

					let fileData = await fb.storage().ref(`cards/${card.key}_${i}.${imageExt}`).put(images[i])
						.then(snapshot => snapshot.ref.getDownloadURL())
						.then(url => imageSrc.push(url))
				}

				// await fb.database().ref('cards').child(card.key).child('img').push(imageSrc)
				await fb.database().ref('cards').child(card.key).child('img').update(imageSrc)
					
        commit('createCard', {
					...newCard,
					id: card.key,
					img: imageSrc,
					ownerName: getters.user.name,
					ownerImg: getters.user.image
				})
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
        const fbVal = await fb.database().ref('cards').once('value')
				const cards = fbVal.val()

        const fbValUser = await fb.database().ref('users').once('value')
				const users = fbValUser.val()
				
        Object.keys(cards).forEach(key => {
					const card = cards[key]
					const user = users[card.ownerId]
          resultCards.push(
						new Cards(
							card.title,
							card.desc,
							card.ownerId,
							card.time,
							card.date,
							card.like,
							card.visit,
							card.people,
							card.img,
							key,
							user.name,
							user.image
						)
					)
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

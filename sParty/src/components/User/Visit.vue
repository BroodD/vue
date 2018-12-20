<template>
  <v-container grid-list-md>
		<v-layout row wrap>
			<v-flex xs12 md6
				v-for="card in userCards"
				:key="card.id"
			>
				<Card
					:card="card"
				/>
				<!-- <v-btn
					fab
					dark
					small
					color="red"
				>
					<v-icon>delete</v-icon>
				</v-btn> -->
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
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
	data() {
		return {
			userCards: null
		}
	},
	async created () {
		var uid = this.$store.getters.userId
		var _cards = await fb.database().ref("cards")
		var _users = await fb.database().ref("users/" + uid + "/visit")
		var resultCards = []

		_users.once("value", user => {
			user.forEach(e => {
				_cards.child(e.key).once("value", card => {
					let red = card.val().like[uid] ? true : false
					resultCards.push(
						new Cards(
							card.val().title,
							card.val().desc,
							card.val().ownerId,
							card.val().time,
							card.val().date,
							{ length: card.val().like.length, red },
							card.val().visit.length,
							card.val().people,
							card.val().comments.length,
							user.val().name,
							user.val().image,
							card.val().img,
							card.key
						)
					)
				})
			})
		})
		this.userCards = resultCards
	}
}
</script>

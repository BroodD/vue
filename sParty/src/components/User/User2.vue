<template>
  <v-container grid-list-md>
		<v-layout row wrap v-if="user">
			<v-flex sm5 justify-center pb-5 class="tac">
				<v-avatar
					size="200"
				>
					<v-img position="top left" :src="user.image" alt="avatar" />
				</v-avatar>
			</v-flex>
			<v-flex sm>
				<h1>{{ user.login }}</h1>
				<h5>{{ user.name }}</h5>
				<p class="mt-3">{{ user.bio }}</p>
				<v-layout row wrap>
					<v-flex sm>
						<p><strong>{{ userCards.length }}</strong> cards</p>
					</v-flex>
					<v-flex sm>
						<p><strong>12k</strong> followers</p>
					</v-flex>
					<v-flex sm>
						<p><strong>5,805</strong> following</p>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
		
		<v-layout row wrap>
			<v-flex xs12 md6
				v-for="card in userCards"
				:key="card.id"
			>
				<Card
					:card="card"
				/>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
import * as fb from 'firebase'
import { User, Cards } from '@/class/Mixin'

export default {
	props: ['id'],
	data() {
		return {
			userCards: [],
			user: null
		}
	},
	async created () {
		this.change()
	},
	methods: {
		async change() {
			var user = this.$store.getters.user

			if( this.id != user.id) {
				// this.$store.dispatch('otherUser', this.id)

				var fbVal = await fb.database().ref('users/' + this.id).once('value')
				var userInfo = fbVal.val()
				user = new User(this.id, userInfo.login, userInfo.name, userInfo.image, userInfo.bio);
			}

			this.user = user

			var _cards = await fb
					.database()
					.ref("cards")
					.orderByChild("ownerId")
					.equalTo(this.id)
			var resultCards = []

			_cards.once("value", c => {
				c.forEach(e => {
					let red = e.val().like[this.$store.getters.userId] ? true : false;
					resultCards.push(
						new Cards(
							e.val().title,
							e.val().desc,
							e.val().ownerId,
							e.val().time,
							e.val().date,
							{length: e.val().like.length, red },
							e.val().visit.length,
							e.val().people,
							e.val().comments.length,
							user.name,
							user.image,
							e.val().img,
							e.key
						)
					)
				})
			})
			this.userCards = resultCards
		}
	}
}
</script>

<template>
  <v-container grid-list-md>
		<v-layout row wrap justify-center>
			<v-flex sm5 lg3 justify-center pb-5 class="tac">
				<v-avatar
					size="200"
				>
					<v-img position="top left" :src="user.image" alt="avatar" />
				</v-avatar>
			</v-flex>
			<v-flex sm lg4>
				<v-layout row wrap>
					<v-flex>
						<h1>{{ user.login }}</h1>
					</v-flex>
					<v-spacer></v-spacer>

					<v-flex>
						<v-btn
							color="primary"
							@click="toggFollow"
						>
							<span>{{ user.follow ? 'Following' : 'Follow' }}</span>
							<v-icon right>{{ user.follow ? 'check' : 'star' }}</v-icon>
						</v-btn>
					</v-flex>
					<v-spacer></v-spacer>
				</v-layout>

				<h3>{{ user.name }}</h3>
				<p class="mt-3 pre">{{ user.bio }}</p>
				<v-layout row wrap>
					<v-flex>
						<strong>{{ userCards.length }}</strong> cards
					</v-flex>
					<v-spacer></v-spacer>

					<v-flex>
						<strong>12k</strong> followers
					</v-flex>
					<v-spacer></v-spacer>

					<v-flex>
						<strong>5,805</strong> following
					</v-flex>
					<v-spacer></v-spacer>
				</v-layout>
			</v-flex>
		</v-layout>
		
		<v-layout row wrap justify-center class="card-wrap">
			<v-flex xs12 md8
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

		<v-layout row wrap>
			<v-flex class="tac">
				<v-btn
					round
					large
					color="primary"
					@click="reload"
					:loading="loading"
					:disabled="loading"
				>
					show more
				</v-btn>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
export default {
	props: ['id'],
	computed: {
		userCards () {
			return this.$store.getters.cards
		},
		user () {
			if( this.id != this.$store.getters.userId)
				return this.$store.getters.otherUser
			return this.$store.getters.user
		},
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		toggFollow() {
			this.user.follow = !this.user.follow
		},
		reload() {
			var endAt = this.$store.getters.end
			if(endAt)
				this.$store.dispatch('userCards', { id: this.id, user: this.user, endAt })
			else
				this.$store.dispatch('setError', { msg: 'No more cards', color: 'orange' })
		},
	},
	async beforeMount () {
		if( this.id != this.$store.getters.userId)
			await this.$store.dispatch('otherUser', this.id)

		this.$store.commit('loadCards', [])
		this.$store.commit('setEnd', 0)
		this.$store.dispatch('userCards', { id: this.id, user: this.user })
	}
}
</script>

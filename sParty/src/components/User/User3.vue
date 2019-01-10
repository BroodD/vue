<template>
  <v-container grid-list-md>
		<v-layout row wrap>
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
		
		<v-layout row wrap v-if="userCards">
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
		<v-layout v-else>
			<v-card class="elevation-10">
				<v-card-title>
					<div class="headline">No cards</div>
				</v-card-title>
			</v-card>
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
		}
	},
	mounted () {
		this.$store.dispatch('userCards', { id: this.id, user: this.user })

		if( this.id != this.$store.getters.userId)
			this.$store.dispatch('otherUser', this.id)
	}
}
</script>

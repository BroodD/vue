<template>
  <v-container grid-list-md>
		<v-layout row wrap>
			<v-flex sm5 lg3 justify-center pb-5 class="tac">
				<v-avatar
					size="200"
				>
					<v-img position="top left" :src="user.image" alt="avatar" />
				</v-avatar>
			</v-flex>
			<v-flex sm lg4>
				<v-layout row wrap align-content-start>
						<h1>{{ user.login }}</h1>
						<v-spacer></v-spacer>

						<v-btn
							color="primary"
							@click="toggFollow"
						>
							<span>{{ user.follow ? 'Following' : 'Follow' }}</span>
							<v-icon right>{{ user.follow ? 'check' : 'star' }}</v-icon>
						</v-btn>
						<v-spacer></v-spacer>
				</v-layout>

				<h5>{{ user.name }}</h5>
				<p class="mt-3" style="white-space: pre-wrap;">{{ user.bio }}</p>
				<v-layout row wrap>
						<p><strong>{{ userCards.length }}</strong> cards</p>
						<v-spacer></v-spacer>

						<p><strong>12k</strong> followers</p>
						<v-spacer></v-spacer>

						<p><strong>5,805</strong> following</p>
						<v-spacer></v-spacer>
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
export default {
	props: ['id'],
	computed: {
		userCards () {
			const id = this.id
			return this.$store.getters.userCards(id)
		},
		user () {
			if( this.id != this.$store.getters.userId)
				return this.$store.getters.otherUser
			return this.$store.getters.user
		},
	},
	methods: {
		toggFollow() {
			this.user.follow = !this.user.follow
		}
	},
	async created () {
		if( this.id != await this.$store.getters.userId)
			this.$store.dispatch('otherUser', this.id)
	}
}
</script>

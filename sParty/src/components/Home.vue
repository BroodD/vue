<template>
  <v-container grid-list-md>
		<v-layout row wrap justify-center class="card-wrap">
			<v-flex xs12 md8
				v-for="card in cards"
				:key="card.id"
			>
				<Card
					:card="card"
				/>
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
	computed: {
		cards () {
			return this.$store.getters.cards
		},
		userId () {
			return this.$store.getters.userId
		},
		loading () {
			return this.$store.getters.loading
		}
		// endAt () {
		// 	return this.$store.getters.end
		// }
	},
	methods: {
		reload() {
			var endAt = this.$store.getters.end
			if(endAt)
				this.$store.dispatch('fetchCards', endAt)
			else
				this.$store.dispatch('setError', { msg: 'No more cards', color: 'orange' })
			// this.$store.dispatch('fetchCards', this.cards[this.cards.length - 1].id)
			// this.$store.dispatch('setError', { msg: 'Reload cards', color: 'primary' })
		},
	},
	beforeCreate () {
		console.log('create')
		this.$store.commit('loadCards', [])
		this.$store.dispatch('fetchCards')
	}
}
</script>

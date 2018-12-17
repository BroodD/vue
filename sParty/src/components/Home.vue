<template>
  <v-container grid-list-md>
		<v-layout row wrap>
			<v-flex class="tac">
				<v-btn
					color="primary"
					dark
					fab
					small
					@click="reload"
				>
					<v-icon>refresh</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row wrap>
			<v-flex xs12 md6
				v-for="card in cards"
				:key="card.id"
				v-scroll="onScroll"
			>
				<Card
					:card="card"
				/>
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
		}
	},
	methods: {
		reload() {
			this.$store.dispatch('fetchCards', this.cards[this.cards.length - 1].id)
			// this.$store.dispatch('setError', { msg: 'Reload cards', color: 'primary' })
		},
		onScroll() {
			// console.log('scrol')
		}
	}
}
</script>

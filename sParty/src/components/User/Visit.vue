<template>
  <v-container grid-list-md>
		<v-layout row wrap justify-center v-if="cards.length" class="card-wrap">
			<v-flex xs12 md8
				v-for="card in cards"
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
	computed: {
		cards () {
			return this.$store.getters.cards
		}
	},
	beforeMount () {
		this.$store.commit('loadCards', [])
		this.$store.dispatch('fetchVisit')
	}
}
</script>

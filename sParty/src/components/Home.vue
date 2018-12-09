<template>
  <v-container grid-list-md>
		<v-layout row wrap>
			<Card
				:card="card"
				v-for="card in cards"
				:key="card.id"
				@toggle-like="toggLike"
			/>
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
		toggLike (id) {
			this.$store.dispatch('toggleLike', id)
		}
	}
}
</script>

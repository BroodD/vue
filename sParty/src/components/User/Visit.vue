<template>
  <v-container grid-list-md>
		<v-layout row wrap v-if="cards.length">
			<v-flex xs12 md6
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
}
</script>

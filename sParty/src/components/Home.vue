<template>
  <v-container grid-list-md id="my" v-scroll:#scroll-target="onScroll">
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
  </v-container>
</template>

<script>
import { scroll } from '@/mixins/Mixin'

export default {
	mixins: [scroll],
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
	},
	methods: {
		reload() {
			var endAt = this.$store.getters.get('end')
			if(endAt)
				this.$store.dispatch('fetchCards', endAt)
			else
				this.$store.dispatch('setError', { msg: 'No more cards', color: 'orange' })
		},
	},
	// beforeCreate () {
	// 	console.log('create')
	// 	this.$store.commit('loadCards', [])
	// 	this.$store.dispatch('fetchCards')
	// }
}
</script>
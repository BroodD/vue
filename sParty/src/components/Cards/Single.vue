<template>
	<v-container grid-list-md v-if="card">
		<v-layout row wrap justify-center class="card-wrap">
			<v-flex xs12 md8>
				<Card :card="card" />
			</v-flex>

			<v-flex xs12 md8>
				<MembersList :id="id" :length="card.visit.length"></MembersList>
			</v-flex>

			<v-flex xs12 md8>
				<CommentsList :id="id" :length="card.comments"></CommentsList>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import * as fb from 'firebase'
import CommentsList from '@/components/Cards/CommentsList'
import MembersList from '@/components/Cards/MembersList'

export default {
	props: {
		id: String
	},
	components: {
		CommentsList,
		MembersList
	},
	computed: {
		card () {
			// return this.$store.getters.cardById(this.id)
			return this.$store.getters.get('single')
		}
	},
	async created () {
		await this.$store.dispatch('fetchSingle', this.id)

		var base = await fb.database().ref()
		base.child('cards/' + this.id + '/comments').on('value', e => {
			console.log('Single->commnets', this.card)
			this.card.comments = e.val()
		})
	},
}
</script> 
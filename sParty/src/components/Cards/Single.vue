<template>
	<v-container grid-list-md v-if="card">
		<v-layout row wrap>
			<v-flex xs12>
				<Card :card="card" />
			</v-flex>

			<v-flex xs12>
				<MembersList :id="id" :length="card.visit.length"></MembersList>
			</v-flex>

			<v-flex xs12>
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
	props: ['id'],
	components: {
		CommentsList,
		MembersList
	},
	data () {
		return {
			text: '',
		}
	},
	computed: {
		card () {
			return this.$store.getters.cardById(this.id)
		}
	}
}
</script> 
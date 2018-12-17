<template>
	<v-container grid-list-md v-if="card">
		<v-layout row wrap>
			<v-flex xs12>
				<Card :card="card" />
			</v-flex>
			<v-flex xs12>
				<v-card class="elevation-10" id="comments">
					<v-list>
						<template v-for="c in comments">
							<!-- <v-divider 	:key="c.id"></v-divider> -->
							<v-list-tile :key="c.id" avatar>
								<v-list-tile-avatar>
									<!-- <img :src="c.img"> -->
									<v-img position="top left" :src="c.img" alt="avatar" size="100" />
								</v-list-tile-avatar>

								<v-list-tile-content>
									<v-list-tile-title v-html="c.name"></v-list-tile-title>
									<v-list-tile-sub-title v-html="c.text"></v-list-tile-sub-title>
								</v-list-tile-content>
							</v-list-tile>
						</template>
						<v-textarea
							box
							label="Your comment"
							v-model="text"
							class="mt-2"
						></v-textarea>
						<v-btn color="primary" @click="addComment">Send</v-btn>
					</v-list>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	props: ['id'],
	data () {
		return {
			text: '',
		}
	},
	computed: {
		card () {
			return this.$store.getters.cardById(this.id)
		},
		comments () {
			return this.$store.getters.otherCard.comments
		},
		userId () {
			return this.$store.getters.userId
		}
	},
	methods: {
		toggLike ({id, length}) {
			this.$store.dispatch('toggleLike', {id, length})
		},
		toggVisit ({id, length}) {
			this.$store.dispatch('toggleVisit', {id, length})
		},
		addComment () {
			this.$store.dispatch('addComment', {id: this.id, text: this.text, length: this.card.commLength})
			this.text = ''
		}
	},
	created() {
		this.$store.dispatch('fetchComments', { id: this.id })
	}
}
</script>
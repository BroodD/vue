<template>
	<v-container fluid grid-list-md>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card
					class="elevation-12"
				>
					<v-layout row wrap>
						<v-flex md6>
							<v-card-title class="align-start">
								<div>
									<div class="headline">{{ card.title }}</div>
									<div class="grey--text">
										<span>Video game</span>
										<span>|</span>
										<span>only PRO</span>
									</div>
									<div class="grey--text">
										<span>Івано-Франкіськ</span>
										<span>|</span>
										<span>Калуш</span>
										<span>|</span>
										<span>Галич</span>
									</div>
								</div>
							</v-card-title>
							<div class="pa-3 pt-0 caption">
								{{ card.desc }}
							</div>

							<v-card-actions>
								<!-- <v-btn flat>
									<span>10023</span>
									<v-icon right>remove_red_eye</v-icon>
								</v-btn> -->
								<v-btn
									flat
									:color=" (card.visit !== undefined && card.visit.length < card.people ) ? 'red' : 'primary'"
								>
									<span v-if="card.visit !== undefined">{{ card.visit.length }} / {{ card.people }}</span>
									<span v-else>{{ card.people }}</span>
									<v-icon right>people</v-icon>
								</v-btn>
								<v-btn flat>
									<span>12</span>
									<v-icon right>mode_comment</v-icon>
								</v-btn>
								<v-btn 
									flat
									:color="card.like.lastIndexOf(userId) !== -1 ? 'red' : ''"
									@click="toggLike(card.id)"
								>
									<span>{{ card.like.length }}</span>
									<v-icon right>favorite</v-icon>
								</v-btn>
							</v-card-actions>
						</v-flex>

						<v-flex xs12 md6>
							<v-layout>
								<v-flex xs12>
									<v-img
										v-if="card.img.length == 1"
										:src="card.img[0]"
										max-height="400px"
										position="top"
									>
									</v-img>

									<v-layout
										v-else-if="card.img.length > 1"
									>
										<v-flex xs12 d-flex>
											<v-layout>
												<v-flex xs12>
													<v-carousel>
														<v-carousel-item
															v-for="(img, i) in card.img"
															:key="i"
															:src="img"
															position="top"
														></v-carousel-item>
													</v-carousel>
												</v-flex>
											</v-layout>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>
						</v-flex>

						<v-flex md6>
							<v-list>
								<template v-for="review in reviews">
									<!-- <v-divider
										v-else-if="item.divider"
										:inset="item.inset"
										:key="index"
									></v-divider> -->

									<v-list-tile
										:key="review.title"
										avatar
									>
										<v-list-tile-avatar>
											<img :src="review.avatar">
										</v-list-tile-avatar>

										<v-list-tile-content>
											<v-list-tile-title v-html="review.title"></v-list-tile-title>
											<v-list-tile-sub-title v-html="review.subtitle"></v-list-tile-sub-title>
										</v-list-tile-content>
									</v-list-tile>
								</template>
							</v-list>
							<v-textarea
								box
								label="Your comment"
								v-model="text"
							></v-textarea>
							<v-btn color="primary">Send</v-btn>
						</v-flex>
					</v-layout>
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
			reviews: [
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
					title: 'Brunch this weekend?',
					subtitle: "Ali Connors &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
					title: 'Summer BBQ4',
					subtitle: "to Alex, Scott, Jennifer &mdash; Wish I could come, but I'm out of town this weekend."
				},
				{
					avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
					title: 'Oui oui',
					subtitle: "Sandra Adams &mdash; Do you have Paris recommendations? Have you ever been?"
				},
			]
		}
	},
	computed: {
		card () {
			const id = this.id
			return this.$store.getters.cardById(id)
		},
		userId () {
			return this.$store.getters.userId
		}
	},
	methods: {
		toggLike (id) {
			this.$store.dispatch('toggleLike', id)
		},
		addComment () {
			// this.$store.dispatch('addComment', {id, text})
		}
	}
}
</script>
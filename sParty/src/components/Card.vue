<template>
	<v-container fluid grid-list-md>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card
					class="mx-auto"
				>
					<!-- <v-layout>
						<v-flex xs6 d-flex>
							<v-img
								src="https://cdn.vuetifyjs.com/images/ratings/fortnite1.png"
							></v-img>
						</v-flex>
						<v-flex xs6>
							<v-container
								grid-list-md
								pa-0
							>
								<v-layout wrap>
									<v-flex md7 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite2.png"
										></v-img>
									</v-flex>
									<v-flex md5 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite3.png"
										></v-img>
									</v-flex>
									<v-flex md5 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite4.png"
										></v-img>
									</v-flex>
									<v-flex md7 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite5.png"
										></v-img>
									</v-flex>
								</v-layout>
							</v-container>
						</v-flex>
					</v-layout> -->

					

					<v-layout row wrap>
						<v-flex md6>
							<v-card-title class="align-start">
								<div>
									<div class="headline">FORTNITE</div>
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
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum, impedit non possimus ducimus labore natus maxime in iure omnis esse nostrum aut. Est beatae, illum eligendi aliquam fuga magnam sunt minus blanditiis velit cumque debitis pariatur facere soluta distinctio voluptatem rem incidunt vitae ex magni, ab, vel perferendis? Sequi aperiam nisi voluptatem sapiente, iusto quis debitis aut, necessitatibus quam aliquid fugit dolores earum iste error dignissimos doloremque suscipit reiciendis repellendus neque eum voluptatibus ab et. Delectus consequatur laboriosam ut porro ipsam nemo vitae quaerat molestiae fugiat facere dicta, animi labore ea laborum, ipsum ratione. Consequuntur sequi voluptas explicabo dolorem, rerum minima illo commodi iste dolorum quis quae ex delectus nobis natus cum. In dolorem doloremque dolores repudiandae, odit rem corporis laborum corrupti quam. Enim voluptas perspiciatis non rem suscipit eos nisi culpa! Quo cum illum assumenda quod adipisci id suscipit sunt harum optio reiciendis, quae expedita praesentium laudantium facere quidem.
							</div>

							<v-card-actions>
								<!-- <v-btn flat>
									<span>10023</span>
									<v-icon right>remove_red_eye</v-icon>
								</v-btn> -->
								<v-btn flat color="green">
									<span>10 / 5</span>
									<v-icon right>people</v-icon>
								</v-btn>
								<v-btn flat>
									<span>12</span>
									<v-icon right>mode_comment</v-icon>
								</v-btn>
								<v-btn 
									flat
									:class="fav ? 'red--text' : ''"
									@click="fav = !fav"
								>
									<span>559</span>
									<v-icon right>favorite</v-icon>
								</v-btn>
							</v-card-actions>
						</v-flex>

						<v-flex md6>
							<v-layout>
								<v-flex xs12>
									<v-carousel>
										<v-carousel-item
											v-for="(photo,i) in photos"
											:key="i"
											:src="photo.src"
										></v-carousel-item>
									</v-carousel>
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
			photos: [
				{
					src: 'https://cdn.vuetifyjs.com/images/ratings/fortnite2.png'
				},
				{
					src: 'https://cdn.vuetifyjs.com/images/ratings/fortnite3.png'
				},
				{
					src: 'https://cdn.vuetifyjs.com/images/ratings/fortnite4.png'
				},
				{
					src: 'https://cdn.vuetifyjs.com/images/ratings/fortnite5.png'
				}
			],
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
	}
}
</script>
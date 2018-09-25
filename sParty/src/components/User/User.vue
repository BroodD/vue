<template>
  <v-container fluid grid-list-md>
		<v-layout row wrap>
			<v-flex xs12 sm6 md4>
				<v-card
					class="mx-auto"
				>
					<v-list>
						<v-list-tile
							avatar
						>
							<v-list-tile-avatar
								size="55"
								class="pr-3"
							>
								<img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title>Ivan Ostapov</v-list-tile-title>
								<v-list-tile-sub-title>06:40 20 April 2018</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>

					<v-divider></v-divider>
					<v-layout>
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
									<v-flex xs7 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite2.png"
										></v-img>
									</v-flex>
									<v-flex xs5 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite3.png"
										></v-img>
									</v-flex>
									<v-flex xs5 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite4.png"
										></v-img>
									</v-flex>
									<v-flex xs7 d-flex>
										<v-img
											src="https://cdn.vuetifyjs.com/images/ratings/fortnite5.png"
										></v-img>
									</v-flex>
								</v-layout>
							</v-container>
						</v-flex>
					</v-layout>
					<v-card-title class="align-start">
						<div>
							<div class="headline">FORTNITE</div>
							<div>
								<span class="grey--text">Video game</span>
								<span class="grey--text">PRO</span>
							</div>
							<div>
								<span class="grey--text">Івано-Франкіськ</span>
								<span class="grey--text">Калуш</span>
								<span class="grey--text">Галич</span>
							</div>
						</div>
					</v-card-title>
					<div class="pa-3 pt-0 caption">
						<em>Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.</em>
					</div>
					
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						
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
				</v-card>
			</v-flex>

			

			<v-flex xs12 sm6 md4>
				<v-card>
					<v-list>
						<v-list-tile
							avatar
						>
							<v-list-tile-avatar
								size="55"
								class="pr-3"
							>
								<img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title>Ivan Ostapov</v-list-tile-title>
								<v-list-tile-sub-title>06:40 20 April 2018</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>

					<v-divider></v-divider>

					<v-card-title>
						<div>
							<router-link to="/card/1">
								<div class="headline">Потрібно помогти скопати картоплю</div>
							</router-link>
						</div>
					</v-card-title>

					<v-card-text>
						В кінці баба Настя всіх помічників угостить борщем і самогоном!!
					</v-card-text>

					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						
						<!-- <v-btn flat>
							<span>10023</span>
							<v-icon right>remove_red_eye</v-icon>
						</v-btn> -->
						<v-btn flat color="red">
							<span>2 / 40</span>
							<v-icon right>people</v-icon>
						</v-btn>
						<v-btn flat>
							<span>2</span>
							<v-icon right>mode_comment</v-icon>
						</v-btn>
						<v-btn 
							flat
							:class="fav ? 'red--text' : ''"
							@click="fav = !fav"
						>
							<span>4</span>
							<v-icon right>favorite</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>

			<v-flex xs12 sm6 md4>
				<v-card>
					<v-list>
						<v-list-tile
							avatar
						>
							<v-list-tile-avatar
								size="55"
								class="pr-3"
							>
								<img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title>Ivan Ostapov</v-list-tile-title>
								<v-list-tile-sub-title>06:40 20 April 2018</v-list-tile-sub-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>

					<v-divider></v-divider>

					<router-link to="/card/1">
						<v-img
							src="http://rivne1.tv/pics2/1608/ui14724811631.jpg"
							height="200px"
						>
						</v-img>
					</router-link>

					<v-card-title>
						<div>
							<router-link to="/card/1">
								<div class="headline">Потрібно помогти скопати картоплю</div>
							</router-link>
						</div>
					</v-card-title>

					<v-card-text>
						В кінці баба Настя всіх помічників угостить борщем і самогоном!!
					</v-card-text>

					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						
						<!-- <v-btn flat>
							<span>10023</span>
							<v-icon right>remove_red_eye</v-icon>
						</v-btn> -->
						<v-btn flat color="red">
							<span>2 / 40</span>
							<v-icon right>people</v-icon>
						</v-btn>
						<v-btn flat>
							<span>2</span>
							<v-icon right>mode_comment</v-icon>
						</v-btn>
						<v-btn 
							flat
							:class="fav ? 'red--text' : ''"
							@click="fav = !fav"
						>
							<span>4</span>
							<v-icon right>favorite</v-icon>
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
export default {
	data: () => ({
		fav: true,
	})
}
</script>

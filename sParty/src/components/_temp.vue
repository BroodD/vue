				<v-card
					class="mb-2"
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
					<v-layout>
					</v-layout>
					<v-card-title class="align-start">
						<div>
							<router-link to="/card/1">
								<div class="headline">Go to play FORTNITE</div>
							</router-link>
							<div class="grey--text">
								<v-icon>explore</v-icon>
								<span>#Video game</span>
								<span>#only PRO</span>
							</div>
							<div class="grey--text">
								<v-icon>flag</v-icon>
								<span>#Івано-Франкіськ</span>
								<span>#Калуш</span>
								<span>#Галич</span>
							</div>
						</div>
					</v-card-title>
					<div class="pa-3 pt-0 caption">
						<em>Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.</em>
					</div>
					
					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn flat color="green">
							<span>10 / 5</span>
							<v-icon right>people</v-icon>
						</v-btn>
						<v-btn flat>
							<span>12</span>
							<v-icon right>chat</v-icon>
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
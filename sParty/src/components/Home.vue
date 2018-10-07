<template>
  <v-container grid-list-md>
		<v-layout row wrap>
			<v-flex xs12>

				<v-card class="mb-2" v-for="card in cards" :key="card.id">
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

					<!-- <router-link :to="'/card/'+card.id"> -->
					<!-- </router-link> -->

					<v-img
						v-if="!Array.isArray(card.img)"
						:src="card.img"
						max-height="400px"
						position="top"
					>
					</v-img>

					<v-layout
						v-else-if="card.img !== undefined"
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

					<v-card-title>
						<div>
							<router-link :to="'/card/'+card.id">
								<div class="headline">{{ card.title }}</div>
							</router-link>
						</div>
					</v-card-title>

					<v-card-text>
						{{ card.desc }}
					</v-card-text>

					<v-card-text>
						<div>
							<v-icon color="black">today</v-icon>
							<strong>11.10.2018</strong>
							<span>19:00 - 21:00</span>
						</div>
						<!-- <div class="">
							<v-icon>place</v-icon>
							<span>#Івано-Франкіськ</span>
							<span>#Калуш</span>
							<span>#Галич</span>
						</div> -->
					</v-card-text>

					<v-divider></v-divider>
					<v-card-actions>
						<v-spacer></v-spacer>
						
						<!-- <v-btn flat>
							<span>10023</span>
							<v-icon right>remove_red_eye</v-icon>
						</v-btn> -->
						<v-btn
							flat
							:color="card.visiter.visit < card.visiter.all ? 'red' : 'green'"
						>
							<span v-if="card.visiter.visit !== undefined">{{ card.visiter.visit }} / {{ card.visiter.all }}</span>
							<span v-else>{{ card.visiter.all }}</span>
							<v-icon right>people</v-icon>
						</v-btn>
						<v-btn flat>
							<span>2</span>
							<v-icon right>chat</v-icon>
						</v-btn>
						<v-btn 
							flat
							:color="card.like.indexOf(userId) !== -1 ? 'red' : ''"
							@click="toggleLike(card.like, userId)"
						>
							<span>{{ card.like.length }}</span>
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
		userId: '12',
		fav: true,

		cards: [
			{
				id: '154345',
				title: 'Go to play FORTNITE',
				desc: 'Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.',
				img: [
					'https://cdn.vuetifyjs.com/images/ratings/fortnite1.png',
					'https://cdn.vuetifyjs.com/images/ratings/fortnite2.png',
					'https://cdn.vuetifyjs.com/images/ratings/fortnite3.png',
					'https://cdn.vuetifyjs.com/images/ratings/fortnite4.png',
					'https://cdn.vuetifyjs.com/images/ratings/fortnite5.png',
				],
				like: [
					'12', '2123213', '523423', '34234', '2378', '235435', '435765', '453453', '3234'
				],
				visiter: {
					// visit: 55,
					all: 12
				}
			},
			{
				id: '1',
				title: 'IT-party (only Guru)',
				desc: 'Будем програмувати на HTM.... ',
				img: 'https://iowacitytales.files.wordpress.com/2010/11/dorkathon-5-lan-party-051.jpg',
				like: [
					'12', '2123213', '523423', '34234', '2378', '235435', '435765', '453453', '3234'
				],
				visiter: {
					visit: 2,
					all: 12
				}
			},
			{
				id: '2',
				title: 'IT-rally',
				desc: 'Вітаємо всіх ітшників, як завжди ми відкриваємо конференцію для початківців',
				img: 'https://s.dou.ua/img/announces/it-rally-starters-2017-img.png',
				like: [
					'1345', '12', '523423', '19565'
				],
				visiter: {
					visit: 143,
					all: 120
				}
			},
			{
				id: '3',
				title: 'Потрібно помогти скопати картоплю',
				desc: 'В кінці баба Настя всіх помічників угостить борщем і самогоном!!',
				img: 'http://rivne1.tv/pics2/1608/ui14724811631.jpg',
				like: [
					'1123', '2454', '523423', '123', '2346456', '345', '64458'
				],
				visiter: {
					visit: 2,
					all: 5
				}
			},
			{
				id: '4',
				title: 'Штурм ОДА',
				desc: 'Прийти бажано в балаклавах',
				// img: 'http://rivne1.tv/pics2/1608/ui14724811631.jpg',
				like: [
					'1123', '2454', '523423', '123', '2346456', '345', '64458'
				],
				visiter: {
					visit: 2,
					all: 5
				}
			}
		]
	}),
	methods: {
		toggleLike (array, id) {
			let index = array.indexOf(id)
			if(index == -1)
				array.push(id)
			else 
				array.splice(index, 1)
		}
	}
}
</script>

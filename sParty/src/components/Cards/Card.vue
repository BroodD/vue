<template>
	<v-flex xs12 md6>
		<v-card class="mb-2 elevation-10">
			<v-list>
				<router-link :to="'user/' + card.ownerId">
					<v-list-tile
						avatar
					>
						<v-avatar class="mr-3">
							<v-img position="top left" :src="card.ownerImg"></v-img>
						</v-avatar>

						<v-list-tile-content>
							<v-list-tile-title>{{ card.ownerName }}</v-list-tile-title>
							<!-- <v-list-tile-sub-title>06:40 20 April 2018 id: {{ card.id }}</v-list-tile-sub-title> -->
						</v-list-tile-content>
					</v-list-tile>
				</router-link>
			</v-list>

			<!-- <router-link :to="'/card/'+card.id"> -->
			<!-- </router-link> -->

			<v-img
				v-if="Array.isArray(card.img) && card.img.length == 1"
				:src="card.img[0]"
				max-height="400px"
				position="top"
			>
			</v-img>

			<v-layout
				v-else-if="Array.isArray(card.img) && card.img.length > 1"
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
					<strong>{{ card.date }}</strong>
					<span>{{ card.time }}</span>
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
				
				<v-btn
					flat
					:color=" (card.visit !== undefined && card.visit.length < card.people ) ? 'red' : 'primary'"
				>
					<span v-if="card.visit !== undefined">{{ card.visit.length }} / {{ card.people }}</span>
					<span v-else>{{ card.people }}</span>
					<v-icon right>people</v-icon>
				</v-btn>
				<v-btn flat>
					<span>2</span>
					<v-icon right>chat</v-icon>
				</v-btn>
				<v-btn 
					flat
					:color="card.like !== undefined && card.like[userId] ? 'red' : ''"
					@click="$emit('toggle-like', card.id, card.like.length)"
				>
					<span v-if="card.like !== undefined">{{ card.like.length }}</span>
					<v-icon right>favorite</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-flex>
</template>

<script>
	export default {
		props: {
			card: Object,
			required: true
		},
		computed: {
			userId () {
				return this.$store.getters.userId
			}
		}
	}
</script>
<template>
	<v-card class="mb-2 elevation-10">
		<v-list>
			<router-link :to="'/user/' + card.ownerId">
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
		</v-card-text>

		<v-divider></v-divider>
		<v-card-actions>
			<v-spacer></v-spacer>
			
				<!-- :color="card.visit.length < card.people ? 'red' : 'primary'" -->
			<v-btn
				flat
				:color="card.visit.red ? 'red' : 'primary'"
				@click="toggVisit({ id: card.id, length: card.visit.length, red: card.visit.red })"
			>
				<span>{{ card.visit.length }} / {{ card.people }}</span>
				<v-icon right>{{ card.visit.red ? 'check' : 'people' }}</v-icon>
			</v-btn>

			<v-btn
				flat
				@click="loadCard(card.id)"
			>
				<span>{{ card.comments }}</span>
				<v-icon right>chat</v-icon>
			</v-btn>

			<v-btn 
				flat
				:color="card.like.red ? 'red' : ''"
				@click="toggLike({ id: card.id, length: card.like.length, red: card.like.red })"
			>
				<span>{{ card.like.length }}</span>
				<v-icon right>favorite</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		name: 'Card',
		props: {
			card: Object,
			required: true
		},
		computed: {
			userId () {
				return this.$store.getters.userId
			}
		},
		methods: {
			toggLike ({id, length, red}) {
				this.$store.dispatch('toggleLike', {id, length, red})
			},
			toggVisit ({id, length, red}) {
				this.$store.dispatch('toggleVisit', {id, length, red})
				// this.$store.dispatch('setError', {msg:"Okey toggle visit", color:"primary"})
			},
      loadCard (id) {
        this.$router.push('/card/' + id + '#comments')
        // this.$router.push('/card/' + id)
      }
		}
	}
</script>
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
		<div class="auto-wrap"
				v-if="Array.isArray(card.img) && card.img.length == 1"
		>
			<v-img
				:src="card.img[0]"
				position="center"
				max-height="400px"
				class="elevation-10 auto"
			>
			</v-img>
		</div>

		<v-layout
			v-else-if="Array.isArray(card.img) && card.img.length > 1"
		>
			<v-flex>
				<div class="auto-wrap elevation-10">
					<v-carousel>
						<v-carousel-item
							v-for="(img, i) in card.img"
							:key="i"
							:src="img"
							position="center"
						></v-carousel-item>
					</v-carousel>
				</div>
			</v-flex>
		</v-layout>

		<v-divider v-else></v-divider>

		<v-card-title>
			<div>
				<router-link :to="'/card/'+card.id">
					<div class="headline">{{ card.title }}</div>
				</router-link>
			</div>
		</v-card-title>

		<v-card-text class="pre">{{ card.desc }}</v-card-text>

		<v-card-text>
			<div>
				<v-icon color="black">today</v-icon>
				<strong>{{ card.time | formatDate }}</strong>
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
				:to="'/card/' + card.id + '#comments'"
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
	import * as fb from 'firebase'

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
			}
		},
		filters: {
			formatDate (value) {
				var now = new Date()
				var obj = new Date( Math.abs( value ) )
				var mi = obj.getMinutes() < 9 ? '0' + obj.getMinutes() : obj.getMinutes()
				var h = obj.getHours() < 9 ? '0' + obj.getHours() : obj.getHours()
				var d = obj.getDate() < 9 ? '0' + obj.getDate() : obj.getDate()
				var m = obj.getMonth() < 9 ? '0' + obj.getMonth() : obj.getMonth()
				var y = obj.getFullYear()

				var f

				if( obj < now) return 'Past event'
				
				if ( y == now.getFullYear())
					if ( m - now.getMonth() == 0)
						
						if ( d - now.getDate() == 0)
							f = 'Today';
						else if ( d - now.getDate() == 1)
							f = 'Tommorow';
						else if ( d - now.getDate() <= 7)
							f = 'This week';
						else if (d - now.getDate() <= 14)
							f = 'Next week';
						else
							f = 'This month'
					else if ( m - now.getMonth() == 1)
						f = 'Next month';
					else
						f = `${d}/${m}`
				else
					f = `${d}/${m}/${ (y + '').slice(-2) }`

				return `${f} ${h}:${mi}`
			}
		}
	}
</script>
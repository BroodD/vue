<template>
	<v-card class="mb-2 elevation-10">
		<v-card-title>
			<div class="headline">Members <small>({{ length }})</small></div>
		</v-card-title>
		<v-layout row wrap>
			<v-flex md3 v-for="v in members" :key="v.id">
				<v-list>
					<router-link :to="'/user/' + v.id">
						<v-list-tile avatar>
							<v-list-tile-avatar>
								<v-img position="top left" :src="v.image" alt="avatar" size="100" />
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title v-html="v.name"></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</router-link>
				</v-list>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
	import * as fb from 'firebase'

	export default {
		name: 'MembersList',
		props: {
			id: String,
			length: Number
		},
		data () {
			return {
				members: [],
			}
		},
		async created () {
			var _visit = await fb
				.database()
				.ref("visit/" + this.id)
			var _users = await fb.database().ref("users")
			var members = []

			// get members i set here firebase listener chil_added and maybe need off this on destroy component
			_visit.limitToLast(8).on("child_added", card => {
				if( card.key != 'length')
					_users.child(card.key).once("value", user => {
						members.push(
							{
								id: card.key,
								name: user.val().name,
								image: user.val().image
							}
						)
					})
			})

			_visit.limitToLast(8).on("child_removed", card => {
				this.members = []
			})

			this.members = members

		
		// _cards.child('visit').limitToLast(9).once("value", card => {
		// 	card.forEach(e => {
		// 		if( e.key != 'length')
		// 			_users.child(e.key).once("value", user => {
		// 				members.push(
		// 					{
		// 						id: e.key,
		// 						name: user.val().name,
		// 						image: user.val().image
		// 					}
		// 				)
		// 			})
		// 	})
		// })
		}
	}
</script>
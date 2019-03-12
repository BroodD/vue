<template>
	<v-card class="mb-2 elevation-10">
		<v-card-title>
			<div class="headline">Members <small class="primary--text">{{ length }}</small></div>
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
			var base = await fb.database().ref()
			var _visit = base.child("cards/" + this.id + '/visit')
			var _users = base.child("users")
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

			_visit.limitToLast(8).on("child_removed", mem => {
				console.log('member remove', mem.key)
				let index = this.members.findIndex(card => card.id === mem.key)

				this.members.splice(index, 1)
			})

			this.members = members

		}
	}
</script>
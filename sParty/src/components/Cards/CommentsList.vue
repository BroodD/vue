<template>
	<v-card class="elevation-10" id="comments">
		<v-card-title>
			<div class="headline">Comments <small>({{ length }})</small></div>
		</v-card-title>
		<v-list>
			<template v-for="c in comments">
				<!-- <v-divider 	:key="c.id"></v-divider> -->
				<v-list-tile :key="c.id" avatar>
					<v-list-tile-avatar>
						<!-- <img :src="c.img"> -->
						<v-img position="top left" :src="c.img" alt="avatar" size="100" />
					</v-list-tile-avatar>

					<v-list-tile-content>
						<v-list-tile-title v-html="c.name"></v-list-tile-title>
						<v-list-tile-sub-title v-html="c.text"></v-list-tile-sub-title>
					</v-list-tile-content>

					<v-list-tile-action>
						<v-btn flat>
						<span >{{ c.like }}</span>
							<v-icon right>favorite</v-icon>
						</v-btn>
					</v-list-tile-action>
				</v-list-tile>
			</template>
		</v-list>
		<v-card-text>
			<v-textarea
				box
				label="Your comment"
				v-model="text"
				class="mt-2"
				auto-grow
			></v-textarea>
			<v-btn color="primary" @click="addComment">Send</v-btn>
		</v-card-text>
	</v-card>
</template>

<script>
	import * as fb from 'firebase'

	export default {
		name: 'CommentsList',
		props: {
			id: String,
			length: Number
		},
		data () {
			return {
				comments: [],
				text: '',
			}
		},
		methods: {
			addComment () {
				if(this.text) {
					this.$store.dispatch('addComment', {id: this.id, text: this.text, length: this.length})
					this.text = ''
				} else {
					this.$store.dispatch('setError', 'Please input text')
				}
			}
		},
		async created () {
			var base = await fb.database().ref()

			var _comments = await fb
				.database()
				.ref("comments/" + this.id)
			var _users = await fb.database().ref("users")
			var comments = []

			// get comments
			_comments.limitToLast(10).on("child_added", snap => {
				if (typeof snap.val() == "object" && snap.val()) {
					_users.child(snap.val().user).once("value", user => {
						comments.push({
							id: snap.key,
							name: user.val().name,
							img: user.val().image,
							text: snap.val().text,
							like: snap.val().like
						})
					})
				}
			});

			this.comments = comments
		}
	}
</script>
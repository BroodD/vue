<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
			dark
      v-model="drawer"
			width="280"
			v-if="isUserLoggedIn"
    >
			<v-list dense>
				<div class="por">

					<v-img :src="user.image"></v-img>

					<v-subheader class="avatar__sub">
						{{ user.name }}
						<v-spacer></v-spacer>
						{{ user.login }}
					</v-subheader>
				</div>

				<template v-for="link in links">
					<v-list-group
						v-if="link.children"
						v-model="link.model"
						:key="link.text"
						:append-icon="(link.model || link.children) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
					>
						<v-list-tile slot="activator">
							<v-list-tile-content>
								<v-list-tile-title>
									{{ link.text }}
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
						<v-list-tile
							v-for="(child, i) in link.children"
							:key="i"
							:to="child.url"
						>
							<v-list-tile-content>
								<v-list-tile-title>
									{{ child.text }}
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>

					<v-list-tile
						v-else 
						:key="link.text"
						:to="link.url"
					>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ link.text }}
              </v-list-tile-title>
            </v-list-tile-content>
					</v-list-tile>
				</template>
				<v-list-tile
					v-if="isUserLoggedIn"
					@click="onLogout"
				>
					<v-list-tile-content>
						<v-list-tile-title v-text="'Logout'"></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
    </v-navigation-drawer>

    <v-toolbar 
			app
			dark
			color="primary"
			scroll-off-screen
		>
			<!-- inverted-scroll -->
      <v-toolbar-side-icon
				v-if="isUserLoggedIn"
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">EventTime</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

			<v-toolbar-items :class="isUserLoggedIn ? 'hidden-sm-and-down' : ''">
				<v-menu
						v-for="link in links"
						:key="link.title"
						:to="link.url"
						offset-y
				>
					<v-btn
						slot="activator"
						flat
						:to="link.children ? '' : link.url"
					>
						<template v-if="link.icon">
							<v-icon left>{{ link.icon }}</v-icon>
							<span>{{ link.text }}</span>
						</template>
						<template v-else>
							<span class="mr-3">{{ user.name }}</span>
							<v-avatar>
								<v-img position="top left" :src="user.image"></v-img>
							</v-avatar>
						</template>
					</v-btn>

					<v-list
						v-if="link.children"
					>
						<v-list-tile
							v-for="(child, index) in link.children"
							:key="index"
							:to="child.url"
						>
							<v-list-tile-title>{{ child.text }}</v-list-tile-title>
						</v-list-tile>
						<v-list-tile
							@click="onLogout"
						>
							<v-list-tile-title>Logout</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-toolbar-items>
    </v-toolbar>
		
    <v-content>
			<!-- <transition :name="transitionName"> -->
				<router-view></router-view>
			<!-- </transition> -->
    </v-content>

      <!-- :active.sync="bottomNav" -->
		<v-bottom-nav
			v-if="isUserLoggedIn"
			class="hidden-md-and-up"
      :value="true"
			fixed
			color="primary"
			height="47"
    >
      <v-btn
        flat
				dark
				:to="l.url"
				v-for="(l, i) in bottom"
				:key="i"
      >
        <!-- <span>{{ l.text }}</span> -->
        <v-icon>{{ l.icon }}</v-icon>
      </v-btn>

    </v-bottom-nav>

			<!-- error -->
    <template v-if="error">
      <v-snackbar
        :timeout="4000"
        :multi-line="true"
        :color="error.color || 'error'"
        @input="closeError"
        :value="true"
      >
        {{error.msg || error}}
        <v-btn flat dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>


<script>
export default {
  data () {
    return {
			drawer: false,
			// transitionName: '',
			bottomNav: 'home'
    }
  },
  computed: {
		loading () {
			this.$store.getters.loading
		},
		user () {
			return this.$store.getters.user
		},
		userId () {
			return this.$store.getters.userId
		},
    error () {
      return this.$store.getters.error;
		},
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
		},
		bottom () {
			return [
				{
					text: 'Home',
					url: '/',
					icon: 'home'
				},
				{
					text: 'Add',
					url: '/new',
					icon: 'add_box'
				},
				{
					text: 'My account',
					url: '/user/' + this.userId,
					icon: 'person'
				},
				{
					text: 'My meets',
					url: '/visit',
					icon: 'watch_later'
				},
			]
		},
    links () {
			if (this.isUserLoggedIn) {
				return [
					{
						text: 'Add card',
						url: '/new',
						icon: 'add_circle'
					},
					{
						text: 'My meets',
						url: '/visit',
						icon: 'watch_later'
					},
					{
						text: this.user.name,
						url: null,
						model: false,
						children: [
							{ text: 'My cards', url: '/user/' + this.userId},
							{ text: 'Settings', url: '/settings'},
						]
					},
				]
			}

			return [
				{ 
					text: 'Sign in/up', 
					url: '/auth', 
					icon: 'person'
				},
			]
		},
  },
  methods: {
    closeError () {
			this.$store.dispatch('clearError')
		},
    onLogout () {
			this.$store.dispatch('logoutUser')
			this.$router.push('/')
		},
		// onScroll (e) {
		// 	console.log(e.target.scrollTop)
		// }
	},
	// watch: {
	// 	'$route' (to, from) {
	// 		console.log(to)
			// const toDepth = to.path.split('/').length
			// const fromDepth = from.path.split('/').length
			// this.transitionName = toDepth < fromDepth || to.path.length < from.path.length ? 'slide-right' : 'slide-left'
	// 	}
	// }
}
</script>

<style lang="sass">
	@import './assets/sass/_mixins.sass'
	@import './assets/sass/style.sass'
</style>
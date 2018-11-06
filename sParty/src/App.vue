<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
			<v-list dense>
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
			
		>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">sParty</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down">
				<v-menu
						v-for="link in links"
						:key="link.title"
						:to="link.url"
						offset-y
				>
					<v-btn
						slot="activator"
						flat
						:to="link.children ? '':link.url"
					>
						<v-icon left>{{ link.icon }}</v-icon>
						{{ link.text }}
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
					</v-list>
				</v-menu>

				<v-menu
					v-if="isUserLoggedIn"
					offset-y
				>
					<v-btn
						slot="activator"
						flat
					>
						<span class="mr-3">{{ user.name }}</span>
						<v-avatar>
							<v-img :src="user.image"></v-img>
						</v-avatar>
					</v-btn>

					<v-list>
						<v-list-tile
							:to="'/user/' + userId"
						>
							<v-list-tile-title>My cards</v-list-tile-title>
						</v-list-tile>
						<v-list-tile
							to="/settings"
						>
							<v-list-tile-title>Settings</v-list-tile-title>
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
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
    </v-content>

			<!-- error -->
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
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
			transitionName: ''
    }
  },
  computed: {
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
    links () {
			if (this.isUserLoggedIn) {
				return [
					{
						text: 'Add new',
						url: '/new',
						icon: 'add_circle'
					},
					// {
					// 	text: this.user.name,
					// 	url: null,
					// 	icon: 'account_circle',
					// 	model: false,
					// 	children: [
					// 		{ text: 'My cards', url: '/user/' + this.userId},
					// 		{ text: 'Settings', url: '/settings'},
					// 	]
					// },
				]
			}

			return [
					{ text: 'Login', url: '/login', icon: 'person' },
					{ text: 'Registration', url: '/registration', icon: 'person_add' },
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
    }
	},
	watch: {
		'$route' (to, from) {
			const toDepth = to.path.split('/').length
			const fromDepth = from.path.split('/').length
			this.transitionName = toDepth < fromDepth || to.path.length < from.path.length ? 'slide-right' : 'slide-left'
		}
	}
}
</script>

<style>
	/* .animation-enter-active,
	.animation-leave-active {
		transition: .3s;
	}
	.animation-enter {
		opacity: 1;
		transform: translateX(100%);
	}
	.animation-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	} */

	.slide-left-enter { transform: translateX(100%) }
	.slide-left-enter-to { transform: translateX(0) }
	.slide-left-enter-active { position: absolute }

	.slide-left-leave { transform: translateX(0) }
	.slide-left-leave-to { transform: translateX(-100%) }
	.slide-left-leave-active { position: absolute; }

	.slide-left-enter-active,
	.slide-left-leave-active,
	.slide-right-enter-active,
	.slide-right-leave-active { transition: all 500ms ease-in-out }

	.slide-right-enter { transform: translateX(-100%) }
	.slide-right-enter-to { transform: translateX(0) }
	.slide-right-enter-active { position: absolute }

	.slide-right-leave { transform: translateX(0) }
	.slide-right-leave-to { transform: translateX(100%) }
	.slide-right-leave-active { position: absolute; }


	
	img {
		max-width: 100%;
		height: auto;
	}
	a {
		text-decoration: none;
	}
	.v-content__wrap {
		background-color: #e1e1e1;
	}
	.pointer {
		cursor: pointer;
		text-decoration: none;
	}
</style>
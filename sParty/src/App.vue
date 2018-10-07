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
			</v-list>
    </v-navigation-drawer>

    <v-toolbar 
			app
			dark
			color="teal"
			dense
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
			</v-toolbar-items>
    </v-toolbar>


    <v-content>
      <router-view></router-view>
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
			drawer: false
    }
  },
  computed: {
    error () {
      return false;
		},
    links () {
			return [
				{ text: 'Login', url: '/login' },
				{ text: 'Registration', url: '/registration' },
				{ text: 'My account', url: '/me',

					model: false,
					children: [
						{ text: 'My cards', url: '/user/1'},
						{ text: 'Settings', url: '/settings'},
					]
				},
			]
		},
  },
  methods: {
    closeError () {
			return false;
    },
    onLogout () {
      return false;
    }
  }
}
</script>

<style>
	.v-content__wrap {
		background-color: #e1e1e1;
	}
	.pointer {
		cursor: pointer;
		text-decoration: none;
	}
</style>
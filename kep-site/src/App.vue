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

    <v-toolbar app dark color="primary" dense>
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">КЕП</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

			<v-toolbar-items class="hidden-sm-and-down">
			<v-menu
					v-for="link in links"
          :key="link.title"
					:to="link.url"
      		offset-y
					class="primary"
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

		<v-footer
			dark
			height="auto"
			class="grey darken-3"
		>
			<v-container>
				<v-layout row>
					<v-flex xs4 class="text-xs-center">
						<v-list>
							<v-list-tile>
								<v-list-tile-title>76019, вул. Вовчинецька, 223</v-list-tile-title>
							</v-list-tile>
							<v-list-tile>
								<v-list-tile-title>м. Івано-Франківськ, Україна</v-list-tile-title>
							</v-list-tile>
							<v-list-tile>
								<v-list-tile-title>
									<v-icon small>phone</v-icon>
									Тел. (0342) 78-30-46, (0342)78-30-22
								</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-flex>
				</v-layout>
			</v-container>
		</v-footer>


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
				{ text: 'Вступникам', url: '/entrants',

					model: true,
					children: [
						{ text: 'Перелік спеціальностей', url: '/entrants/perelik', },
						{ text: 'Підготовчі курси', url: '/entrants/courses', },
					]
				},
				{ text: 'Студентам', url: '/students',

					model: false,
					children: [
						{ text: 'Розклад', url: '/students/schedule'}
					]
				},
				{ text: 'Викладачам', url: '/teachers' },
				{ text: 'Про нас', url: '/about' },
				{ text: 'Контакти', url: '/contact' }
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
	.pointer {
		cursor: pointer;
	}
</style>
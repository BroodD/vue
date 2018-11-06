<template>
  <v-container grid-list-md>
		<v-layout row wrap justify-center>
			<v-flex xs12 sm6 md4>
				<v-card
					class="mx-auto"
				>
					<v-list>
						<v-list-tile
							avatar
						>
							<v-list-tile-avatar
								size="55"
								class="pr-3"
							>
								<img src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
							</v-list-tile-avatar>

							<v-list-tile-content>
								<v-list-tile-title>Ivan Ostapov</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
					<v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
                v-model="name"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="alternate_email"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
							<v-dialog
								ref="dialog"
								v-model="dateModal"
								:return-value.sync="date"
								persistent
								lazy
								full-width
								width="290px"
							>
								<v-text-field
									slot="activator"
									label="Date birth"
									prepend-icon="event"
									readonly
									v-model="date"
								></v-text-field>
								<v-date-picker v-model="date" @input="$refs.dialog.save(date)"></v-date-picker>
							</v-dialog>
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                :counter="6"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                :counter="6"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
  </v-container>
</template>

<script>
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export default {
	data () {
		return {
			name: '',
			dateModal: false,
			date: '',
			email: '',
			password: '',
			confirmPassword: '',
			valid: false,
			nameRules: [
				v => !!v || 'Name is required',
			],
			emailRules: [
				v => !!v || 'E-mail is required',
				v => emailRegex.test(v) || 'E-mail must be valid'
			],
			passwordRules: [
				v => !!v || 'Password is required',
				v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
			],
			confirmPasswordRules: [
				v => !!v || 'Password is required',
				v => v === this.password || 'Password should match'
			]
		}
	},
}
</script>

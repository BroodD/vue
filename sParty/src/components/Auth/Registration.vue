<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
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
							<v-dialog
								ref="dialog"
								v-model="modal"
								:return-value.sync="date"
								persistent
								lazy
								full-width
								width="290px"
							>
								<v-text-field
									slot="activator"
									v-model="date"
									label="Date birth"
									prepend-icon="event"
									readonly
								></v-text-field>
								<v-date-picker v-model="date" @input="$refs.dialog.save(date)"></v-date-picker>
							</v-dialog>
              <v-text-field
                prepend-icon="alternate_email"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || loading"
            >Create account!</v-btn>
          </v-card-actions>
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
				dialog: '',
				modal: '',
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
    computed: {
      // loading () {
      //   return this.$store.getters.loading
      // }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          // this.$store.dispatch('registerUser', user)
          //   .then(() => {
          //     this.$router.push('/')
          //   })
          //   .catch(() => {})
        }
      }
    }
  }
</script>

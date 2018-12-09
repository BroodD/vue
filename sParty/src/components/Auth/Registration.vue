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
                name="login"
                label="Login"
                type="text"
                v-model="login"
                :rules="[ v => !!v || 'Login is required' ]"
              ></v-text-field>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
                v-model="name"
                :rules="[ v => !!v || 'Name is required' ]"
              ></v-text-field>
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
							<v-layout row wrap>
								<v-flex md4>
									<img :src="imageSrc" v-if="imageSrc">
								</v-flex>
							</v-layout>
							<v-layout row class="mb-3">
								<v-flex xs12>
									<v-btn dark class="primary" @click="triggerUpload">
										Upload photo
										<v-icon right dark>cloud_upload</v-icon>
									</v-btn>
									<input
										ref="fileInput"
										type="file"
										style="display: none;"
										accept="image/*"
										@change="onFileChange"
									>
								</v-flex>
							</v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :loading="loading"
              :disabled="!valid || !image || loading"
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
				login: '',
				name: '',
        email: '',
        password: '',
				confirmPassword: '',
				image: '',
				imageSrc: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => emailRegex.test(v) || 'E-mail must be valid'
        ],
				dateRules: [
					v => !!v || 'Date is required',
					v => (new Date(Date.parse(v)) < new Date) || 'Date must be more or equal today'
				],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
        ],
        confirmPasswordRules: [
          v => !!v || 'Password is required',
          v => v === this.password || 'Password should match'
				],
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      onSubmit () {
        if (this.$refs.form.validate() && this.image) {
          const user = {
            email: this.email,
						password: this.password,
						login: this.login,
						name: this.name,
						image: this.image,
          }

          this.$store.dispatch('registerUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
        }
			},
			triggerUpload () {
        this.$refs.fileInput.click()
      },
      onFileChange (event) {
        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = e => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      }
    }
  }
</script>

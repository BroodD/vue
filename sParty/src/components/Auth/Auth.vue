<template>
  <v-container grid-list-md>
		<v-layout align-center justify-center class="card-wrap">
      <v-flex xs12 sm8>
				<v-tabs
					color="primary"
					dark
					slider-color="#262626"
				>
					<v-tab>Login</v-tab>
					<v-tab>Regestration</v-tab>

					<!-- <transition name="slide"> -->
					<v-tab-item :transition="false" :reverse-transition="false">
						<v-card class="elevation-12">
							<v-card-text>
								<v-form v-model="valid" ref="formLog" validation>
									<v-text-field
										prepend-icon="person"
										name="email"
										label="Email"
										type="email"
										v-model="email"
										:rules="emailRules"
										validate-on-blur
										autofocus
									></v-text-field>
									<v-text-field
										prepend-icon="lock"
										name="password"
										label="Password"
										type="password"
										v-model="password"
										:rules="passwordRules"
										validate-on-blur
									></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="primary"
									@click="onLogin"
									:loading="loading"
									:disabled="loading"
								>Login</v-btn>
							</v-card-actions>
						</v-card>
					</v-tab-item>
					<v-tab-item :transition="false" :reverse-transition="false">
						<v-card class="elevation-12">
							<v-card-text>
								<v-form v-model="valid" ref="formReg" lazy-validation>
									<v-text-field
										prepend-icon="person"
										name="login"
										label="Login"
										type="text"
										v-model="login"
										:rules="[ v => !!v || 'Login is required' ]"
										validate-on-blur
										autofocus
									></v-text-field>
									<v-text-field
										prepend-icon="person"
										name="name"
										label="Name"
										type="text"
										v-model="name"
										:rules="[ v => !!v || 'Name is required' ]"
										validate-on-blur
									></v-text-field>
									<v-text-field
										prepend-icon="alternate_email"
										name="email"
										label="Email"
										type="email"
										v-model="email"
										:rules="emailRules"
										validate-on-blur
									></v-text-field>
									<v-text-field
										prepend-icon="lock"
										name="password"
										label="Password"
										type="password"
										:counter="6"
										v-model="password"
										:rules="passwordRules"
										validate-on-blur
									></v-text-field>
									<v-text-field
										prepend-icon="lock"
										name="confirm-password"
										label="Confirm Password"
										type="password"
										:counter="6"
										v-model="confirmPassword"
										:rules="confirmPasswordRules"
										validate-on-blur
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
									@click="onRegistration"
									:loading="loading"
									:disabled="!image || loading"
								>Create account</v-btn>
							</v-card-actions>
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-flex>
		</v-layout>
	</v-container>
</template>

						
<script>
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

  export default {
    data () {
      return {
				valid: false,
				login: '',
				name: '',
        password: '',
        email: '',
        password: '',
				confirmPassword: '',
				image: '',
				imageSrc: '',
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
      onLogin () {
        if (this.$refs.formLog.validate()) {
          const user = {
            email: this.email,
            password: this.password
          }

          this.$store.dispatch('loginUser', user)
            // .then(() => {
            //   this.$router.push('/')
            // })
            // .catch(() => {})
        }
			},
			onRegistration () {
        if (this.$refs.formReg.validate() && this.image) {
          const user = {
            email: this.email,
						password: this.password,
						login: this.login,
						name: this.name,
						image: this.image,
          }

          this.$store.dispatch('registerUser', user)
            // .then(() => {
            //   this.$router.push('/')
            // })
            // .catch(() => {})
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
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page.')
      }
    }
  }
</script>

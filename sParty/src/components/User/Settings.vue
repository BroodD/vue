<template>
  <v-container grid-list-md>
		<v-layout align-center justify-center>
      <v-flex xs12 sm8>

				<v-tabs
					color="primary"
					dark
					slider-color="#262626"
				>
					<v-tab
					>Edit profile</v-tab>
					<v-tab
					>Change password</v-tab>

					<v-tab-item>
						<v-card class="elevation-12">
							<v-card-text>
								<v-form v-model="valid" ref="form" lazy-validation>
									<v-layout row wrap>
										<v-flex md4>
											<img :src="imageSrc || user.image" @click="triggerUpload">
											<input
												ref="fileInput"
												type="file"
												style="display: none;"
												accept="image/*"
												@change="onFileChange"
											>
										</v-flex>
									</v-layout>
									<v-text-field
										box
										label="Username"
										:value="user.login"
										@input="login = $event"
									/>
									<v-text-field
										box
										label="Name"
										:value="user.name"
										@input="name = $event"
										:rules="nameRules"
										validate-on-blur
									/>
									<v-textarea
										box
										label="Bio"
										:value="user.bio"
										@input="bio = $event"
										auto-grow
									></v-textarea>
									<v-text-field
										box
										label="Email" 
										type="email" 
										value="sdf@awd.aw"
										@input="email = $event"
										:rules="emailRules"
										validate-on-blur
									/>
									<!-- <v-select
										box
										:items="['Not Specified', 'Male', 'Female']"
										label="Gender"
										v-model="gender"
									></v-select> -->
								</v-form>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="primary"
									@click="onSubmit"
									:disabled="!valid || loading"
								>Update</v-btn>
							</v-card-actions>
						</v-card>
					</v-tab-item>
					<v-tab-item>
						<v-card>
							<v-card-text>
								<v-text-field
									box 
									label="Password" 
									type="password" 
									:counter="6" 
									v-model="password"
									:rules="passwordRules"
								/>
								<v-text-field
									box 
									label="Confirm Password" 
									type="password" 
									:counter="6"
									v-model="confirmPassword" 
									:rules="confirmPasswordRules"
								/>
							</v-card-text>
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
			image: '',
			imageSrc: '',
			login: '',
			name: '',
			bio: '',
			email: '',
			// gender: '',
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
		user() {
			return this.$store.getters.user
		},
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		onSubmit () {
			if (this.$refs.form.validate()) {
				const user = {
					login: this.login || this.user.login,
					name: this.name || this.user.name,
					image: this.image || this.user.image,
					bio: this.bio || this.user.bio,
				}

				this.$store.dispatch('changeUserInfo', user)
          .then(() => {
            this.$router.push('/user/' + this.$store.getters.user.id)
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

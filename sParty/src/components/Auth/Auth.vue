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
									<!-- <v-layout row class="mb-3">
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
									</v-layout> -->

									<v-layout row>
										<v-flex md4 lg6 class="mb-4">
											<v-dialog v-model="dialog" max-width="450px">
												<v-toolbar dark color="primary">
													<v-toolbar-title>Change avatar</v-toolbar-title>
												</v-toolbar>
												<v-card>
													<v-card-text v-show="hasImg">
														<div style="width: auto; height: auto; display: inline-block;">
															<vue-cropper
																ref='cropper'
																@cropmove="setImage"
																:view-mode="1"
																drag-mode="crop"
																:background="false"
																:aspectRatio="1/1"
																:initialAspectRatio="1/1"
																:src="cropImg"
																:img-style="{ 'width': 'auto', 'height': 'auto' }"
															></vue-cropper>
														</div>
													</v-card-text>
													<v-card-actions>
														<input
															ref="cropInput"
															type="file"
															accept="image/*"
															@change="setImage" 
															style="display: none;"/>
														<v-btn color="primary" @click="$refs.cropInput.click()">Upload</v-btn>
														<v-spacer></v-spacer>
														<v-btn color="primary" @click="cropImage" v-show="hasImg">Done</v-btn>
													</v-card-actions>
												</v-card>
											</v-dialog>
											<v-img :src="cropImg">
												<v-layout>
													<v-spacer></v-spacer>
													<v-btn fab right top dark small color="primary" @click="dialog = true">
														<v-icon>edit</v-icon>
													</v-btn>
												</v-layout>
											</v-img>
										</v-flex>
									</v-layout>
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
	import VueCropper from 'vue-cropperjs'
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/

  export default {
		components: { VueCropper },
    data () {
      return {
				cropImg: require('@/assets/no_photo.jpg'),
				dialog: false,

				valid: false,
				login: '',
				name: '',
        password: '',
        email: '',
        password: '',
				confirmPassword: '',
				image: '',
				hasImg: false,
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
			setImage(e) {
				const file = e.target.files[0];
				if (!file.type.includes('image/')) {
					alert('Please select an image file');
					return;
				}
				if (typeof FileReader === 'function') {
					const reader = new FileReader();
					reader.onload = (event) => {
						this.hasImg = true;
						// rebuild cropperjs with the updated source
						this.$refs.cropper.replace(event.target.result);
					};
					reader.readAsDataURL(file);
					this.image = file
				} else {
					alert('Sorry, FileReader API not supported');
				}
			},
			cropImage() {
				// get image data for post processing, e.g. upload or setting image src
				this.dialog = false
				this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
				this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
					this.image = blob
				})
			},

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
    },
    created () {
      if (this.$route.query['loginError']) {
        this.$store.dispatch('setError', 'Please log in to access this page.')
      }
    }
  }
</script>

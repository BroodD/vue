<template>
  <v-container grid-list-md>
		<v-layout align-center justify-center>
      <v-flex xs12 sm8>

				
				

				<v-tabs
					color="primary"
					dark
					slider-color="#262626"
				>
					<v-tab>Edit profile</v-tab>
					<v-tab>Change password</v-tab>

					<v-tab-item :transition="false" :reverse-transition="false">
						<v-card class="elevation-12">
							<v-card-text>
								<v-form v-model="valid" ref="form" lazy-validation>
									<v-layout row>
										<v-flex md4 lg6 class="mb-4">
											<v-dialog v-model="dialog" max-width="450px">
												<v-toolbar dark color="primary">
													<v-toolbar-title>Change avatar</v-toolbar-title>
												</v-toolbar>
												<v-card>
													<v-card-text v-show="imageSrc">
														<div style="width: auto; height: auto; display: inline-block;">
															<vue-cropper
																ref='cropper'
																@cropmove="setImage"
																:view-mode="1"
																drag-mode="crop"
																:background="false"
																:aspectRatio="1/1"
																:initialAspectRatio="1/1"
																:src="imageSrc"
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
														<v-btn color="primary" @click="cropImage" v-show="imageSrc">Done</v-btn>
													</v-card-actions>
												</v-card>
											</v-dialog>
											<v-img :src="cropImg || user.image">
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
										:value="user.email"
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
									:loading="loading"
									:disabled="!valid || loading"
								>Update</v-btn>
							</v-card-actions>
						</v-card>
					</v-tab-item>
					<v-tab-item :transition="false" :reverse-transition="false">
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
import VueCropper from 'vue-cropperjs'
	import imageCompression from 'browser-image-compression'

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/

export default {
  components: { VueCropper },
	data () {
		return {
			cropImg: '',
			dialog: false,

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
		user () {
			return this.$store.getters.user
		},
		loading () {
			return this.$store.getters.loading
		}
	},
	methods: {
		setImage(e) {
			const file = e.target.files[0];
			if (!file.type.includes('image/') || file.size > 1572864) {
				this.$store.commit('setError', 'Please select other image file');
				return;
			}
			if (typeof FileReader === 'function') {
				const reader = new FileReader();
				reader.onload = (event) => {
					this.imageSrc = event.target.result;
					// rebuild cropperjs with the updated source
					this.$refs.cropper.replace(event.target.result);
				};
				reader.readAsDataURL(file);
				this.image = file
			} else {
				this.$store.commit('setError', 'Sorry, FileReader API not supported');
			}
		},
		cropImage() {
			console.log(this.image)
			// get image data for post processing, e.g. upload or setting image src
			this.dialog = false
			this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
			this.$refs.cropper.getCroppedCanvas({
				maxWidth: 650,
				maxHeight: 650,
				fillColor: '#262626',
				// imageSmoothingEnabled: false,
				// imageSmoothingQuality: 'high',
			}).toBlob((blob) => {
				this.image = blob
				console.log(this.image)
			})
		},
		async compressImages () {
			console.log(`originalFile size ${this.image.size / 1024 / 1024} MB`);
			var options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 650,
				useWebWorker: true,
			}
			try {
				const compressedFile = await imageCompression(this.image, options);  // maxSizeMB, maxWidthOrHeight are optional
				console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
				this.image = compressedFile
			} catch (error) {
				console.log(error);
			}
		},	
		async onSubmit () {
			if(this.image)
				await this.compressImages()

			if (this.$refs.form.validate()) {
				const user = {
					login: this.login || this.user.login,
					name: this.name || this.user.name,
					image: this.image || this.user.image,
					bio: this.bio || this.user.bio,
					email: this.email || this.user.email
				}
				console.log('Settings onSubmit() [user]', user)

				this.$store.dispatch('changeUserInfo', user)
          .then(() => {
            this.$router.push('/user/' + this.$store.getters.user.id)
          })
          .catch(() => {})
			}
		},
	}
}
</script>

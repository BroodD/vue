<template>
   <v-container grid-list-md fluid>
		<v-layout row wrap justify-center class="card-wrap">
			<v-flex xs12 md8>
				<v-card
					class="elevation-12"
				>
					<v-toolbar dark color="primary">
            <v-toolbar-title>Create new card</v-toolbar-title>
          </v-toolbar>

					<v-card-text>
						<v-form v-model="valid" ref="form" validation class="mb-3">

							<v-text-field
								name="title"
								label="Title"
								type="text"
								v-model="title"
								required
								:rules="[v => !!v || 'Title is required']"
							></v-text-field>

							<v-textarea
								name="description"
								label="Description"
								type="text"
								v-model="desc"
								multi-line
								auto-grow
								:rules="[v => !!v || 'Description is required']"
							></v-textarea>

							<v-text-field
								name="people"
								label="Count people"
								type="text"
								v-model="people"
								:rules="peopleRules"
							></v-text-field>
							
							<!-- <v-layout>
								<v-flex sm6>
									<v-date-picker v-model="date"></v-date-picker>
								</v-flex>
								<v-flex sm6>
									<v-time-picker
										v-model="time"
									/>
								</v-flex>
							</v-layout> -->

							<v-dialog
								ref="date"
								v-model="dateModal"
								:return-value.sync="date"
								persistent
								lazy
								full-width
							>
								<v-text-field
									slot="activator"
									label="Set a date"
									readonly
									v-model="date"
									:rules="dateRules"
									clearable
								></v-text-field>
								<v-date-picker full-width v-model="date" @input="$refs.date.save(date)"></v-date-picker>
							</v-dialog>

							<v-dialog
								ref="time"
								v-model="timeModal"
								:return-value.sync="time"
								persistent
								lazy
								full-width
							>
								<!-- class="dialog" -->
								<!-- width="290px" -->
								<v-text-field
									slot="activator"
									v-model="time"
									label="Set a time"
									readonly
									:rules="[v => !!v || 'Time is required']"
									clearable
								></v-text-field>
								<v-time-picker
									v-model="time"
									full-width
									format="24hr"
								>
									<v-spacer></v-spacer>
									<v-btn flat color="primary" @click="timeModal = false">Cancel</v-btn>
									<v-btn flat color="primary" @click="$refs.time.save(time)">OK</v-btn>
								</v-time-picker>
							</v-dialog>
						</v-form>
						<v-layout row wrap align-start>
							<v-flex
								v-for="(img, i) in images"
								:key="i"
								d-flex
								xs12 md6
							>
								<v-card>
									<v-img
										:src="img"
										class="grey darken-4"
									></v-img>
									<v-card-actions>
										<v-btn
											fab
											dark
											small
											@click="swap(i, 0)"
										>
											<v-icon>arrow_back</v-icon>
										</v-btn>
										<v-btn
											fab
											dark
											small
											@click="swap(i, 2)"
										>
											<v-icon>arrow_forward</v-icon>
										</v-btn>
										<v-spacer></v-spacer>
										<v-btn
											fab
											dark
											small
											color="red"
											@click="deleteImage(i)"
										>
											<v-icon>delete</v-icon>
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-flex>
						</v-layout>
						<v-layout row class="mb-3">
							<v-flex xs12>
								<v-btn dark class="primary" @click="triggerUpload">
									Upload
									<v-icon right dark>cloud_upload</v-icon>
								</v-btn>
								<input
									ref="fileInput"
									type="file"
									style="display: none;"
									accept="image/*"
									@change="onFileChange"
									multiple
								>
							</v-flex>
						</v-layout>
						<v-layout row>
							<v-flex xs12>
								<v-spacer></v-spacer>
								<v-btn
									:loading="loading"
									color="primary"
									@click="createCard"
									:disabled="!valid || loading"
								>
									Create
								</v-btn>
							</v-flex>
						</v-layout>
					</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
	import imageCompression from 'browser-image-compression';
	
	var swap = (a, x, y) => {
		if (a.length === 1) return a;
		// var t = a[x]
		// a[x] = a[y]
		// a[y] = t
		a.splice(y, 1, a.splice(x, 1, a[y])[0]);
		return a;
	};

  export default {
    data () {
      return {
        files: [],
        title: '',
				desc: '',
				people: '',
        images: [],
				time: null,
				timeModal: false,
				date: null,
				dateModal: false,

        valid: false,
				dateRules: [
					v => !!v || 'Date is required',
					v => (new Date(Date.parse(v)) >= new Date(Date.now() - 864e5)) || 'Date must be more or equal today'
				],
				peopleRules: [
					v => !!v || 'Count people is required',
					v => !isNaN( v - parseInt( v ) ) && parseInt( v ) > 0 || 'Count people must be a number'
				]
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
			},
		},
    methods: {
      async createCard () {
				await this.compressImages()

        if (this.$refs.form.validate()) {
          var d = new Date((this.date + ' ' + this.time).replace(/-/g, '/'));

          const card = {
            title: this.title,
						desc: this.desc,
						time: -d ,
						people: this.people,
						images: this.images,
            files: this.files
          }

          this.$store.dispatch('createCard', card)
            .then(() => {
              this.$router.push('/user/' + this.$store.getters.userId)
            })
            .catch(() => {})
        }
      },
      triggerUpload () {
        this.$refs.fileInput.click()
      },
      async onFileChange (event) {
				
				const files = event.target.files
				console.log('NewCard onFilechange() [files]', files)
				this.images = []

				for (let i = 0; i < files.length; i++) {
					let read = new FileReader()

					read.onload = e => {
						this.images.push(read.result)
					}

					read.readAsDataURL(files[i])
				}

				// const width = 500;
				// const height = 300;
				// const fileName = files[0].name;
				// const reader = new FileReader();
				// reader.readAsDataURL(files[0]);
				// reader.onload = event => {
				// 		const img = new Image();
				// 		img.src = event.target.result;
				// 		img.onload = () => {
				// 						const elem = document.createElement('canvas');
				// 						elem.width = width;
				// 						elem.height = height;
				// 						const ctx = elem.getContext('2d');
				// 						// img.width and img.height will give the original dimensions
				// 						ctx.drawImage(img, 0, 0, width, height);
				// 						ctx.canvas.toBlob((blob) => {
				// 								const file = new File([blob], fileName, {
				// 										type: 'image/jpeg',
				// 										lastModified: Date.now()
				// 								});
				// 								console.log(file)
				// 						}, 'image/jpeg', 1);
				// 				},
				// 				reader.onerror = error => console.log(error);
				// };

				this.files = files
			},
			async compressImages () {
				var fil = []

				var options = {
					maxSizeMB: 1,
					maxWidthOrHeight: 640,
					useWebWorker: true
				}
				for(let i = 0; i<this.files.length; i++) {
					try {
						const compressedFile = await imageCompression(this.files[i], options);  // maxSizeMB, maxWidthOrHeight are optional
						console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
						console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
				
						//await uploadToServer(compressedFile); // write your own logic
						fil.push(compressedFile)
					} catch (error) {
						console.log(error);
					}
				}

				this.files = fil
			},
			deleteImage (i) {
				this.images.splice(i, 1)
			},
			// some stupid methods
			swap (i, way) {
				let len = this.images.length
				if ( (i == 0 && way == 0) || (i == len - 1 && way == 2)) {
					swap(this.images, len - 1, 0)
				} else {
					swap(this.images, i - 1 + way, i)
				}
			}
    }
  }
</script>

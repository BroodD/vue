<template>
   <v-container grid-list-md fluid>
		<v-layout row wrap justify-center>
			<v-flex xs12 sm10>
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
								:rules="[v => !!v || 'Description is required']"
							></v-textarea>

							<v-text-field
								name="people"
								label="Count people"
								type="text"
								v-model="people"
								:rules="peopleRules"
								placeholder="14"
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
								width="290px"
							>
								<v-text-field
									slot="activator"
									label="Set a date"
									readonly
									v-model="date"
									:rules="dateRules"
									placeholder="2018-01-01"
								></v-text-field>
								<v-date-picker v-model="date" @input="$refs.date.save(date)"></v-date-picker>
							</v-dialog>

							<v-dialog
								ref="time"
								v-model="timeModal"
								:return-value.sync="time"
								persistent
								lazy
								full-width
								width="290px"
							>
								<v-text-field
									slot="activator"
									v-model="time"
									label="Set a time"
									readonly
									placeholder="09:20"
								></v-text-field>
								<v-time-picker
									v-model="time"
									full-width
								>
									<v-spacer></v-spacer>
									<v-btn flat color="primary" @click="timeModal = false">Cancel</v-btn>
									<v-btn flat color="primary" @click="$refs.time.save(time)">OK</v-btn>
								</v-time-picker>
							</v-dialog>
						</v-form>
						<v-layout row wrap>
							<v-flex
								v-for="(img, i) in images"
								:key="i"
								d-flex
								md4
							>
								<v-card>
									<v-img
										:src="img.src"
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
									:disabled="!valid || !images || loading"
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
					v => (new Date(Date.parse(v)) >= new Date) || 'Date must be more or equal today'
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
      }
    },
    methods: {
      createCard () {
        if (this.$refs.form.validate()) {
          const card = {
            title: this.title,
						desc: this.desc,
						time: this.time,
						date: this.date,
						visit: this.$store.getters.userId,
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
      onFileChange (event) {
				const files = event.target.files
				this.images = []

				for (let i = 0; i < files.length; i++) {
					let read = new FileReader()

					read.onload = e => {
						this.images.push({
							src: read.result,
							name: files[i].name
						})
					}

					read.readAsDataURL(files[i])
				}

        this.files = files;
			},
			deleteImage (i) {
				this.images.splice(i, 1)
			},
			swap (i, way) {
				let len = this.images.length
				if ( (i == 0 && way == 0) || (i == len - 1 && way == 2)) {
          let temp = this.images[len - 1].src
          this.$set(this.images[len - 1], 'src', this.images[0].src)
          this.$set(this.images[0], 'src', temp)
					temp = this.images[len - 1].name
					this.$set(this.images[len - 1], 'name', this.images[0].name)
					this.$set(this.images[0], 'name', temp)
				} else {
					let temp = this.images[i].src
					this.$set(this.images[i], 'src', this.images[i - 1 + way].src)
					this.$set(this.images[i - 1 + way], 'src', temp)
          temp = this.images[i].name
          this.$set(this.images[i], 'name', this.images[i - 1 + way].name)
          this.$set(this.images[i - 1 + way], 'name', temp)
				}
			}
    }
  }
</script>

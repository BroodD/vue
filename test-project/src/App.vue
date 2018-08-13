<template>
	<Countdown date="August 15, 2016"></Countdown>
	<div class="training">
		<h1>Math traning. Level {{ level + 1 }} </h1>
		<hr>
		<div class="progress">
			<div class="progress-bar" :style="progressStyles"></div>
		</div>
		<div class="box">
			<transition name="flip" mode="out-in">
				<AppStartScreen 
					v-if="state === 'start'"
					@onStart="onStart">
				</AppStartScreen>

				<AppQuestion 
					v-else-if="state === 'question'"
					@success="onQuestSuccess"
					@error="onQuestError"
					:settings="levels[level]">
				</AppQuestion>

				<AppMessage 
					v-else-if="state === 'message'"
					:type="message.type"
					:text="message.text"
					@onNext="onNext">
				</AppMessage>

				<AppResultScreen 
					v-else-if="state === 'result'"
					:stats="stats"
					@repeat="onStart"
					@nextLevel="onNextLevel">
				</AppResultScreen>

				<div v-else>Unknown state</div>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		// name: 'app',
		data () {
			return {
				state: 'start',
				stats: {
					success: 0,
					error: 0
				},
				message: {
					type: '',
					text: ''
				},
				questMax: 2,
				level: 0,
				levels: [
					{
						from: 10,
						to: 40,
						range: 5,
						variants: 2
					},
					{
						from: 100,
						to: 200,
						range: 20,
						variants: 4
					},
					{
						from: 500,
						to: 900,
						range: 40,
						variants: 6
					}
				]
			}
		},
		computed: {
			questDone() {
				return this.stats.success + this.stats.error;
			},
			progressStyles() {
				return {
					width: (this.questDone / this.questMax * 100) + '%'
				}
			}
		},
		methods: {
			onStart() {
				this.state = 'question';
				this.stats.success = 0;
				this.stats.error = 0;
			},
			onQuestSuccess() {
				this.state = 'message';
				this.message.text = 'Good Job!';
				this.message.type = 'success';
				this.stats.success++;
			},
			onQuestError(msg) {
				this.state = 'message';
				this.message.text = msg;
				this.message.type = 'warning';
				this.stats.error++;
			},
			onNext() {
				if(this.questDone < this.questMax)
					this.state = 'question';
				else this.state = "result";
			},
			onNextLevel() {
				if(this.level < this.levels.length - 1) {
					this.level++;
				} else this.level = 0;
				this.onStart();
			}
		}
	}
</script>
<style lang="sass">
	.training
		max-width: 700px
		margin: 20px auto

	.box
		margin: 20px 0

	.flip
		&-enter
			&-active
				animation: flipX 0.3s linear
				transform-origin: top
		&-leave
			&-active
				animation: flipXOut 0.3s linear
				transform-origin: top
	@keyframes flipX
		from
			transform: rotateX(90deg)
		to
			transform: rotateX(0deg)

	@keyframes flipXOut
		from
			transform: rotateX(0deg)
		to
			transform: rotateX(90deg)
</style>
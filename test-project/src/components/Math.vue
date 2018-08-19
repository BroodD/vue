<template>
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
					:settings="levels[level]"
					:time="time">
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
		data() {
			return {
				time: 0,
				timer: null,
				state: 'start',
				stats: {
					success: 0,
					error: 0
				},
				message: {
					type: '',
					text: ''
				},
				questMax: 3,
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
					},
					{
						from: 1000,
						to: 2000,
						range: 50,
						variants: 10
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
			startTime() {
				this.time = 20;
				this.timer = setInterval( () => {
					if (this.time > 0) {
						this.time--
					} else {
						this.onQuestError("Time out!")
						clearInterval(this.timer)
						this.resetTime()
					}
				}, 1000 )
			},
			setTime(payload) {
				this.time = (payload.minutes * 60 + payload.secondes)
			},
			stopTime() {
				clearInterval(this.timer)
				this.timer = null
			},
			resetTime() {
					this.stopTime()
					this.time = 0
					this.secondes = 0
					this.minutes = 0
			},
			onStart() {
				this.state = 'question';
				this.stats.success = 0;
				this.stats.error = 0;
				this.setTime({minutes: 0, secondes: 20});
				this.startTime();
			},
			onQuestSuccess() {
				this.resetTime()
				this.state = 'message';
				this.message.text = 'Good Job!';
				this.message.type = 'success';
				this.stats.success++;
			},
			onQuestError(msg) {
				this.resetTime()
				this.state = 'message';
				this.message.text = msg;
				this.message.type = 'warning';
				this.stats.error++;
			},
			onNext() {
				if(this.questDone < this.questMax) {
					this.state = 'question';
					this.setTime({minutes: 0, secondes: 20});
					this.startTime();
				}
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
				transform-origin: bottom
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
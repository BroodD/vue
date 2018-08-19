<template>
	<div class="alert alert-secondary">
		<div class="d-flex justify-content-between">
			<h3>{{ x }} + {{ y }} = ?</h3>
			<h3><timer :time="prettyTime"></timer></h3>
		</div>
		<div class="buttons">
			<button
				class="btn btn-success"
				v-for="(number, i) in answers"
				@click="onAnswer(number)" :key="i">
				{{ number }}
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['settings', 'time'],
		data() {
			return {
				x: mtRand(this.settings.from, this.settings.to),
				y: mtRand(this.settings.from, this.settings.to)
			}
		},
		computed: {
			prettyTime() {
				let time = this.time / 60
				let minutes = parseInt(time)
				let secondes = Math.round((time - minutes) * 60)
				return minutes+":"+secondes
			},
			good() {
				return this.x + this.y;
			},
			answers() {
				let res = [this.good];

				while(res.length < this.settings.variants) {
					let num = mtRand(this.good - this.settings.range, this.good + this.settings.range);

					if(res.indexOf(num) === -1)
						res.push(num);
				}

				return res.sort(function() {
					return Math.random() > 0.5;
				});
				// return res;
			}
		},
		methods: {
			show(i) {
				alert("awd"+i);
			},
			onAnswer(num) {
				if(num == this.good) {
					this.$emit('success');
				} else {
					this.$emit('error', `${this.x} + ${this.y} = ${this.good}!`);
				}
			}
		}
	}

	function mtRand(min, max) {
		let diff = max - min;
		return Math.floor(Math.random() * (diff + 1)) + min;
	}
</script>

<style lang="sass" scoped>
	.alert
		padding-top: 20px
		background-color: #eee
	
	.buttons
		margin: 30px 0
		display: flex
		justify-content: space-around
</style>
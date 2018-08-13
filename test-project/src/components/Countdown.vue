<template>
	<div class="block">
			<p class="digit">{{ days }}</p>
			<p class="text">Days</p>
	</div>
	<div class="block">
			<p class="digit">{{ hours }}</p>
			<p class="text">Hours</p>
	</div>
	<div class="block">
			<p class="digit">{{ minutes }}</p>
			<p class="text">Minutes</p>
	</div>
	<div class="block">
			<p class="digit">{{ seconds }}</p>
			<p class="text">Seconds</p>
	</div>
</template>

<script>
export default {
	data () {
		return {
			now: Math.trunc((new Date()).getTime() / 1000)
    
			props: {
					date: {
							type: Number,
							coerce: str => Math.trunc(Date.parse(str) / 1000)
					}
			},

			computed: {
				seconds() {
						return (this.date - this.now) % 60;
				},

				minutes() {
						return Math.trunc((this.date - this.now) / 60) % 60;
				},

				hours() {
						return Math.trunc((this.date - this.now) / 60 / 60) % 24;
				},

				days() {
						return Math.trunc((this.date - this.now) / 60 / 60 / 24);
				}
			}
		},
		ready() {
			window.setInterval(() => {
					this.now = Math.trunc((new Date()).getTime() / 1000);
			},1000);
		},
	}
}
</script>
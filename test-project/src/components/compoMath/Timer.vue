<template>
	<div class="timer">{{ time | prettify }}</div>
</template>

<script>
	export default {
		props:['time'],
		filters: {
			prettify : function(value) {
				let data = value.split(':')
				let minutes = data[0]
				let secondes = data[1]
				if (minutes < 10) {
					minutes = "0"+minutes
				}
				if (secondes < 10) {
					secondes = "0"+secondes
				}
				if (minutes == 0)
					return secondes+"s"
				return minutes+":"+secondes
			}
		}
	}
</script>

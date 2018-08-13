<template>
	<div class="alert alert-primary">
		<h3>Success: {{ stats.success }}</h3>
		<h3>Error: {{ stats.error }}</h3>
		<hr>
		<button
			class="btn btn-primary"
			@click="$emit('repeat')">
			Repet
		</button>
		<button
			class="btn btn-primary"
			@click="$emit('nextLevel')">
			Next Level
		</button>
	</div>
</template>

<script>
	export default {
		props: ['stats']
	}
</script>

<style lang="sass">
	
</style>
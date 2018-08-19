<template>
	<div>
		<div class="container">
			<div class="row justify-content-around">
				<div class="col-auto">
					<button class="btn btn-primary" @click="navState = 'math'">Math traning</button>
				</div>
				<div class="col-auto">
					<button class="btn btn-primary" @click="navState = 'questions'">Questions</button>
				</div>
			</div>
		</div>
		<AppMath v-if="navState === 'math'"></AppMath>
		<AppQuestions v-else-if="navState === 'questions'"></AppQuestions>
	</div>
</template>


<script>
	export default {
		data() {
			return {
				navState: 'questions'
			}
		}
	}
</script>
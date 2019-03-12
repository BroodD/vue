export
var scroll = {
	data () {
		return {
			scroll: 0
		}
	},
	methods: {
		onScroll(e) {
			var contentHeight = document.querySelector('#my')
			var top = e.target.scrollTop
			if (top > this.scroll && top >= contentHeight.clientHeight - e.target.offsetHeight * 2) {
				console.log(e.target.scrollTop, this.scroll, contentHeight.clientHeight)
				this.scroll = top + e.target.offsetHeight * 2
				this.reload()
			}
		}
	}
}
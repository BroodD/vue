var constructor = new Vue({
	el: '#constructor',
	data: {
		items: [
			[
				{
					name: "Шось тупе",
					height: "110",
					url: "img/const_for_1.png"
				},
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
			],
			[
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
				{
					name: "Арена (синий мрамор)",
					height: "110",
					url: "img/const_for_1.png"
				},
			],
		]
	},
	computed: {
		sum: function() {
			return this.products.reduce(function(sum, current) {
				return sum + ( current.price * current.count);
			}, 0);
		}
	},
	methods: {
		deleteProduct: function(index) {
			this.products.splice(index, 1);
		}
	}
});

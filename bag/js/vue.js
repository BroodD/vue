var bag = new Vue({
	el: '#bag',
	data: {
		products: [
			{
				img: "img/bag_product.png",
				name: "Алюминиевая накладка 8-ми угольная Жгутик 433 зол. д.140",
				price: 87,
				count: 1
			},
			{
				img: "img/bag_product.png",
				name: "Чайник 18 века",
				price: 99,
				count: 1
			}
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
})
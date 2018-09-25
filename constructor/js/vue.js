var constructor = new Vue({
	el: '#constructor',
	data: {
		choose: [],
		items: [
			[
				{
					name: "Арена (синий мрамор)",
					height: "12",
					url: "img/const_for_1.png",
					price: 53
				},
				{
					name: "Арена 1",
					height: "90",
					url: "img/const_for_1.png",
					price: 98
				},
				{
					name: "Арена 2",
					height: "56",
					url: "img/const_for_1.png",
					price: 86
				},
				{
					name: "Арена 3",
					height: "56",
					url: "img/const_for_1.png",
					price: 86
				},
				{
					name: "Арена 4",
					height: "32",
					url: "img/const_for_1.png",
					price: 21
				},
				{
					name: "Арена 5",
					height: "12",
					url: "img/const_for_1.png",
					price: 53
				},
				{
					name: "Арена 6",
					height: "90",
					url: "img/const_for_1.png",
					price: 98
				},
				{
					name: "Арена 6",
					height: "56",
					url: "img/const_for_1.png",
					price: 86
				},
				{
					name: "Арена 7",
					height: "32",
					url: "img/const_for_1.png",
					price: 21
				},
				{
					name: "Арена 8",
					height: "32",
					url: "img/const_for_1.png",
					price: 9023213
				},
				{
					name: "Арена 9",
					height: "32",
					url: "img/const_for_1.png",
					price: 6005
				},
			],
			[
				{
					name: "Подставка",
					height: "123",
					url: "img/const_for_2.png",
					price: 5
				},
				{
					name: "Подставка 2",
					height: "56",
					url: "img/const_for_2.png",
					price: 37
				},
				{
					name: "Подставка 3",
					height: "75",
					url: "img/const_for_2.png",
					price: 61
				},
				{
					name: "Подставка 4",
					height: "98",
					url: "img/const_for_2.png",
					price: 89
				},
				{
					name: "Подставка 5",
					height: "123",
					url: "img/const_for_2.png",
					price: 5
				},
				{
					name: "Подставка 6",
					height: "56",
					url: "img/const_for_2.png",
					price: 37
				},
				{
					name: "Подставка 7",
					height: "75",
					url: "img/const_for_2.png",
					price: 61
				},
				{
					name: "Подставка 8",
					height: "98",
					url: "img/const_for_2.png",
					price: 89
				},
				{
					name: "Подставка 9",
					height: "56",
					url: "img/const_for_2.png",
					price: 37
				},
				{
					name: "Подставка 10",
					height: "75",
					url: "img/const_for_2.png",
					price: 61
				},
				{
					name: "Подставка 11",
					height: "98",
					url: "img/const_for_2.png",
					price: 89
				},
			],
			[
				{
					name: "Нижняя арена",
					height: "123",
					url: "img/const_for_3.png",
					price: 999
				},
				{
					name: "Нижняя арена 1",
					height: "56",
					url: "img/const_for_3.png",
					price: 373
				},
				{
					name: "Нижняя арена 2",
					height: "75",
					url: "img/const_for_3.png",
					price: 6122
				},
				{
					name: "Нижняя арена 3",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
				{
					name: "Нижняя арена 4",
					height: "123",
					url: "img/const_for_3.png",
					price: 56
				},
				{
					name: "Нижняя арена 5",
					height: "56",
					url: "img/const_for_3.png",
					price: 373
				},
				{
					name: "Нижняя арена 6",
					height: "75",
					url: "img/const_for_3.png",
					price: 6122
				},
				{
					name: "Нижняя арена 7",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
				{
					name: "Нижняя арена 8",
					height: "75",
					url: "img/const_for_3.png",
					price: 6122
				},
				{
					name: "Нижняя арена 9",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
				{
					name: "Нижняя арена 10",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
			],
		]
	},
	beforeMount() {
		for( let i=0; i<this.items.length; i++) {
			this.choose.push({
				name: this.items[i][0].name,
				height: this.items[i][0].height,
				price: this.items[i][0].price
			})
		}
	},
	computed: {
		gHeight() {
			return this.choose.reduce(function(sum, current) {
				return sum + parseInt(current.height);
			}, 0);
		},
		gPrice() {
			return this.choose.reduce(function(price, current) {
				return price + current.price;
			}, 0);
		}
	},
	methods: {
		changeName(index, i) {
			// not work with object use $set
			// this.names[index] = this.items[index][i].name; 

			this.$set(this.choose[index], 'name', this.items[index][i].name);
			this.$set(this.choose[index], 'height', this.items[index][i].height);
			this.$set(this.choose[index], 'price', this.items[index][i].price);
		}
	}
});



// for slick
for(var i=0; i<constructor.items.length; i++) {
	$('#slick__1-const-' + (i + 1)).slick({
		slidesToShow: 1,
		infinite: true,
		swipeToSlide: true,
			// focusOnSelect: true
			asNavFor: '#slick__10-const-' + (i + 1),
	});
	$('#slick__10-const-' + (i + 1)).slick({
		slidesToShow: 10,
		infinite: true,
		// slidesToScroll: 1,
		// rows: 2,
		touchThreshold: 15,
		swipeToSlide: true,
		focusOnSelect: true,
		asNavFor: '#slick__1-const-' + (i + 1),
		responsive: [
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 5,
			}
		},
		]
	});

	// on beforeChange call method
	$('#slick__1-const-' + (i + 1)).on('beforeChange', { value: i }, function(event, slick, currentSlide, nextSlide) {
		constructor.changeName(event.data.value, nextSlide);
	});
}

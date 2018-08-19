var constructor = new Vue({
	el: '#constructor',
	data: {
		choose: [],
		items: [
			[
				{
					name: "Шось тупе",
					height: "12",
					url: "img/const_for_1.png",
					price: 53
				},
				{
					name: "Шось кругле",
					height: "90",
					url: "img/const_for_1.png",
					price: 98
				},
				{
					name: "Вроді ваза",
					height: "56",
					url: "img/const_for_1.png",
					price: 86
				},
				{
					name: "Чи тарілка?",
					height: "56",
					url: "img/const_for_1.png",
					price: 86
				},
				{
					name: "Може ананас",
					height: "32",
					url: "img/const_for_1.png",
					price: 21
				},
				{
					name: "Не, в мене алергія",
					height: "12",
					url: "img/const_for_1.png",
					price: 53
				},
				{
					name: "Тоді аскурбінку",
					height: "90",
					url: "img/const_for_1.png",
					price: 98
				},
				{
					name: "О доза!!",
					height: "56",
					url: "img/const_for_1.png",
					price: 86
				},
				{
					name: "Останій",
					height: "32",
					url: "img/const_for_1.png",
					price: 21
				},
				{
					name: "Намахав",
					height: "32",
					url: "img/const_for_1.png",
					price: 9023213
				},
				{
					name: "Давай ще раз крутани",
					height: "32",
					url: "img/const_for_1.png",
					price: 6005
				},
			],
			[
				{
					name: "Якась кругла штука",
					height: "123",
					url: "img/const_for_2.png",
					price: 5
				},
				{
					name: "Лисий Дмитро",
					height: "56",
					url: "img/const_for_2.png",
					price: 37
				},
				{
					name: "Миска для пса",
					height: "75",
					url: "img/const_for_2.png",
					price: 61
				},
				{
					name: "Арена бою",
					height: "98",
					url: "img/const_for_2.png",
					price: 89
				},
				{
					name: "Підставка",
					height: "123",
					url: "img/const_for_2.png",
					price: 5
				},
				{
					name: "Білий Василь",
					height: "56",
					url: "img/const_for_2.png",
					price: 37
				},
				{
					name: "Россссомаха",
					height: "75",
					url: "img/const_for_2.png",
					price: 61
				},
				{
					name: "Підставка для ноутбука",
					height: "98",
					url: "img/const_for_2.png",
					price: 89
				},

				{
					name: "Чмирік",
					height: "56",
					url: "img/const_for_2.png",
					price: 37
				},
				{
					name: "Костиль",
					height: "75",
					url: "img/const_for_2.png",
					price: 61
				},
				{
					name: "Макарон",
					height: "98",
					url: "img/const_for_2.png",
					price: 89
				},
			],
			[
				{
					name: "Хз шо (але дорого)",
					height: "123",
					url: "img/const_for_3.png",
					price: 999
				},
				{
					name: "Чорний Василь",
					height: "56",
					url: "img/const_for_3.png",
					price: 373
				},
				{
					name: "Оріфлейм натурейшин",
					height: "75",
					url: "img/const_for_3.png",
					price: 6122
				},
				{
					name: "Стиглий ананас",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
				{
					name: "Миска",
					height: "123",
					url: "img/const_for_3.png",
					price: 56
				},
				{
					name: "Чорний Василь",
					height: "56",
					url: "img/const_for_3.png",
					price: 373
				},
				{
					name: "Оріфлейм натурейшин",
					height: "75",
					url: "img/const_for_3.png",
					price: 6122
				},
				{
					name: "Стиглий ананас",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
				{
					name: "Оріфлейм натурейшин",
					height: "75",
					url: "img/const_for_3.png",
					price: 6122
				},
				{
					name: "Стиглий ананас",
					height: "98",
					url: "img/const_for_3.png",
					price: 895
				},
				{
					name: "Миска",
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

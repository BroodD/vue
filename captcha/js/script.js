new Vue({
  el: '#wrap',
  data: {
    input: '',
    countMin: 4,
    countMax: 8,
    numbers: [
      // 0
      [
        1, 1, 1,
        1, 0, 1,
        1, 0, 1,
        1, 0, 1,
        1, 1, 1
      ],
      // 1
      [
        0, 0, 1,
        0, 1, 1,
        1, 0, 1,
        0, 0, 1,
        0, 0, 1,
      ],
      // 2
      [
        1, 1, 1,
        0, 0, 1,
        0, 1, 1,
        1, 0, 0,
        1, 1, 1
      ],
      // 3
      [
        1, 1, 1,
        0, 0, 1,
        0, 1, 0,
        0, 0, 1,
        1, 1, 1
      ],
      // 4
      [
        1, 0, 1,
        1, 0, 1,
        1, 1, 1,
        0, 0, 1,
        0, 0, 1
      ],
      // 5
      [
        1, 1, 1,
        1, 0, 0,
        1, 1, 1,
        0, 0, 1,
        1, 1, 1
      ],
      // 6
      [
        1, 1, 1,
        1, 0, 0,
        1, 1, 1,
        1, 0, 1,
        1, 1, 1
      ],
      // 7
      [
        1, 1, 1,
        0, 0, 1,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
      ],
      // 8
      [
        1, 1, 1,
        1, 0, 1,
        1, 1, 1,
        1, 0, 1,
        1, 1, 1
      ],
      // 9
      [
        1, 1, 1,
        1, 0, 1,
        1, 1, 1,
        0, 0, 1,
        1, 1, 1,
      ]
    ]
  },
  computed: {
    result () {
      return this.countNumber.join('');
    },
    countNumber () {
      let num = [];
      for(var i = 0; i < this.randomMinMax(this.min, this.max); i++) {
        num.push( this.randomMinMax(0, 9) );
      }
      return num;
    }
  },
  methods: {
    valid () {
      return this.input == this.result;
    },

    randomMinMax (min, max) {
      return Math.floor(this.countMin + Math.random() * (this.countMax + 1 - this.countMin));
    }
  }
})
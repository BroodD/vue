var
  numbers = [
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
  ];

class Captcha {
  constructor(box, input, message, min = 4, max = 8) {
    this.countMin = min,
    this.countMax = max,

    this.input = '',
    this.result = ''

    this.generate(),

    this.init(box),

    this.inputCaptcha(input, message)
  }

  generate () {
    let num = [];
    for(var i = 0; i < this.randomMinMax(this.countMin, this.countMax); i++) {
      num.push( this.randomMinMax(0, 9) );
    }
    this.result = num;
    return num;
  }

  init (box) {
    let wrap = document.querySelector(box);

    this.result.forEach(function (element) {

      // num element || some nubmer div
      let num = document.createElement('div');
      num.className = 'num col-3 row';

      numbers[element].forEach(function (el) {
        // cell of number
        let cell = document.createElement('div');
        cell.className = 'cell col-4';
        if(el) 
          cell.className += ' red';
        num.appendChild(cell);
      })

      wrap.appendChild(num);
    })
  }

  inputCaptcha(input, message) {
    let inp = document.querySelector(input);
    let msg = document.querySelector(message);
    let _self = this;

    inp.value = '';

    inp.addEventListener('input', function () {
      _self.input = this.value
      if(_self.valid()) {
        msg.innerText = "Okey";
        msg.classList.remove('alert-danger');
        msg.classList.add('alert-primary');
      } else {
        msg.classList.remove('alert-primary');
        msg.classList.add('alert-danger');
        msg.innerText = "Error";
      }
    })
  }
 
  valid () {
    return this.input == this.result.join('');
  }

  randomMinMax (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}

var cp = new Captcha('#wrap', '#input', '#error', 4, 8);
// var cp = new Captcha('#wrap1', '#input1', '#error1', 10, 20);





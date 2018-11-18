<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <label class="form-group">
          Number of rows
          <input class="form-control" v-model="width">
        </label>
        <label class="form-group">
          Number of cols
          <input class="form-control" v-model="height">
        </label>
        <label class="form-group">
          Number of miners
          <input class="form-control" v-model="mineCount">
        </label>
        <label class="form-group">
          <input
          class="form-control btn-primary" 
          type="submit" 
          value="Start"
          @click="fill"
          >
        </label>

        <h3
          v-show="stage"
          class="alert"
          :class="{ 'alert-success': stage == 'win', 'alert-danger': stage == 'lose' }"
        >{{ stage.toUpperCase() }}</h3>
      </div>
    </div>

    <div class="col-12">
      <div
        v-for="(row, i) in cells"
        class="row"
      >
        <div
          v-for="(cell, j) in row"
          class="cell"
          :class="{ open: cell.isOpen, lock: cell.isLock, mine: cell.isMine && stage}"
          @click.left="open(i,j)"
          @click.right.prevent="lock(i,j)"
        >
          <span v-if="cell.isOpen">
            {{ cell.mineAround == 0 ? '' : cell.mineAround }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Cell {
  constructor() {
    this.isMine     = false,
    this.isOpen     = false,
    this.isLock     = false
    this.mineAround = 0
  }
}
export default {
  name: 'app',
  data () {
    return {
      width: 6,
      height: 6,
      mineCount: 5,
      cells: [],
      openCount: 0,

      stage: ''
    }
  },

  methods: {
    rand (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    // main function for generate fields |> set mines |> contMineAroud
    fill () {
      this.cells = [];
      this.openCount = 0;
      this.stage = '';

      // generate fields grid
      for (let i = 0; i < this.width; i++) {
        let temp = [];
        for (let j = 0; j < this.height; j++) {
          temp.push(new Cell())
        }
        this.cells.push(temp)
      }

      if( parseInt(this.mineCount) >= parseInt(this.width * this.height) )
        this.mineCount = parseInt(this.width * this.height) - 1;

      // sets mines
      for(let i = 0; i < this.mineCount;) {
        let x = this.rand(0, this.width - 1);
        let y = this.rand(0, this.height - 1);

        if( !(this.cells[x][y].isMine) ) {
          this.$set(this.cells[x][y], 'isMine', true);
          i++;
        }
      }

      this.mineAround();
    },

    mineAroundCounter (x, y) {
      var
        // dont go border
        xStart = x > 0 ? x - 1 : x,
        yStart = y > 0 ? y - 1 : y,
        xEnd   = x < this.width  - 1 ? x + 1 : x,
        yEnd   = y < this.height - 1 ? y + 1 : y,
        count = 0;

      for(let i = xStart; i <= xEnd; i++)
        for(let j = yStart; j <= yEnd; j++)
          if(this.cells[i][j].isMine && !(x==i && y==j))
            count++

      this.$set(this.cells[x][y], 'mineAround', count);
    },

    mineAround () {
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          this.mineAroundCounter(i, j);
        }
      }
    },

    open (x, y) {
      if( (this.cells[x][y].isLock || this.cells[x][y].isOpen || this.stage) ) return;
      if( this.cells[x][y].isMine ) {
        this.stage = 'lose';
      } else {
        this.$set(this.cells[x][y], 'isOpen', true);
        this.openCount++;

        if(this.cells[x][y].mineAround == 0) {
          // so hard because recursion
          for(let i = x>0?x-1:x; i <= x + 1 && i<this.width; i++)
            for(let j = y>0?y-1:y; j <=  y + 1 && j<this.height; j++)
              this.open(i, j);
        }

        if( this.openCount + parseInt(this.mineCount) == parseInt(this.width * this.height))
          this.stage = 'win';
      }
    },

    lock (x, y) {
      if( !(this.cells[x][y].isOpen && this.stage) )
        this.$set(this.cells[x][y], 'isLock', !this.cells[x][y].isLock);
    }

  },
}
</script>

<style>
.cell {
  position: relative;
  height: 40px;
  width: 40px;
  background-color: grey;
  border: 1px solid black;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  transition: opacity 400ms ease;
}
.cell:hover {
  opacity: 0.4;
}

.mine {
  background-color: tomato;
}

.open {
  background-color: #3e94e7;
  color: #fff;
}

.lock {
  background-color: #b3b3b3;
}
.lock::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  background-color: #FFC628;
  border-radius: 50%;
}
</style>

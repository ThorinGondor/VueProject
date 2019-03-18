Vue.component('number-input', {
    template: '<div class="num-ipt">\
                   <input type="text" :value="currentValue" @change="handleChange">\
                   <button @click="handleDecrease">-</button>\
                   <button @click="handleIncrease">+</button>\
               </div>',
    props: { //使用props来声明需要从父级接收的数据
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        parent_value: {
            type: Number,
            default: 7
        }
    },
    data: function () {
      return {
          currentValue: this.parent_value
      }
    },
    watch: {
      currentValue: function (val) {
          this.$emit('input', val); //传递给 :value
          this.$emit('on-change', val);// 传递给 @change
      },
      parent_value: function (val) {
          this.updateValue(val);
      }
    },
    methods: {
        updateValue: function (val) {
            if (val>this.max) val = this.max;
            if (val<this.min) val = this.min;
            this.currentValue = val;
        },
        handleDecrease: function () {
            if (this.currentValue<=this.min) return;
            this.currentValue -= 1;
        },
        handleIncrease: function () {
            if (this.currentValue>=this.max) return;
            this.currentValue += 1;
        },
        handleChange: function () {

        }
    },
    mounted: function () {
        this.updateValue(this.parent_value);
    }
});
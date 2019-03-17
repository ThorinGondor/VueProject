Vue.component('number-input', {
    template: '<div class="num-ipt"></div>',
    props: { //使用props来声明需要从父级接收的数据
        max: {
            type: number,
            default: Infinity
        },
        min: {
            type: number,
            default: -Infinity
        },
        value: {
            type: number,
            default: 0
        }
    },
    data: function () {
      return {
          currentValue: this.parent_value
      }
    },
    watch: {
      currentValue: function (val) {
          this.$emit('input', val);
          this.$emit('on-change', val);
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
        }
    },
    mounted: function () {
        this.updateValue(this.parent_value);
    }
});
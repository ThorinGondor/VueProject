Vue.component('number-input', {
    template: '<div class="num-ipt">\
                   <input type="text" :value="currentValue" @change="handleChange">\
                   <button @click="handleDecrease">-</button>\
                   <button @click="handleIncrease">+</button>\
               </div>',
    props: { //使用props来声明需要从父级接收的数据 max min(在html) parent_value(app内)
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
      currentValue: function (val) { //子级数据变化，传递给父级，更新父级数据
          this.$emit('input', val); //传递给 :value
          this.$emit('on-change', val);// 传递给 @change
      },
      parent_value: function (val) { //父级数据变化，从而更新子级数据
          this.updateValue(val);
      }
    },
    methods: {
        updateValue: function (val) { //过滤函数，确保currentValue在范围内
            if (val>this.max) val = this.max;
            if (val<this.min) val = this.min;
            this.currentValue = val;
        },
        handleDecrease: function () { //按钮减一
            if (this.currentValue<=this.min) return;
            this.currentValue -= 1;
        },
        handleIncrease: function () { //按钮加一
            if (this.currentValue>=this.max) return;
            this.currentValue += 1;
        },
        handleChange: function (event) { //当手工输入数值时，将触发该函数，确保输入的值在范围内
            console.log('handle change!');
            var val = event.target.value.trim();
            var maxThreshold = this.max;
            var minThreshold = this.min;
            val = Number(val);
            this.currentValue = val;
            if (val>maxThreshold)
                this.currentValue = maxThreshold;
            else if (val<minThreshold)
                this.currentValue = minThreshold;
        }
    },
    mounted: function () { //本Vue组件挂载后调用该函数，获取父级数据，从而更新子级数据
        console.log('Mounted Done!');
        this.$nextTick(function () { //nextTick 等待Vue实例app挂载完成后再更新数据，否则获取不到app
            this.updateValue(app.$data.parent_value);
        });
    }
});
Vue.component('pane', {
   name: 'pane',
   template: '<div class="pane" v-show="show">\
                  <slot></slot>\
              </div>',
    data: function () {
        return {
            show: true
        }
    },
    props:{ //声明需要从父级获取的数据
       name: {
           type: String
       },
        label: {
           type: String,
            default: ''
        }
    },
    methods: {
       updateNav(){
           this.$parent.updateNav();
       }
    },
    watch: {
       label (){
         this.updateNav();
       }
    },
    mounted (){
       this.updateNav();
    }
});
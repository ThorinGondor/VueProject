var app = new Vue({
    el: "#app",
    data: {
        list: [
            {
                id: 1,
                name: 'iPhone XS',
                price: 7188,
                count: 37
            },
            {
                id: 2,
                name: 'iPad Pro',
                price: 5888,
                count: 5
            },
            {
                id: 3,
                name: 'MacBook Air',
                price: 21488,
                count: 10
            }
        ]
    },
    computed: {
        totalPrice: function () {
            let totalPrice = 0;
            for (let i = 0; i< this.list.length; i++){
                totalPrice += this.list[i].price * this.list[i].count;
            }
            return totalPrice.toString().replace(/\B(?=(\d{3})+$)/g, ','); //价格转千分位显示法
        }
    },
    methods: {
        handleDel: function(index) {
            if (this.list[index].count===1)
                return;
            this.list[index].count--;
        },
        handleAdd: function(index) {
          this.list[index].count++;
        },
        handleRemove: function (index) {
            this.list.splice(index, 1)
        }
    }
});
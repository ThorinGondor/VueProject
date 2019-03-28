var app = new Vue({
    el: '#app',
    data: {
        if_show: false
    },
    methods: {
        handleClose: function () {
            this.if_show = false;
        }
    }
});
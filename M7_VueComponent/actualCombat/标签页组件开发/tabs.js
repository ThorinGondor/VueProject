Vue.component('tabs', {
    template: '<div class="tabs">\
                  <div class="tabs-navibar">\
                    <!--标签页标题，此处应使用v-for-->\
                  </div>\
                  <div class="tabs-content">\
                    <!--此处的slot就是要嵌套的pane-->\
                    <slot></slot>\
                  </div>\
              </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods: {
        fetchTabs() {
            return this.$children.filter(function (item) {
               return item.$options.name === 'pane';
            });
        },
        updateNav() {
            this.navList = [];
            var _this = this;
            this.fetchTabs().forEach(function (pane, index) {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                if (!pane.name) pane.name = index;
                if (index===0) {
                    if (!_this.currentValue){
                        _this.currentValue = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            var tabs = this.fetchTabs();
            var _this = this;
            tabs.forEach(function (tab) {
                return tab.show = tab.name === _this.currentValue;
            })
        }
    }
});
Vue.directive('click_external', {
   bind: function (el, binding, vnode) {
       console.log('Test');
       function documentHandler(e){
           if (el.contains(e.target)){
               return false;
           }
           if (binding.expression){
               binding.value(e);
           }
       }
       //el.__vueClickExternal__ = documentHandler;
       document.addEventListener('click', documentHandler);
   } 
});
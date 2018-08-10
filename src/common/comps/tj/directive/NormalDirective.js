
exports.install = Vue => {

  /**
   * 是否可用
   */
  Vue.directive('s-enabled', {
    bind: function(el, binding) {

      if((binding.value+"") === true){
        // el.setAttribute("disabled","disabled") ;
        el.style["opacity"] = .5 ;
        el.style["pointer-events"] = "none" ;
      }
      else if(el.hasAttribute("disabled") ){
        // el.removeAttribute("disabled");
        el.style["opacity"] = 1 ;
        el.style["pointer-events"] = "auto" ;
      }
    },
    update: function(el, binding) {
    },
    unbind: function(el, binding) {
    }
  });



};

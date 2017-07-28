define(function(require,module,exports){
	var Vue = require("vue");
	// weui
	var weui = require("weui");
	var $ = require("zepto");
	var VueResource = require("vue-resource");
	Vue.use(VueResource);
	var queryVue = new Vue({
		el: "#g-page",
		data: {
			
		},
		methods:{
			backToUpPage:function(){
				history.go(-1);
			},
			changeTab:function(id,e){
				$(e.target).siblings().removeClass("weui-bar__item_on");
				$(e.target).addClass("weui-bar__item_on");
				$("div[name='content']").removeClass("show");
				$("#"+id).addClass("show");
			}
			
		},
		created:function(){
			
		}
	});
});
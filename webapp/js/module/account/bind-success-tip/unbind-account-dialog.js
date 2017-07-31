define(function(require, exports, module) {
	var $ = require("zepto");
	var dot = require("dot");
	//解绑对话框模板
	var unbindAccountDialogTpl = require("./unbind-account-dialog.html");
	$("body").append(unbindAccountDialogTpl);
	//解绑对话框dom
	var unbindAccountDialog = $("#unbind-account-dialog");
	
	//设置解绑url
	$.getJSON("../../../../account/getAccountUnBindUrl",function(data){
		unbindAccountDialog.find(".unbind-btn").prop("href",data.url);
	});
	
	
	unbindAccountDialog.on("click",".cancel-unbind-btn",function(){
		unbindAccountDialog.hide();
	});
	
	unbindAccountDialog.on("click",".unbind-btn",function(){
		var href = this.href;
		window.location.href = href;
	});
	
	function show(){
		unbindAccountDialog.show();
	}
	
	module.exports ={
			'show':show
	};

});
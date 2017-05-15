define(function(require, exports, module) {
	$(document).ready(function() {
		var evLadingId = $('#evLadingId').val();
		var ladingId = $('#ladingId').val();
		var ladingType = $('#ladingType').val();
		var url = "lading/toSetLadingPick.pfv?ladingId="+ladingId +"&ladingType="+ladingType+"&evLadingId="+evLadingId +"&rm="+Math.random();
		$.post(url,function(response){
			$("#content").html(response);
		});
	});
});
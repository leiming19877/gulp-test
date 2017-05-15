/**
 * 获取查询参数公共模块
 */
define(function(require, exports, module) {	
	//查询参数
	var params = {};
	/*
	*@param query {String} 查询字符串
	*/
	function parseQuery(query){
		var obj = {};//解析后的参数
		//以下正则表达式会把=及左右空格匹配
		var reg = /([^?&=]+)=*([^&=]*)&*/g;//匹配查询参数
		var result = null;
		while(result = reg.exec(query)){
		        var key = result[1];
		        var value = result[2];
		        obj[key] = value;
	     } 
		return  obj;	
	}
	//解析查询参数
	params = parseQuery(window.location.search);
	
	/**
	 * 获取指定查询数参数
	 */
	function getParam(paramName){
		return params[paramName];
	}
	
	module.exports ={
			"getParam":getParam
	}
});
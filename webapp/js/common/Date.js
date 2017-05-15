/**
 * 采用正则表达式替换形式进行格式化，函数求对日期格式支持类型进行检验
 * 对Date的格式，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * 使用例子
 * var date = new Date(2001, 8, 11, 8, 26, 8);
 * date.formatDate("yyyy");       返回值： "2001"
 * date.formatDate("yyyy-MM-dd");     返回值： "2001-09-11"
 * date.formatDate("yyyy-MM-dd HH");      返回值： "2001-09-11 08"
 * date.formatDate("yyyy-MM-dd HH:mm:ss");    返回值： "2001-09-11 08:26:08"
 **/
Date.prototype.formatDate = function(fmt) {
	//构造一个存日期字段对象
	var o = {
		"y+" : this.getFullYear(), //年份 
		"M+" : this.getMonth() + 1, //月份 
		"d+" : this.getDate(), //日 
		"H+" : this.getHours(), //小时 
		"m+" : this.getMinutes(), //分 
		"s+" : this.getSeconds(), //秒 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
		"S" : this.getMilliseconds()
	//毫秒 
	};
	var fmtValue = fmt;//格式化后值
	for ( var k in o) {
		fmtValue = fmtValue.replace(new RegExp("(" + k + ")"), function(v) {
			//如果是年份字段
			if (/y+/.test(v)) {
				//如果yyyyyy大于4时就按4个进行处理
				var len = (v.length > 4 ? 4 : v.length);
				return ("" + o[k]).substr(4 - len)
			}
			//如果是其它字段
			if (v.length == 1) {
				return o[k];
			} else {//返回二位字符
				return (("00" + o[k]).substr(("" + o[k]).length));
			}
		});
	}
	return fmtValue;
}
define(function(require, exports, module) {	
	
});
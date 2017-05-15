/**
例如： 
12345格式化为12,345.00 
12345.6格式化为12,345.60 
12345.67格式化为 12,345.67 
只留两位小数。 
**/
/**
 * 格式化为三位三位金额表现形式
 * @param digit  保留多少位小数
 */
String.prototype.formatMoney = function(digit)   {   
	   digit = digit > 0 && digit <= 20 ? digit : 2;   
	   var s = parseFloat((this + "").replace(/[^\d\.-]/g, "")).toFixed(digit) + "";   
	   var l = s.split(".")[0].split("").reverse();   
	   var r = s.split(".")[1];   
	   var t = "";   
	   for(var i = 0; i < l.length; i ++ )   
	   {   
	      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
	   }   
	   return t.split("").reverse().join("") + "." + r;   
}
/**
 * 格式化为三位三位金额表现形式
 * @param digit  保留多少位小数
 */
String.prototype.formatMoney2 = function(digit)   {   
   
	var tpMoney = '0.00';  
	if(undefined !== this){  
	    tpMoney = this;  
	}  
	tpMoney = new Number(tpMoney);  
	if(isNaN(tpMoney)){  
	  return '0.00';  
	}  
	tpMoney = tpMoney.toFixed(digit) + '';  
	var re = /^(-?\d+)(\d{3})(\.?\d*)/;  
	while(re.test(tpMoney)){  
	     tpMoney = tpMoney.replace(re, "$1,$2$3");  
	 }  
	          
	return tpMoney;    
}
/**
 * 将12,345.67 等字符转换为数字，其本质就是将字段串里的非数字字符替换
 */
String.prototype.removeDotToNumber = function(){
	return parseFloat(this.replace(/[^\d\.-]/g, ""));   
}

define(function(require, exports, module) {	
	
});
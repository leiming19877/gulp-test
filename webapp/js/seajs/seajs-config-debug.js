 (function(global, undefined) {
	 //如果seajs 没有加载
	 if (!global.seajs && !global.config) {
		  return
		}
	 var seajs  = global.seajs;
	 seajs.config({
	        base: '/js/', //基础路径
	        alias: { 
	        	'jquery':'jquery/2.1.1/jquery-2.1.1.min.js',
	        	'jquery-mobile':'jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js',
	            'zepto': 'zepto/zepto.min.js',
	            'dot':'doT/doT.min.js',
	            'iscroll':'iscroll/iscroll-4.2.js',
	            'jweixin':'weixin/jweixin-1.1.0.js'
	            },
	        preload: [
	                 ],//预先加载
	        //map,批量更新时间戳，用于更新缓存
	        map: [[/^(.*\.(?:css|js|tpl|html))(.*)$/i, '$1?v=1.2.3']], 
	        //map: [[/^(.*\.(?:css|js|tpl|html))(.*)$/i, '$1?v='+Math.random()]],  
	        charset: 'utf-8', // 文件编码
	        debug:true
	    });
 })(this);

var modules =[
	{
	"main-js":"webapp/js/module/purchase/bid/bidList.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bid/bidList.jsp",
	"css":"webapp/css/module/purchase/bid/bid-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bid/bidDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bid/bidDetail.jsp",
	"css":"webapp/css/module/purchase/bid/bid-detail.css"
	}
];
//全局配置文件
module.exports = {
   /*   name : '.....',
    devPath : '.....',    //项目根路径，根路径下可以包含多个项目
    prodPath : '....', //生产路径根路径
    sassPath : '.....', //SASS包含文件路径
    rmHtmlWhitespace : false,//html中是否去除空格
    server : {
        port : 8088
    }*/
    "modules":modules
};

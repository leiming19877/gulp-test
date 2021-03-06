var modules =[
	/*{
	"main-js":"webapp/js/module/account/bind-success-tip/bind-success-tip.js",
	"jsp":"webapp/WEB-INF/jsp/account/bind-success-tip/bind-success-tip.jsp",
	"css":"webapp/css/module/account/bind-success-tip/bind-success-tip.css"
	},{
		"main-js":"webapp/js/module/account/check-error/check-error.js",
		"jsp":"webapp/WEB-INF/jsp/account/check-error/check-error.jsp",
		"css":"webapp/css/module/account/check-error/check-error.css"
	 },
	{
	"main-js":"webapp/js/module/account/driver-phone-bind/driver-phone-bind.js",
	"jsp":"webapp/WEB-INF/jsp/account/driver-phone-bind/driver-phone-bind.jsp",
	"css":"webapp/css/module/account/driver-phone-bind/driver-phone-bind.css"
	},
	{
	 "main-js":"webapp/js/module/account/no-bind-tip/no-bind-tip.js",
	 "jsp":"webapp/WEB-INF/jsp/account/no-bind-tip/no-bind-tip.jsp",
	 "css":"webapp/css/module/account/no-bind-tip/no-bind-tip.css"
	},
	{
	 "main-js":"webapp/js/module/account/unbind-account/unbind-account.js",
	 "jsp":"webapp/WEB-INF/jsp/account/unbind-account/unbind-account.jsp",
	 "css":"webapp/css/module/account/unbind-account/unbind-account.css"
	},
	{
	   "main-js":"webapp/js/module/account/unbind-success-tip/unbind-success-tip.js",
	   "jsp":"webapp/WEB-INF/jsp/account/unbind-success-tip/unbind-success-tip.jsp",
	   "css":"webapp/css/module/account/unbind-success-tip/unbind-success-tip.css"
	},
	{
	"main-js":"webapp/js/module/ec/terminalBuy/terminalBuy.js",
	"jsp":"webapp/WEB-INF/jsp/ec/terminalBuy/terminalBuy.jsp",
	"css":"webapp/css/module/ec/terminalBuy/terminal-buy.css"
	},
	{
	"main-js":"webapp/js/module/ec/preorder/wantBuy.js",
	"jsp":"webapp/WEB-INF/jsp/ec/buy/wantBuy.jsp",
	"css":"webapp/css/module/ec/preorder/want-buy.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bid/bidList.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bid/bidList.jsp",
	"css":"webapp/css/module/purchase/bid/bid-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bid/bidDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bid/bidDetail.jsp",
	"css":"webapp/css/module/purchase/bid/bid-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bid/bidDetailExtra.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bid/bidDetailExtra.jsp",
	"css":"webapp/css/module/purchase/bid/bid-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bidFoWuHan/bidList.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bidFoWuHan/bidList.jsp",
	"css":"webapp/css/module/purchase/bid/bid-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bidFoWuHan/bidDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bidFoWuHan/bidDetail.jsp",
	"css":"webapp/css/module/purchase/bid/bid-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bidFoWuHan/bidDetailExtra.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bidFoWuHan/bidDetailExtra.jsp",
	"css":"webapp/css/module/purchase/bid/bid-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/quote/quote.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/quote/quote.jsp",
	"css":"webapp/css/module/purchase/quote/quote.css"
	},
	{
	"main-js":"webapp/js/module/purchase/quote/quoteDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/quote/quoteDetail.jsp",
	"css":"webapp/css/module/purchase/quote/quote.css"
	},
	{
	"main-js":"webapp/js/module/purchase/quoteForWuHan/quote.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/quoteForWuHan/quote.jsp",
	"css":"webapp/css/module/purchase/quote/quote.css"
	},
	{
	"main-js":"webapp/js/module/purchase/quoteForWuHan/quoteDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/quoteForWuHan/quoteDetail.jsp",
	"css":"webapp/css/module/purchase/quote/quote.css"
	},
	{
	"main-js":"webapp/js/module/purchase/order/orderListPage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/order/orderList.jsp",
	"css":"webapp/css/module/purchase/order/order-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/order/orderDetailPage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/order/orderDetail.jsp",
	"css":"webapp/css/module/purchase/order/order-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/order/orderDetailExtraPage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/order/orderDetailExtraPage.jsp",
	"css":"webapp/css/module/purchase/order/order-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/shipping/shippingPage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/shipping/shipping.jsp",
	"css":"webapp/css/module/purchase/shipping/shipping-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/shipping/shippingDetailPage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/shipping/shippingDetail.jsp",
	"css":"webapp/css/module/purchase/shipping/shipping-detail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/shipping/shippingListPage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/shipping/shippingList.jsp",
	"css":"webapp/css/module/purchase/shipping/shipping-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/receipt/receiptList.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/receipt/receiptList.jsp",
	"css":"webapp/css/module/purchase/receipt/receipt-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/receipt/receiptDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/receipt/receiptDetail.jsp",
	"css":"webapp/css/module/purchase/receipt/receipt.css"
	},
	{
	"main-js":"webapp/js/module/purchase/receipt/receipt.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/receipt/receipt.jsp",
	"css":"webapp/css/module/purchase/receipt/receipt.css"
	},
	{
	"main-js":"webapp/js/module/purchase/receipt/orderList.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/receipt/orderReceiptPage.jsp",
	"css":"webapp/css/module/purchase/receipt/order-list.css"
	},
	{
	"main-js":"webapp/js/module/purchase/information/informationDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/information/informationDetail.jsp",
	"css":"webapp/css/module/purchase/information/informationDetail.css"
	},
	{
	"main-js":"webapp/js/module/purchase/information/informationList.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/information/informationListPage.jsp",
	"css":"webapp/css/module/purchase/information/informationList.css"
	},
	{
	"main-js":"webapp/js/module/purchase/favorite/favoritePage.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/favorite/favorite.jsp",
	"css":"webapp/css/module/purchase/favorite/favorite.css"
	},
	{
	"main-js":"webapp/js/module/navigation/buyNavigation.js",
	"jsp":"webapp/WEB-INF/jsp/navigation/buyNavigation.jsp",
	"css":"webapp/css/module/navigation/navigation.css"
	},
	{
	"main-js":"webapp/js/module/navigation/sellNavigation.js",
	"jsp":"webapp/WEB-INF/jsp/navigation/sellNavigation.jsp",
	"css":"webapp/css/module/navigation/navigation.css"
	},
	{
	"main-js":"webapp/js/module/navigation/myServiceNavigation.js",
	"jsp":"webapp/WEB-INF/jsp/navigation/myServiceNavigation.jsp",
	"css":"webapp/css/module/navigation/navigation.css"
	},
	{
	"main-js":"webapp/js/module/navigation/phoneServiceNavigation.js",
	"jsp":"webapp/WEB-INF/jsp/navigation/phoneServiceNavigation.jsp",
	"css":"webapp/css/module/navigation/navigation.css"
	},
	{
	"main-js":"webapp/js/module/account/user-info/user-info.js",
	"jsp":"webapp/WEB-INF/jsp/account/user-info/user-info.jsp",
	"css":"webapp/css/module/account/user-info/user-info.css"
	},
	{
	"main-js":"webapp/js/module/account/forget-password/forget-password.js",
	"jsp":"webapp/WEB-INF/jsp/account/forget-password/forget-password.jsp",
	"css":"webapp/css/module/account/forget-password/forget-password.css"
	},
	{
	"main-js":"webapp/js/module/account/modify-password/modify-password.js",
	"jsp":"webapp/WEB-INF/jsp/account/modify-password/modify-password.jsp",
	"css":"webapp/css/module/account/modify-password/modify-password.css"
	},
	{
	"main-js":"webapp/js/module/purchase/bidFoWuHan/wonBidDetail.js",
	"jsp":"webapp/WEB-INF/jsp/purchase/bidFoWuHan/wonBidDetail.jsp",
	"css":"webapp/css/module/purchase/bid/bid-detail.css"
	} 
	 ,
	{
		"main-js":"webapp/js/module/ec/lading/transCompanyLogin.js",
		"jsp":"webapp/WEB-INF/jsp/ec/lading/transCompanyLogin.jsp",
		"css":"webapp/css/module/ec/lading/weixin1.css"
		} ,
	{
		"main-js":"webapp/js/module/ec/lading/myZtInfo.js",
		"jsp":"webapp/WEB-INF/jsp/ec/lading/myZtInfo.jsp",
		"css":"webapp/css/module/ec/lading/weixin1.css"
		}  ,
	{
		"main-js":"webapp/js/module/ec/lading/ladingWeixin.js",
		"jsp":"webapp/WEB-INF/jsp/ec/lading/ladingWeixin.jsp",
		"css":"webapp/css/module/ec/lading/weixin1.css"
		},
	   //调拔单的
		{
			"main-js":"webapp/js/module/purchase/allocation/allocation-picture-upload.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/allocation/allocationPictureUpload.jsp",
			"css":"webapp/css/module/purchase/allocation/allocation-detail.css"
			},
		{
			"main-js":"webapp/js/module/purchase/allocation/allocationDetail.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/allocation/allocationDetail.jsp",
			"css":"webapp/css/module/purchase/allocation/allocation-detail.css"
			},
		{
			"main-js":"webapp/js/module/purchase/allocation/allocationList.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/allocation/allocationList.jsp",
			"css":"webapp/css/module/purchase/allocation/allocation-list.css"
			},
		{
			"main-js":"webapp/js/module/purchase/allocation/editAllocation.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/allocation/editAllocation.jsp",
			"css":"webapp/css/module/purchase/allocation/allocation-detail.css"
			},
		{
			"main-js":"webapp/js/module/purchase/allocation/examinationAllocation.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/allocation/examinationAllocation.jsp",
			"css":"webapp/css/module/purchase/allocation/allocation-detail.css"
			},
		{
			"main-js":"webapp/js/module/purchase/order/allocationOrderDetailPage.js",
			"jsp":"WEB-INF/jsp/purchase/order/allocationOrderDetail.jsp",
			"css":"webapp/css/module/purchase/order/order-detail.css"
			},
		{
			"main-js":"webapp/js/module/purchase/order/allocationOrderDetailExtraPage.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/order/allocationOrderDetailExtraPage.jsp",
			"css":"webapp/css/module/purchase/order/order-detail.css"
			},
		{
			"main-js":"webapp/js/module/purchase/order/allocationOrderListPage.js",
			"jsp":"webapp/WEB-INF/jsp/purchase/order/allocationOrderList.jsp",
			"css":"webapp/css/module/purchase/order/order-list.css"
		},*/{
			"main-js":"webapp/js/module/ec/futures/publishDemand.js",
			"jsp":"webapp/WEB-INF/jsp/ec/futures/publishDemand.jsp",
			"css":"webapp/css/module/ec/futures/publishDemand.css"
		},{
			"main-js":"webapp/js/module/ec/contract/buy-contract-list.js",
			"jsp":"webapp/WEB-INF/jsp/ec/contract/buyContractList4Buyer.jsp",
			"css":"webapp/css/module/ec/contract/contractList.css"
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

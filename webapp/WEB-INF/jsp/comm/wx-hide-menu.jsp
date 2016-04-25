<%
    String url = (String)request.getAttribute("_request_url");
    SignPackage sign = SignUtil.sign(Constants.JS_API_TICKET.getTicket(), url);
%>
<script type="text/javascript" src="${ctx}/js/weixin/jweixin-1.1.0.js"></script>
<script type="text/javascript">
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '<%=Constants.APPID %>', // 必填，公众号的唯一标识
    timestamp:<%=sign.getTimestamp() %> , // 必填，生成签名的时间戳
    nonceStr: '<%=sign.getNonceStr() %>', // 必填，生成签名的随机串
    signature: '<%=sign.getSignature() %>',// 必填，签名
    jsApiList: ['scanQRCode','chooseImage','uploadImage','hideOptionMenu','hideAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
});
wx.ready(function(){
    wx.hideOptionMenu();
});
</script>
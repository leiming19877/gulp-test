<%@page import="org.springframework.security.web.PortResolverImpl"%>
<%@page import="org.springframework.security.web.savedrequest.DefaultSavedRequest"%>
<%@page import="com.ztds.weixin.util.SignUtil"%>
<%@page import="com.ztds.weixin.model.SignPackage"%>
<%@page import="com.ztds.weixin.util.Constants"%>
<%@page import="java.util.Enumeration"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">

<title>test</title>
<%
    //String url = request.getRequestURI();
    //String url = "http://35754test.zt906.net/test1";
    String url = (String)request.getAttribute("url");
    SignPackage sign = SignUtil.sign(Constants.JS_API_TICKET.getTicket(), url);
%>
<script type="text/javascript" src="${ctx}/js/weixin/jweixin-1.1.0.js"></script>
<script type="text/javascript">
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '<%=Constants.APPID %>', // 必填，公众号的唯一标识
    timestamp:<%=sign.getTimestamp() %> , // 必填，生成签名的时间戳
    nonceStr: '<%=sign.getNonceStr() %>', // 必填，生成签名的随机串
    signature: '<%=sign.getSignature() %>',// 必填，签名，见附录1
    jsApiList: ['startRecord','onVoiceRecordEnd','stopRecord','playVoice','uploadVoice','downloadVoice','chooseImage','uploadImage','hideAllNonBaseMenuItem','getNetworkType','openLocation','scanQRCode','hideOptionMenu','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
wx.ready(function(){
    //wx.hideOptionMenu();
    wx.hideAllNonBaseMenuItem();
});
wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    alert("error");
});
function getLocation(){
	wx.getLocation({
	    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	    success: function (res) {
	    	
	        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	        var speed = res.speed; // 速度，以米/每秒计
	        var accuracy = res.accuracy; // 位置精度
	        alert(latitude);
	    }
	});
}

function scanQRCode(){
	wx.scanQRCode({
	    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
	    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
	    success: function (res) {
	    	   var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
	    	   alert(result);
	    }
	});
}

function getNetworkType(){
	wx.getNetworkType({
	    success: function (res) {
	        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
	        alert(networkType);
	    }
	});
}

function openLocation(){
	wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            wx.openLocation({
                //latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                //longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                name: '北京', // 位置名
                address: '', // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: 'http://www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        }
    });
}

function chooseImage(){
	wx.chooseImage({
	    count: 9, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	        for(var i=0;i<localIds.length;i++){
	        	wx.uploadImage({
	        	    localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
	        	    isShowProgressTips: 1, // 默认为1，显示进度提示
	        	    success: function (res) {
	        	        var serverId = res.serverId; // 返回图片的服务器端ID
	        	        alert(JSON.stringify(res));
	        	    }
	        	});
	        }
	        
	    }
	});
}

function startRecord(){
	wx.startRecord();
	wx.onVoiceRecordEnd({
	    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
	    complete: function (res) {
	        var localId = res.localId;
	        wx.uploadVoice({
	            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
	            isShowProgressTips: 1, // 默认为1，显示进度提示
	                success: function (res) {
	                var serverId = res.serverId; // 返回音频的服务器端ID
	                document.getElementById("result").value = serverId;
	                alert(serverId);
	            }
	        });
	        wx.playVoice({
	            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
	        });
	    }
	});
}

function stopRecord(){
	wx.stopRecord({
	    success: function (res) {
	        var localId = res.localId;
	        alert(localId);
	        wx.uploadVoice({
	            localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
	            isShowProgressTips: 1, // 默认为1，显示进度提示
	                success: function (res) {
	                var serverId = res.serverId; // 返回音频的服务器端ID
	                document.getElementById("result").value = serverId;
	                alert(serverId);
	            }
	        });
	        wx.playVoice({
	            localId: localId // 需要播放的音频的本地ID，由stopRecord接口获得
	        });
	    }
	});
}
function  playRecord(){
	
		 wx.playVoice({
	            localId: 'testsetseatesa', // 需要播放的音频的本地ID，由stopRecord接口获得
	            success:function(){
	            	debugger;
	            	alert("succes");
	            },
	            fail:function(){
	            	debugger;
	            	alert("fail");
	            }
		 });

}
function downRecord(){
	wx.downloadVoice({
	    serverId: 'ULtKFs29SwSXgo3KupqwrM7Se3o-nhOl3KFsSE5p6WEQZZnW_4yxuoC0LnU4RhVY', // 需要下载的音频的服务器端ID，由uploadVoice接口获得
	    isShowProgressTips: 1, // 默认为1，显示进度提示
	    success: function (res) {
	        var localId = res.localId; // 返回音频的本地ID
	        alert("下载成功。");
	    },
	    fail:function(){
        	debugger;
        	alert("fail");
        }
	});
}
</script>

</head>
<body >
     <input type="button"  value="获取位置" onclick="getLocation();" />
     <br/>
     <br/>
     <input type="button"  value="扫描二维码" onclick="scanQRCode();" />
     <br/>
     <br/>
     <input type="button"  value="获取网络类型" onclick="getNetworkType();" />
      <br/>
     <br/>
     <input type="button"  value="打开地图" onclick="openLocation();" />
     <br/>
     <br/>
     <input type="button"  value="拍照或上传图片" onclick="chooseImage();" />
     <br/>
     <input type="button"  value="录音" onclick="startRecord();" />
     <br/>
     <input type="button"  value="停止录音" onclick="stopRecord();" />
     <br/>
     <input type="button"  value="播放录音" onclick="playRecord();" />
     <br/>
     <input type="button"  value="下载录音" onclick="downRecord();" />
     <br/>
     <textarea id="result" style="width: 100%;height:200px;"></textarea>
     <form action="" method="post" enctype="multipart/form-data">
        <input name="file" type="file" />
        <input type="submit" value="提交" />
     </form>
</body>
</html>
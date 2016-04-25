<%@page contentType="text/html; charset=utf-8"%>
<%-- <%@include file="/WEB-INF/jsp/include.jsp"%>  --%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<!doctype html>
<html>
<head>

<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=yes" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>资讯详情</title>
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<script type="text/javascript">
	var flag = false;
	function more() {
		var detailMore = document.getElementById("detailMore");
		var imgMore = document.getElementById("imgMore");
		if (detailMore.style.display == "none") {
			detailMore.style.display = "block";
		} else {
			detailMore.style.display = "none";
		}
		if (flag) {
			imgMore.src = "${ctx}/images/info/information_up.png";
			flag = false;
		} else {
			imgMore.src = "${ctx}/images/info/information_down.png";
			flag = true;
		}

	}
</script>
<style>
body {
	background: none repeat scroll 0 0 #FFFFFF;
	color: #333333;
	font: 15px/150% "宋体", Arial;
	overflow-x: hidden;
}

#infoTitle {
	text-align: center;
	font-weight: bold;
	font-size: 17px;
}

#infoDel {
	color: #AAAAAA;
	float: right;
	padding-right:15px;
}

#infoAbstract {
	clear: both;
	padding-left:8px;
}

#detailMore {
	clear: both;
	padding-left:8px;
}

#more {
	float: right;
	color: #7A7A7A;
	background-color: #DFDFDF;
	padding: 5px;
	align: "center";
}

#imgMore {
	width: 15px;
}

.top .imageWrap {
	float: left;
	width: 20px;
	height: 20px;
	margin-top: 10px;
	margin-left: 6px;
}

.top .ui-title {
	font-size: 15px;
	margin: 0 10px;
}

.top .image_left {
	width: 20px;
	height: 20px;
}
</style>

</head>
<body>
	<!-- 后退箭头 -->
	<div class="top">
		<div data-role="header">
			<div class="imageWrap" id="infoTitle">
				<img src="${ctx}/images/icons/icon_left.png" class="image_left">
			</div>
			<h1>${informationDetail.title}</h1>
		</div>
	</div>
	<div>
		<%-- <div  id="infoTitle" >${informationDetail.title} </div> --%>
		<br />
		<div id="infoDel">
			<span id="infoResource">${informationDetail.source}</span> 
			<span id="infoDate">				    
				<fmt:formatDate value="${informationDetail.createTime}" pattern="yyyy-MM-dd HH:mm" />
			</span>
		</div>
		<div id="infoAbstract">${informationDetail.summary}</div>
		   <div id="more" href="javascript:void(0)" onclick="more()">
			    查看原文 <span> <img id=imgMore
				src="${ctx}/images/info/information_up.png" />
			   </span>
		   </div>
		    <br /> <br />
		<div id="detailMore" style="" id="infoText">
			${informationDetail.content}</div>
	</div>
</body>
<script type="text/javascript">
	//后退事件
	$(".image_left").on("click", function(){
		/* window.location.href="${ctx}/central/information/informList?"; */
		window.history.back();
	});
</script>
</html>
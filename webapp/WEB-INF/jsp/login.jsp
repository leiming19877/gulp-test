<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>集中采购销售平台-销售系统</title>

<%-- <script src="<%=request.getContextPath()%>/js/jquery-1.7.1.min.js" language="javascript"></script>
 --%>
<!--[if IE 6]>
<script type="text/javascript" src="js/DD_belatedPNG.js" ></script>
<script type="text/javascript">DD_belatedPNG.fix('*');</script>
<![endif]--> 
</head>
<style>
      *{ padding:0px; border:0px; margin:0px;}
	  body{font-size:13px; font-family:"微软雅黑";}
	  a{ color:#09F; list-style:none; text-decoration:none;}
	  a:hover{ color:#369;}
	  ul li{ list-style:none;}
	  .header{ height:98px;}
	  .con{ width:1024px; margin:0px auto;}
	  .logo{ background:url(images/login/neo/logo.jpg) no-repeat; margin-top:25px; float:left;}
	  .headerLeft{ float:right; line-height:35px; margin-top:25px;}
      .container{ background:url(images/login/neo/bg_d.jpg) repeat-x; position:relative; height:485px;}
	  .bg_b{ background:url(images/login/neo/bg_lou.png) no-repeat center; width:100%; height:131px; position: absolute; bottom:0px;left:0px; z-index:1;}
	  .con_m{ background:url(images/login/neo/bg_t.png) no-repeat center bottom; height:408px; z-index:3; position:relative;}
	  
	  /*
for footer---------------------------版权*/
.footer{clear:both; height:60px; padding:10px; color:#666; text-align:center; text-shadow: 1px 1px 0 #FFFFFF;}
.footer a{color:#666;}
.footerCon{width:1000px; margin:0 auto;}
.footerTel{width:210px; height:25px; text-indent:-100000px; overflow:hidden; margin:0 auto 5px;}
.footerNav{margin-bottom:5px;}
.footerNav a{margin:0 5px;}
.copyright{color:#999; padding-bottom:5px;}
	  
</style>
<body>
<div id="top">
	<div class="header">
        <div class="con">
		   <div class="logo"><a href="#"><img src="images/login/neo/logo.jpg"/></a></div>
        </div>
	</div>
</div>

<div class="container">
    
	<div class="con">
    <div class="con_m">
			<div class="loginArea" style=" background:#ffff; width:249px; height:308px; position:absolute; top:120px; right:120px;">
				<iframe src="${loginUrl}"
					style="height: 308px; width: 300px; border: none;"></iframe>
			</div>
    </div>
    <div class="bg_b"></div>
    
    </div>
</div>

<div class="footer">
	<div class="footerCon">
		<div class="footerTel">服务热线：4000-609-906</div>
		<div class="footerNav">
		<a href="##">关于中拓</a>|<a href="#">合作伙伴</a>|<a href="##">法律声明</a>|<a href="##">联系我们</a>|<a href="##">下载中心</a>
		</div> 
		<div class="copyright">Copyright ©2012 zt906.com All Rights Reserved. 湘ICP证11017218号 中拓钢铁网 版权所有所有</div>
	</div>
</div>

	<script type="text/javascript">
		function AddFavorite(sURL, sTitle) {
			try {
				window.external.addFavorite(sURL, sTitle);
			} catch (e) {
				try {
					window.sidebar.addPanel(sTitle, sURL, "");
				} catch (e) {
					window.alert("您的浏览器不支持加入收藏，请使用“Ctrl+D”添加！");
				}
			}
		}
	</script>

</body>
</html>

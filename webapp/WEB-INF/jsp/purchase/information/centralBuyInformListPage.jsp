<%@page contentType="text/html; charset=utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>
<!DOCTYPE HTML>
<html>
<head>
<title>集采资讯列表</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                
        <%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
        <script type="text/javascript" src="${ctx}/js/iscroll/iscroll-4.2.js"></script>
        <script src="${ctx}/js/doT/doT.min.js" type="text/javascript"></script>
        <script src="${ctx}/js/Date.js" type="text/javascript"></script>
</head>

<style type="text/css" media="all">
body {
    background: #F2F2F2;
    padding: 3px 0;
}

.active {
    background: #ebebeb;
}

.unit {
    position: relative; 
    margin-bottom: 1px;
    background: #FFF;
}

.unit:active {
    background: #F7F7F7;
}

.gray {
    background: #EFEFF1;
}

.white {
    background: #FFF;
}

.orange {
    /* background: #FFFFCD; */
    color: orange;
}

.header {
    position:relative;
    padding: 5px 5px;
    border-bottom: 1px solid #ebebeb;
    height:auto;    
}

.content {
    padding: 0 5px 0 10px;
}

.listviewLine{
    position:relative;
    padding: 15px 5px 5px 15px;
    border-bottom: 1px solid #ebebeb;
    height:auto;  
}

.line {
    /* height: 20px; */
    height:auto; min-height:30px; _height:30px;  
    width: 100%;
    word-wrap: break-word; 
    overflow:hidden;
}

.line_l {
    float: left;
    color: #606060;
    font-size: 14px;
    width: 70%;
    height: 100%;
    line-height: 20px;
    left:5px
}

.line_r {
    float: right;
    color: #999999;
    font-size: 14px;
    padding-left: 5px;
    height: 100%;
    line-height: 20px;
}

.Nar{
    font-size: 16px;
    height: 30px; 
    line-height: 35px;
}

span {
    /* color: #FE6500; */
    color: #999999;
    padding-right: 5px;
}

.tags_f {
    font-size: 14px;  
    border-radius: 3px;
    width: 70px;
    height: 15px;
    text-align: center;
    padding: 8px 1px 10px;
    position: absolute;top:10px;right:10px;
    float: right;
    border: 1px #ebebeb solid;
    /* color: #6c6c6c; */
    color: #FFFFFF;
    background:#436CB4;
    text-shadow:none;
}

.tags_c {
    font-size: 12px;
    border-radius: 3px;
    width: 60px;
    text-align: center;
    padding: 4px 2px;
    position: absolute;
    right: 16px;
    top: 8px;
    border: 1px #3366cc solid;
    color: #3366cc;
}

#header {
    position:absolute; z-index:2;
    top:0; left:0;
    width:100%;
    height:20px;
    line-height:20px;
    text-align:center;
}

#footer {
    position:absolute; z-index:2;
    bottom:0; left:0;
    width:100%;
    height:48px;
    background-color:#222;
    background-image:-webkit-gradient(linear, 0 0, 0 100%, color-stop(0, #999), color-stop(0.02, #666), color-stop(1, #222));
    background-image:-moz-linear-gradient(top, #999, #666 2%, #222);
    background-image:-o-linear-gradient(top, #999, #666 2%, #222);
    padding:0;
    border-top:1px solid #444;
}

#wrapper {
    position:absolute; z-index:1;
    top:55px; bottom:30px; left:-9999px;
    width:100%;
    background:#aaa;
    overflow:auto;
}

#scroller {
    position:absolute; z-index:1;
/*  -webkit-touch-callout:none;*/
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    width:100%;
    padding:0;
}

#scroller ul {
    list-style:none;
    padding:0;
    margin:0;
    width:100%;
    text-align:left;
}

#scroller li {
    padding:0 10px;
    height:40px;
    line-height:40px;
    border-bottom:1px solid #ccc;
    border-top:1px solid #fff;
    background-color:#fafafa;
    font-size:14px;
}

#myFrame {
    position:absolute;
    top:0; left:0;
}

/**
 *
 * Pull up or down styles
 *
 */
#pullDown, #pullUp {
    background:#fff;
    height:40px;
    line-height:40px;
    padding:5px 10px;
    border-bottom:1px solid #ccc;
    font-weight:bold;
    font-size:14px;
    color:#888;
}
#pullDown .pullDownIcon, #pullUp .pullUpIcon  {
    display:block; float:left;
    width:40px; height:40px;
    background:url(/images/icons/pull-icon@2x.png) 0 0 no-repeat;
    -webkit-background-size:40px 80px; background-size:40px 80px;
    -webkit-transition-property:-webkit-transform;
    -webkit-transition-duration:250ms;  
}
#pullDown .pullDownIcon {
    -webkit-transform:rotate(0deg) translateZ(0);
}
#pullUp .pullUpIcon  {
    -webkit-transform:rotate(-180deg) translateZ(0);
}

#pullDown.flip .pullDownIcon {
    -webkit-transform:rotate(-180deg) translateZ(0);
}

#pullUp.flip .pullUpIcon {
    -webkit-transform:rotate(0deg) translateZ(0);
}

#pullDown.loading .pullDownIcon, #pullUp.loading .pullUpIcon {
    background-position:0 100%;
    -webkit-transform:rotate(0deg) translateZ(0);
    -webkit-transition-duration:0ms;

    -webkit-animation-name:loading;
    -webkit-animation-duration:2s;
    -webkit-animation-iteration-count:infinite;
    -webkit-animation-timing-function:linear;
}

@-webkit-keyframes loading {
    from { -webkit-transform:rotate(0deg) translateZ(0); }
    to { -webkit-transform:rotate(360deg) translateZ(0); }
}

</style>
<%@include file="centralBuyInformList.jsp"%>

<body>

	<div data-role="page" class="unit" id="informListPage">
       <div data-role="header">
	   <h1>最新资讯</h1>
    </div>    

		<div data-role="content">
			<div id="wrapper" class="unit">
				<div id="scroller">
					<div id="pullDown">
						<span class="pullDownIcon"></span>
						<span class="pullDownLabel show-page-loading-msg">下拉更新...</span>
					</div>

					<div id="listpage" class="unit">
						<!-- 动态插入dot模板代码 -->
					</div>

					<div id="pullUp">
						<span class="pullUpIcon"></span>
						<span class="pullUpLabel show-page-loading-msg">上拉加载...</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 动态模板代码 -->
    <script id="listPageTpl" type="text/x-dot-template">
	       {{~it :inform:index}}

				<div class="listviewLine white" data-role="listview" >
					
                   <a href="${ctx}/central/information/informDetail?informId={{=inform.infoId}}&_t={{=new Date().getTime()}}" data-ajax="false" >
                      <section class="line clearfix" >
						  <div class='line_l'>{{=inform.title}}</div>
						  <div class='line_r'>
                             {{=new Date(inform.createTime).formatDate("yyyy-MM-dd") }} 
                          </div>
					  </section>
                  </a>						

				</div>
		{{~}}
    </script>
      
   <script id="empty" type="text/x-dot-template">
				<div class="emptyContent" data-role="content">
                       <div class ="emptyText">
                                                                  没有相关信息 
			           </div>
				</div>
    </script> 
</body>


</html>

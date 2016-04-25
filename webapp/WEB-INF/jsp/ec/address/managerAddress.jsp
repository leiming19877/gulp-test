<%@include file="/WEB-INF/jsp/comm/wx-head.jsp"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/jsp/comm/taglib.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />

<title>收货地址信息</title>
<link type="text/css" rel="stylesheet" href="${ctx}/css/global/global-1.0.1.min.css">
<%@include file="/WEB-INF/jsp/comm/jquery-mobile-javascript.jsp"%>
<%@include file="/WEB-INF/jsp/comm/wx-hide-menu.jsp"%>
<style type="text/css">
body {
	background: #F2F2F2;
	padding: 3px 0;
	overflow: hidden;
}

.top {
    width: 100%;
	position: fixed;
    background-color: #fff;
    z-index: 8;
}

.top .imageWrap{
    float:left;
    width:20px;
    height:20px;
    margin-top: 10px;
    margin-left: 6px;
}

.top .ui-title{
    font-size: 15px;
	margin: 0 10px;
}

.top .image_left{
	width: 20px;
	height: 20px;
}


.top .manage {
	float: right;
    font-weight: normal;
    font-size: 13px;
    margin-top: -27px;
    margin-right: 7px;
    color: #298fbe;
    text-decoration: underline;
}

.head{
	position:relative;
    background-color: #fff;
	padding: 5px 8px 0px 8px;
    border-bottom: 8px solid #ddd;
}

.unit {
	position: relative;
	margin-bottom: 5px;
	background: #FFF;
}

.unit .ui-content {
	padding: 0;
	position: absolute;
    margin-top: 40px;
    width: 100%;
    height: -webkit-calc(100% - 45px * 2);
}

.buttonNav{
	z-index:8;
	display: none;
	position:fixed;
	background:#eee;
	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	bottom:0;
	left:0;
	width:100%;
	height:43px;
	padding:8px 0;
	text-shadow: none;
}

.to-delete{
	float: left;
	border-radius:4px;
	background:red;
	color:#FFF;
	text-align:center;
	font-size:15px;
	margin-left:10px;
	width:20%;
	height:43px;
	line-height:43px;
}

.all-check{
	float: right;
	border-radius:4px;
	background:#436CB4;
	color:#FFF;
	text-align:center;
	font-size:15px;
	margin-right:10px;
	width:20%;
	height:43px;
	line-height:43px;
}

.line {
	height: 25px;
    line-height: 25px;
    width: 100%;
    padding: 0px 8px;
}

.line-bottom {
	height: 25px;
    line-height: 25px;
    width: 100%;
    padding: 0px 8px;
    border-bottom: 1px solid #ccc;
}

.line_l {
	float: left;
    font-size: 13px;
    width: 75px;
    text-align: right;
    font-weight: bold;
}

.line_r {
	float: left;
	width: 60%;
	font-size: 13px;
	font-weight: normal;
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.checkWrap {
	width: 20px;
    height: 20px;
    background-color: #fff;
    float: right;
    display: none;
    position: relative;
    margin-top: 27px;
    margin-right: 15px;
    border-radius: 50%;
    border: 1px solid #888;
}

.checked {
	width: 16px;
    height: 16px;
    background-color: red;
    float: right;
    display: none;
    position: relative;
    margin-top: 1px;
    margin-right: 1px;
    border-radius: 50%;
    border: 1px solid #fff;
}

.ui-content .ui-listview {
	margin: 0;
}

.ui-btn-icon-right:after{
	display: none;
}

.content {
	padding: 0;
}

.behind {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
}
.behind a.ui-btn {
	width: 68px;
	height: 54px;
	margin: 0;
	float: right;
	border: none;
	line-height: 54px;
}
.behind a.delete-btn, .behind a.delete-btn:active, .behind a.delete-btn:visited, .behind a.delete-btn:focus, .behind a.delete-btn:hover {
	color: white;
	background-color: red;
	text-shadow: none;
}
.behind a.ui-btn.pull-left {
	float: left;
}
.behind a.edit-btn, .behind a.edit-btn:active, .behind a.edit-btn:visited, .behind a.edit-btn:focus, .behind a.edit-btn:hover {
	color: white;
	background-color: orange;
	text-shadow: none;
}
</style>
</head>
<body ontouchstart="">
<form name="form1" method="POST">
	<div data-role="page" class="unit">
		<!-- 后退箭头 -->
		<div class="top">
  			<div data-role="header">
				<div class="imageWrap"><img src="${ctx}/images/icons/icon_left.png" class="image_left"></div>
				<h1>地址管理</h1>
				<div class="manage">编辑</div>
				<div style="clear: both;"></div>
			</div> 
		</div>
		<div data-role="content">
			<ul data-role="listview" class="swipe-delete">
				<c:forEach items="${consigneeListAll }" var="consignee" varStatus="status">
					<li class="li-address" conid="${consignee.con_id }">
						<div class="behind">
							<a href="#" class="ui-btn delete-btn">删除</a>
						</div>
						<a class="content" href="#">
							<div class="line">
								<div class="line_l">提/收货人：</div>
								<div class="line_r">${consignee.name1 }&nbsp;&nbsp;${consignee.phone1 }</div>
								<div class="checkWrap">
									<div class="checked"></div>
								</div>
							</div>
							<div class="line">
								<div class="line_l">所在地区：</div>
								<div class="line_r">${consignee.province_name}${consignee.area_name}${consignee.districtName}</div>
							</div>
							<div class="line">
								<div class="line_l">详细地址：</div>
								<div class="line_r">${consignee.address}</div>
							</div>
						</a>
					</li>
				</c:forEach>	
			</ul>
			<div style="clear:both;"></div>
		</div>
		<!--按钮-->
		<div class="buttonNav">
			<div class="to-delete">删除</div>
			<div class="all-check">全选</div>
			<div style="clear: both;"></div>
		</div>
	</div>
	</form>
</body>
<script type="text/javascript">
$(document).ready(function(){
	function prevent_default(e) {
        e.preventDefault();
    }

    function disable_scroll() {
        $(document).on('touchmove', prevent_default);
    }

    function enable_scroll() {
        $(document).unbind('touchmove', prevent_default);
    }

    var x;
    $('.swipe-delete li > a')
        .on('touchstart', function(e) {
            console.log(e.originalEvent.pageX);
            $('.swipe-delete li > a').css('left', '0px'); // close em all
            $(e.currentTarget).addClass('open');
            x = e.originalEvent.targetTouches[0].pageX; // anchor point
        })
        .on('touchmove', function(e) {
            var change = e.originalEvent.targetTouches[0].pageX - x;
            change = Math.min(Math.max(-100, change), 0); // restrict to -100px left, 0px right
            e.currentTarget.style.left = change + 'px';
            if (change < -10) disable_scroll(); // disable scroll once we hit 10px horizontal slide
        })
        .on('touchend', function(e) {
            var left = parseInt(e.currentTarget.style.left);
            var new_left;
            if (left < -35) {
                new_left = '-100px';
            } else if (left > 35) {
                new_left = '100px';
            } else {
                new_left = '0px';
            }
            $(e.currentTarget).animate({left: new_left}, 200);
            enable_scroll();
        });

    /* $('li .delete-btn').on('click', function(e) {
    	e.preventDefault();
        $(this).parents('li').slideUp('fast', function() {
        	var $address = $(this).closest("li");
        	var conid = $address.attr("conid");
        	doDelete($this, "single", conid);
        })
    }); */
    
    function doDelete(element, type, ids){
    	if (element.hasClass("ing")) {
			alert("正在删除收货地址，请勿重复操作！");
			return false;
		}
    	//删除
    	$.ajax({
            url: '${ctx}/preorder/address/delete',
            type: "POST",
            dataType: "json",
            traditional: true,
            data: {
            	"type": type,
           	 	"ids": ids
    		},
    		beforeSend: function () {
    			//增加等待样式
    			element.addClass("ing");
    			$.mobile.loading("show");
    		},
            error: function (XMLHttpRequest, textStatus, errorThrown) 
            { 
            	alert("删除失败，请稍后再试！");
            },
            success: function (result) {
            	if (result) {
    				alert(result.msg);
    				//添加成功后跳转至管理界面
    				if (result.success == true) {
    					if (type === "single") {
    						if ($("ul>li[conid="+ids+"]").length) {
    							$("ul>li[conid="+ids+"]").remove();
    						}
    					} else {
    						var idArr = ids.split(",");
    						$.each(idArr, function(i, item) {
    							if ($("ul>li[conid="+item+"]").length){
    								$("ul>li[conid="+item+"]").remove();
    							}
    						});
    					}
    			    }
    			} else {
    				alert("删除失败，请稍后再试！");
    			}
            },
            complete: function () {
            	//去除等待样式
				element.removeClass("ing");
            	$.mobile.loading("hide"); 
            }
        });
    }
    
    //左滑删除事件
   $(".delete-btn").on("click", function(){
    	var $this = $(this);
    	var $address = $this.closest("li");
    	var conid = $address.attr("conid");
    	doDelete($this, "single", conid);
    });
    
    //编辑按钮点击事件
    $(".manage").on("click", function(){
    	var $this = $(this);
    	if ($(".checkWrap").is(":hidden")) {
    		//点击编辑，显示多选按钮和底部操作按钮
    		$this.text("取消");
    		$(".checkWrap").show();
    		$(".buttonNav").slideDown("fast");
    	} else {
    		//点击取消，隐藏多选按钮和底部操作按钮
    		$this.text("编辑");
    		$(".checkWrap").hide();
    		$(".buttonNav").slideUp("fast");
    	}
    });
    
    //多选按钮事件
    $(".checkWrap").on("click", function(event){
    	var $this = $(this);
    	var $checked = $this.find(".checked");
    	if ($checked.is(":hidden")) {
    		$this.closest("li").addClass("choosed");
    		$checked.show();
    	} else {
    		$this.closest("li").removeClass("choosed");
    		$checked.hide();
    	}
    	//判断项目是否已经全部选择
    	if (!$(".checked:hidden").length) {
    		$(".all-check").text("全不选");
    		$(".all-check").addClass("yes");
    	} else {
    		$(".all-check").text("全选");
    		$(".all-check").removeClass("yes");
    	}
    	event.stopPropagation();
    });
    
    //全选按钮事件
    $(".all-check").on("click", function(){
    	var $this = $(this);
    	if ($this.hasClass("yes")) {
    		$this.text("全选");
    		$this.removeClass("yes");
    		$(".checked").each(function(){
        		$(this).hide();
        	});
    	} else {
    		$this.text("全不选");
    		$this.addClass("yes");
    		$(".checked").each(function(){
        		$(this).show();
        	});
    	}
    });
    
    //删除按钮事件
    $(".to-delete").on("click", function(){
    	var $this = $(this);
    	var ids = new Array();
    	var checked = $("li.choosed").length;
    	if (checked == 0) {
    		alert("请选择需要删除的项！");
    		return false;
    	} else {
    		$("li.choosed").each(function(){
    			var conid = $(this).attr("conid");
    			ids.push(conid);
    		});
    		doDelete($this, "batch", ids.join(","));
    	}
    });
    
    //地址条目点击事件
    $(".li-address").on("click", function(){
    	var $this = $(this);
    	var $checkWrap = $this.find(".content>.line:first>.checkWrap");
    	if ($checkWrap.is(":visible")) {
    		$checkWrap.click();
    	}
    });
    
  	//注册返回按钮事件,后退事件
	$(".image_left").on("click", function(){
		$.mobile.loading("show");
		window.location.href="${ctx}/preorder/address/add";
	});
});
</script>
</html>
$(function(){
	var d = new Date();
	//月份
	var month = d.getMonth() + 1;
	//年份
	var year = d.getFullYear();

	var b = new Date(year, month, 0);

	//初始化数据
	init();
	//初始化
	function init() {

		var islogin = getQueryVariable("suijishu");
		if(islogin){
			if(islogin != getCookie("loginsuijishu")){				
				window.location.href = "./login.html";
			}
		}else{
			window.location.href = "./login.html";
		}

		if(getCookie("allrenwu") != ""){
			var renwuhtml = getCookie("allrenwu");
			var cishuhtml = getCookie("allcishu");
			var renwu = renwuhtml.split(",");
			var cishu = cishuhtml.split(",");
			for(var i = 0; i < renwu.length; i++){
				$("#s-about-us .addTask").before(renwu[i]);
			}
			for(var i = 0; i < cishu.length; i++){
				cishu[i] = cishu[i].replace("cishu", "");
				$("#information .cishu select").append("<option class='"+cishu[i]+"' value=''>"+cishu[i]+"："+getCookie(cishu[i]+"cishu")+"</option>");
			}
		}

		//日语
		if(getCookie("riyucishu") == ""){
			setCookie("riyucishu", 0, "d"+b.getDate());
			$("#information .cishu p .riyucisu").text(0);
		}
		//英语
		if(getCookie("yinyucishu") == ""){
			setCookie("yinyucishu", 0, "d"+b.getDate());
			$("#information .cishu p .yinyucisu").text(0);
		}
		//php
		if(getCookie("phpcishu") == ""){
			setCookie("phpcishu", 0, "d"+b.getDate());
			$("#information .cishu p .phpcisu").text(0);
		}
		//html
		if(getCookie("htmlcishu") == ""){
			setCookie("htmlcishu", 0, "d"+b.getDate());
			$("#information .cishu p .htmlcisu").text(0);
		}
		//可用金额
		if(getCookie("myPrice") == ""){
			setCookie("myPrice", 0, "d"+b.getDate());
			$("#information .myPrice p").text(0);
		}
		//剩余金额
		if(getCookie("allPrice") == ""){
			setCookie("allPrice", 0, "d"+b.getDate());
			$("#information .allPrice p").text(0);
		}
		//30分钟
		if(getCookie("time30") == ""){
			setCookie("time30", 30*60, "d"+b.getDate());
		}
		//一个小时
		if(getCookie("time60") == ""){
			setCookie("time60", 1*60*60, "d"+b.getDate());
		}
		//一个半小时
		if(getCookie("time90") == ""){
			setCookie("time90", (1*60*60 + 30*60), "d"+b.getDate());
		}
		//二个小时
		if(getCookie("time120") == ""){
			setCookie("time120", 2*60*60, "d"+b.getDate());
		}
		//test
		if(getCookie("test") == ""){
			setCookie("test", 20, "d"+b.getDate());
		}
		//5金钱
		if(getCookie("price5") == ""){
			setCookie("price5", 5, "d"+b.getDate());
		}
		//10金钱
		if(getCookie("price10") == ""){
			setCookie("price10", 10, "d"+b.getDate());			
		}
		//15金钱
		if(getCookie("price15") == ""){
			setCookie("price15", 15, "d"+b.getDate());			
		}
		//20奖励金钱
		if(getCookie("price20") == ""){
			setCookie("price20", 20, "d"+b.getDate());
		}
	}

	//添加任务
	$("#s-about-us .addTask").on("click", function(){
		$("#addRenwu").modal("show");		
	})
	
	//确认添加任务
	$("#addRenwu .btn-primary").click(function(){
		if($("#addRenwu .renwuname").val() != "" && $("#addRenwu .time").val() != "" && $("#addRenwu .jiangli").val() != "" && $("#addRenwu .cishu").val() != ""){
			var newrenwu = renwuhtml($("#addRenwu .renwuname").val(), $("#addRenwu .jiangli").val(), $("#addRenwu .time").val(), $("#addRenwu .cishu").val());
			var ishave = checkCookie("newrenwu", newrenwu, "d"+b.getDate());
			var newcishu = $("#addRenwu .cishu").val();
			setCookie(newcishu, 0, "d"+b.getDate());
			var ishavecishu = checkCookie("newcishu", newcishu, "d"+b.getDate());
			if(ishave){
				var renwu = getCookie("allrenwu");
				renwu = renwu + "," + newrenwu;
				setCookie("newrenwu", newrenwu, "d"+b.getDate());
				setCookie("allrenwu", renwu, "d"+b.getDate());
			}else{
				setCookie("allrenwu", newrenwu, "d"+b.getDate());
			}
			if(ishavecishu){
				var cishu = getCookie("allcishu");
				console.log("cishu ： " + cishu);
				cishu = cishu + "," + newcishu;
				setCookie("newcishu", newcishu, "d"+b.getDate());
				setCookie("allcishu", cishu, "d"+b.getDate());
			}else{
				setCookie("allcishu", newcishu, "d"+b.getDate());
			}
			$("#s-about-us .addTask").before(newrenwu);
			newcishu = newcishu.replace("cishu", "");
			$("#information .cishu select").append("<option class='"+newcishu+"' value=''>"+newcishu+"："+getCookie(newcishu+"cishu")+"</option>");
			$("#addRenwu").modal("hide");
		}
	});

	function renwuhtml(name, price, time, cishu){
		var html = "<div class='col-lg-3 col-md-3 col-sm-3 align-center p-scrollup'><a href='#when'><button class='arrow-d' type='button' data-price='"+price+"' data-time='"+time+"' data-cishu='"+cishu+"'><span>"+name+"</span></button></a></div>";
		return html;
	}	

	$("#information .lingyongqian").on("click", function(){
		if($("#information .allPrice p").text() == 0){
			$("#setPrice").modal("show");
		}else{
			if(confirm("是否更改零用钱")){
				$("#setPrice").modal("show");	
			}
		}
	})

	$("#setPrice .btn-primary").on("click", function(){		

		if($("#setPrice .price").val() != ""){
			//设置总零用钱
			var ishaveprice = checkCookie("allPrice", $("#setPrice .price").val(), "d"+b.getDate());
			if(ishaveprice){
				setCookie("allPrice", $("#setPrice .price").val(), "d"+b.getDate());
				$("#information .allPrice p").text(getCookie("allPrice"));
			}
		}
			
	})

	// 获取地址栏参数
	function getQueryVariable(variable)
	{
	   var query = window.location.search.substring(1);
	   var vars = query.split("&");
	   for (var i=0;i<vars.length;i++) {
	        var pair = vars[i].split("=");
	        if(pair[0] == variable){return pair[1];}
	   }
	   return(false);
	}

})
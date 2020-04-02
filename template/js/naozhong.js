$(function(){
	var renwuTime = 0; //任务时间
	var renwuName = ""; //任务名称
	var renwuPrice = 0; //任务奖励
	var renwuStatus = null; //任务状态

	var showTime = null; //显示时间开关

	showDate();	

	//显示现在时间
	function showDate(){
		//获取时间
		var date = new Date;	
		//时
		var h = date.getHours();
		//分
		var m = date.getMinutes();
		//秒
		var s = date.getSeconds();
		//月份
		var month = date.getMonth() + 1;
		//年份
		var year = date.getFullYear();
		//日
		var day = date.getDate();

		showTime = setInterval(function() {
			
			if(s >= 60){				
				m += 1;
				s = 1;
			}else{
				s += 1;
			}

			if(m >= 60){
				h += 1;
				m = 1;
			}

			$("#s-when .seconds").text(s);
			$("#s-when .hours").text(h);
			$("#s-when .minutes").text(m);

			$("#s-when .top span:nth-child(1)").text(year);
			$("#s-when .top span:nth-child(2)").text(month);
			$("#s-when .top span:nth-child(3)").text(day);

			$("#information .cishu p .riyucisu").text(getCookie("riyucishu"));
			$("#information .cishu p .yinyucisu").text(getCookie("yinyucishu"));
			$("#information .cishu p .phpcisu").text(getCookie("phpcishu"));
			$("#information .cishu p .htmlcisu").text(getCookie("htmlcishu"));

			$("#information .myPrice p").text(getCookie("myPrice"));
			$("#information .allPrice p").text(getCookie("allPrice"));
		}, 1000);
	}

	//开始任务
	$("#s-about-us .row").on("click", "button", function(){

		if(getCookie("allPrice") > 0 && getCookie("allPrice") >= getCookie($(this).attr("data-price"))){
			var h = 0;
			var m = 0;
			var s = 0;
			var player = document.getElementById("audioPay");

			var d = new Date();
			//月份
			var month = d.getMonth() + 1;
			//年份
			var year = d.getFullYear();
			var b = new Date(year, month, 0);

			var cishu = null;
			var whoThe = null;

			renwuName = $(this).text();
			renwuTime = 20;

			switch($(this).attr("data-price")){
				case "price5":
					renwuPrice = getCookie("price5");
					break;
				case "price10":
					renwuPrice = getCookie("price10");
					break;
				case "price15":
					renwuPrice = getCookie("price15");
					break;
				case "price20":
					renwuPrice = getCookie("price20");
					break;
			}

			switch($(this).attr("data-time")){
				case "time30":
					renwuTime = getCookie("time30");
					break;
				case "time60":
					renwuTime = getCookie("time60");
					break;
				case "time90":
					renwuTime = getCookie("time90");
					break;
				case "time120":
					renwuTime = getCookie("time120");
					break;
			}

			for(var i = 1; i <= $("#information .cishu option").length; i++){
				whoThe = $("#information .cishu option:nth-child("+i+")")
				if($(this).attr("data-cishu") == whoThe.attr("class")+"cishu"){
					cishu = Number(getCookie($(this).attr("data-cishu")));
					break;
				}
				whoThe = null;
			}		

			$("#s-when header span").text("正在执行任务：");
			$("#s-when header strong").text(renwuName);

			var showRenwuTime = setInterval(function(){
				clearInterval(showTime);

				//任务结束
				if(renwuTime == 0){
					$("#audioPay").hide();
					clearInterval(showRenwuTime);
					showDate();
					var myprice = getCookie("myPrice");
					++cishu;
					whoThe.text(whoThe.attr("class") + " : " + cishu);
					setCookie(whoThe.attr("class")+"cishu", cishu, "d"+b.getDate());
					if(Number(getCookie("allPrice")) != 0 && Number(getCookie("allPrice")) > Number(renwuPrice)){
						var allpriced = getCookie("allPrice");
						setCookie("allPrice", Number(allpriced) - Number(renwuPrice), "d"+b.getDate());
						setCookie("myPrice", Number(myprice) + Number(renwuPrice), "d"+b.getDate());
					}
					$("#s-when header span").text("");
					$("#s-when header strong").text("");
					$("#mess").modal("show");
					$("#mess .text").append("<p style=' font-size: 18px;'>恭喜你完成："+renwuName+"任务。</p>");
					$("#mess .text").append("<p style=' font-size: 18px;'>获得奖励："+renwuPrice+"金钱。</p>");
				}

				if(renwuTime >= 60){						
					m = Math.floor(renwuTime / 60);
					if(m < 60){
						h = 0;
					}		
					s = renwuTime % 60;
					if(renwuTime >= 3600){
						h = Math.floor(m / 60);						
						m = m % 60;
						s = renwuTime - h * 3600 - m * 60;						
					}
				}else{
					s = renwuTime;
				}

				if(s == 16 && h == 0 && m == 0){
					$("#audioPay").show();
					if (player.paused){ /*如果已经暂停*/
			            player.play(); /*播放*/
			        }else {
			            player.pause();/*暂停*/
			        }
				}

				$("#s-when .seconds").text(s);
				$("#s-when .hours").text(h);
				$("#s-when .minutes").text(m);

				renwuTime--;
			}, 1000);
		}else{
			$("#mess").modal("show");
			$("#mess .text").append("<p style=' font-size: 18px;'>零用钱不够了!</p>");
			$("#mess .btn-primary").click(function(){
				console.log("is ok");
				$("#mess .text .p").remove();
			});
		}
		
	})

	$("#mess .btn-primary").click(function(){
		$("#mess .text").text("");
	});
})
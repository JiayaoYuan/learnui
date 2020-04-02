/**
 * toast提示函数
 * @param text 提示内容主题
 * @param head 提示头 如果是数字，那就是icon 0=>success 1=>error 2=>info  3=>warning
 * @param icon 图标 0=>success 1=>error 2=>info  3=>warning
 * @param postition 定位
 */
function toast(text,head,icon,postition){
    var ob = {text:text};
    if(typeof head === "string"){
        ob.heading = head;
    }else if (typeof head === "number") {
        switch (head){
            case 0:
                ob.icon = 'success';
                ob.heading = '成功';
                break;
            case 1:
                ob.icon = 'error';
                ob.heading = '错误';
                break;
            case 2:
                ob.icon = 'info';
                ob.heading = '提示';
                break;
            case 3:
                ob.icon = 'warning';
                ob.heading = '警告';
                break;
            default:
                ob.icon = 'info';
                ob.heading = '提示';
                break;
        }
    }
    if(typeof icon === 'string' || typeof icon === 'number'){
        if(typeof icon === 'number'){
            switch (icon){
                case 0:
                    ob.icon = 'success';
                    break;
                case 1:
                    ob.icon = 'error';
                    break;
                case 2:
                    ob.icon = 'info';
                    break;
                case 3:
                    ob.icon = 'warning';
                    break;
                default:
                    ob.icon = 'info';
                    break;
            }
        }else{
            ob.icon = icon;
        }
    }
    if(typeof postition === 'string'){
        ob.position = postition;
    }
    $.toast(ob);
}

//设置cookie
function setCookie(cname,cvalue,extimes){
    var d = new Date();
    d.setTime(d.getTime()+(getsec(extimes)));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}
//得到cookie
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return "";
}
//核实cookie
function checkCookie(name, value, time){
    var user=getCookie(name);
    if (user==""){                  
        if (value!="" && value!=null){
            setCookie(name ,value, time);
        }
    }else{
        console.log("已存在： "+name+" = "+user);
        return true;
    }
}

// s10 十秒  h10 十小时  d10十天
function getsec(str)
{
   var str1=str.substring(1,str.length)*1;
   var str2=str.substring(0,1);
   if (str2=="s")
   {
        return str1*1000;
   }
   else if (str2=="h")
   {
       return str1*60*60*1000;
   }
   else if (str2=="d")
   {
       return str1*24*60*60*1000;
   }
}

$("#loginform .login_face button").click(function(){    
    if(getCookie("loginname") == "" && getCookie("loginpass") == ""){
        var d = new Date();
        //月份
        var month = d.getMonth() + 1;
        //年份
        var year = d.getFullYear();

        var b = new Date(year, month, 0);
        var username = prompt("账号：", "输入您的账号");
        var userpass = prompt("密码：", "输入您的密码");
        if(username != null && userpass != null){
            setCookie("loginname", username, "d"+b.getDate());
            setCookie("loginpass", userpass, "d"+b.getDate());
        }
    }
});
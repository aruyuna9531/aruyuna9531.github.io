tzone = 8;
var pageSig1_ok=0;

Date.prototype.Format = function(fmt)   
{ 
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒     
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

//切换时区
function tzswitch(tzone){
	var d=new Date();
	var localTime = d.getTime(); 
	var localOffset=d.getTimezoneOffset()*60000;
	var utc = localTime + localOffset;
	var gtm= utc + (3600000*tzone); 
	var u = navigator.userAgent;
	var nd = new Date(gtm); 
	return nd;
}
//自动计算活动开始，结束时间并打印到页面的的js脚本（通用）
//如果能解决一个html不能使用2个以上js脚本的问题，请将src设为此文件
function isNull(obj){
        if (obj == '' || obj == undefined || obj == null) {
		obj.value=0;
	}
}


function LastDayOfCurrentMonth(year,month){
	switch(month){
	case 1:
	case 3:
	case 5:
	case 7:
	case 8:
	case 10:
	case 12:return 31;
	case 4:
	case 6:
	case 9:
	case 11:return 30;
	default:if(year%4==0)return 29;else return 28;
	}
}

function e_start(){return new Date("2020/2/26 15:00:00");}
function e_end(){return new Date("2020/3/8 23:00:00");}

function countTime(pageSig) {
	var date = new Date();
	var now = date.getTime();
	var d=0,h=0,m=0,s=0;  
	var _start=e_start();
	var _end=e_end();
	leftTime=_end.getTime()- now;
	d = Math.floor(leftTime/1000/60/60/24);  
	h = Math.floor(leftTime/1000/60/60%24);  
	m = Math.floor(leftTime/1000/60%60);  
	s = Math.floor(leftTime/1000%60);     
    document.getElementById("_d").innerHTML = d;
	document.getElementById("_h").innerHTML = h;
	document.getElementById("_m").innerHTML = front0(m);
	document.getElementById("_s").innerHTML = front0(s);
	
	if(d<1){
		warn(_d);
		if(h<10)
		{
			warn(_h);
			if(h<2){
				warn(_m);
				warn(_s);
			}
			else{unwarn(_m);unwarn(_s);}
		}
		else {unwarn(_h);unwarn(_m);unwarn(_s);}
	}
	else {unwarn(_d);unwarn(_h);unwarn(_m);unwarn(_s);}
    setTimeout(countTime,1000);
}
function front0(x){
	if(x<10)return "0"+x;
	else return x;
}
function warn(obj){
	obj.style.color="red";
	obj.style.fontWeight="Bold";
}
function unwarn(obj){
	obj.style.color="black";
	obj.style.fontWeight="normal";
}

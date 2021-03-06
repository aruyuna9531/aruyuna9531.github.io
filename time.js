﻿tzone = 8;
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

function e_cnstart(){return new Date("2020/2/26 15:00:00");}
function e_cnend(){return new Date("2020/3/8 23:00:00");}

function EventEnd(date){
	if(date.getDate()==4 && date.getHours()>=7+tzone || 
	date.getDate()>4 && date.getDate()<20 || 
	date.getDate()==19 && date.getHours()<7+tzone
	)return new Date(date.getFullYear()+"/"+(date.getMonth()+1)+"/15 "+(6+tzone)+":00:00");
	if(date.getDate()==19 && date.getHours()>=7+tzone ||
	date.getDate()>19 && date.getDate()<LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1) || 
	date.getDate()==LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)
	)return new Date(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)+" "+(6+tzone)+":00:00");
	if(date.getMonth()!=0)return new Date(date.getFullYear()+"/"+(date.getMonth())+"/"+LastDayOfCurrentMonth(date.getFullYear(),date.getMonth())+" "+(6+tzone)+":00:00");
	else return new Date((date.getFullYear()-1)+"/12/31 "+(6+tzone)+":00:00");
}

function EventOpening(date){
	if(document.getElementById("serverswitch")!=null){
	if(document.getElementById("serverswitch").value=="cn")return e_cnstart();
	}
	if(date.getDate()<5)return false;
	if(date.getDate()==5 && date.getHours()<7+tzone)return false;
	if(date.getDate()==15 && date.getHours()>=6+tzone)return false;
	if(date.getDate()>15 && date.getDate()<20)return false;
	if(date.getDate()==20 && date.getHours()<7+tzone)return false;
	if(date.getDate()==LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1) && date.getHours()>=6+tzone)return false;
	return true;
}

function EventWaiting(date){
	if(date.getDate()==4)
		if(date.getHours()>=14)return 1;
	if(date.getDate()==5)
		if(date.getHours()<15)return 1;
	if(date.getDate()==19)
		if(date.getHours()>=14)return 2;
	if(date.getDate()==20)
		if(date.getHours()<15)return 2;
	return 0;
}


function countTime(pageSig) {
	if(pageSig==1){
		if(document.getElementById("serverswitch").value=="cn")pageSig1_ok=1;
		else pageSig1_ok=0;
	}
	var date = new Date();
        var now = date.getTime();  
        var endDate = EventEnd(date);
        var end = endDate.getTime();
        var leftTime = end-now; 
        var d=0,h=0,m=0,s=0;  
        if (leftTime>0 && EventOpening(date)==true) {
	d = Math.floor(leftTime/1000/60/60/24);  
        h = Math.floor(leftTime/1000/60/60%24);  
        m = Math.floor(leftTime/1000/60%60);  
        s = Math.floor(leftTime/1000%60);                     
        }
	else switch(EventWaiting(date)){
		case 1:d=9;h=23;break;
		case 2:d=LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)-21;h=23;break;
		default:break;
	}
	if(pageSig1_ok==1){
			var _start=e_cnstart();
			var _end=e_cnend();
			if(now-_start>0)leftTime=_end.getTime()-now;
			else leftTime=_end.getTime()-_start.getTime();
			d = Math.floor(leftTime/1000/60/60/24);  
			h = Math.floor(leftTime/1000/60/60%24);  
			m = Math.floor(leftTime/1000/60%60);  
			s = Math.floor(leftTime/1000%60);     
	}
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
function countTimeC_st() {
        var date;
	var u = navigator.userAgent;
	var date = new Date();
        var now = date.getTime();
	var startDate = e_cnstart();
	var endDate = e_cnend();
        var end = endDate.getTime();
        var leftTime = end-now;
	var opening = now-startDate.getTime()>0 && end-now>0;
        var d=Math.floor((end-startDate.getTime())/1000/60/60/24),h=Math.floor((end-startDate.getTime())/1000/60/60%24),m=Math.floor((end-startDate.getTime())/1000/60%60),s=Math.floor((end-startDate.getTime())/1000%60);
	var preMin=Number(document.getElementById("_mc").innerHTML);
        if (leftTime>0 && opening==true) {
	d = Math.floor(leftTime/1000/60/60/24);  
        h = Math.floor(leftTime/1000/60/60%24);  
        m = Math.floor(leftTime/1000/60%60);  
        s = Math.floor(leftTime/1000%60);                     
        }
        document.getElementById("_dc").innerHTML = d;
	document.getElementById("_hc").innerHTML = h;
	document.getElementById("_mc").innerHTML = front0(m);
	document.getElementById("_sc").innerHTML = front0(s);
	if(d<1){
		warn(_dc);
		if(h<10)
		{
			warn(_hc);
			if(h<2){
				warn(_mc);
				warn(_sc);
			}
		}
	}
	if(preMin!=m)fixC();
	if(d*24+h<2 && opening==true){
		document.getElementById("mainC").style.display="inline";
		document.getElementById("TimeOutOfRangeC").style.display="none";
	}
	last2hours();
        setTimeout(countTimeC_st,1000);
}
function front0(x){
	if(x<10)return "0"+x;
	else return x;
}
function warn(obj){
	obj.style.color="red";
	obj.style.fontWeight="Bold";
}

function sswitch_safetyTest(){
	var server=(document.getElementById("serverswitch").value);
	if(server=="jp"){
		document.getElementById("JP").style.display="inline";
		document.getElementById("CN").style.display="none";
	}
	else{
		document.getElementById("JP").style.display="none";
		document.getElementById("CN").style.display="inline";
	}
}
function unwarn(obj){
	obj.style.color="black";
	obj.style.fontWeight="normal";
}

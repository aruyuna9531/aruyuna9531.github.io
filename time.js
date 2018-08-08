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

function EventOpening(date){
	if(date.getDate()<5)return false;
	if(date.getDate()==5 && date.getHours()<15)return false;
	if(date.getDate()==15 && date.getHours()>=14)return false;
	if(date.getDate()>15 && date.getDate()<20)return false;
	if(date.getDate()==20 && date.getHours()<15)return false;
	if(date.getDate()==LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1) && date.getHours()>=14)return false;
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

function EventEnd(date){
	if(date.getDate()==5 && date.getHours()>=15 || 
	date.getDate()>5 && date.getDate()<20 || 
	date.getDate()==20 && date.getHours()<15
	)return new Date(date.getFullYear()+"/"+(date.getMonth()+1)+"/15 14:00:00");
	if(date.getDate()==20 && date.getHours()>=15 ||
	date.getDate()>20 && date.getDate()<LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1) || 
	date.getDate()==LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)
	)return new Date(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)+" 14:00:00");
	if(date.getMonth()!=0)return new Date(date.getFullYear()+"/"+(date.getMonth())+"/"+LastDayOfCurrentMonth(date.getFullYear(),date.getMonth())+" 14:00:00");
	else return new Date((date.getFullYear()-1)+"/12/31 14:00:00");
}

function countTime() {
        var date;
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isiOS)date = new Date();
	else date = new Date();
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
        document.getElementById("_d").innerHTML = d;
	document.getElementById("_h").innerHTML = h;
	document.getElementById("_m").innerHTML = front0(m);
	document.getElementById("_s").innerHTML = front0(s);
	if(24*d+h<2)document.getElementById("2hrrem").style.display="inline";
	if(d<1){
		warn(_d);
		if(h<10)
		{
			warn(_h);
			if(h<2){
				warn(_m);
				warn(_s);
			}
		}
	}
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
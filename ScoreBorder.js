function comboBonus(combo){
	if(combo<50)return combo;
	if(combo<100)return 1.1*combo-5;
	if(combo<200)return 1.15*combo-10;
	if(combo<400)return 1.2*combo-20;
	if(combo<600)return 1.25*combo-40;
	if(combo<800)return 1.3*combo-70;
	return 1.35*combo-110;
}
function arrangeBits(eventType){
	switch(eventType){
	case 0:return 1.13;
	case 1:return 1.13;
	case 2:return 1.1;
	case 3:return 1.13;
	case 4:return 1.21;
	default:return 1;
	}
}
function print(){
	var maxC = Number(document.getElementById("MaxCombo").value);
	var EType = document.getElementById("EventType").selectedIndex;
	var S1 = Number(document.getElementById("FirstBase").innerHTML);
	var S2 = Number(document.getElementById("SecondBase").innerHTML);
	var S3 = Number(document.getElementById("ThirdBase").innerHTML);
	var TeaTimeSpot = Number(document.getElementById("_d").innerHTML)*24+Number(document.getElementById("_h").innerHTML);
	document.getElementById("First").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S1);
	document.getElementById("Second").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S2);
	document.getElementById("Third").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S3);
	document.getElementById("Tea1").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*(S1+TeaTimeSpot/8));
	document.getElementById("Tea2").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*(S2+TeaTimeSpot/9));
	document.getElementById("Tea3").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*(S3+TeaTimeSpot/10));
}

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

function EventEnd(date){
	if(date.getDate()==5 && date.getHours()>=15 || 
	date.getDate()>5 && date.getDate()<20 || 
	date.getDate()==20 && date.getHours()<15
	)return new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-15 14:00:00");
	if(date.getDate()==20 && date.getHours()>=15 ||
	date.getDate()>20 && date.getDate()<LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1) || 
	date.getDate()==LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)
	)return new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+LastDayOfCurrentMonth(date.getFullYear(),date.getMonth()+1)+" 14:00:00");
	if(date.getMonth()!=0)return new Date(date.getFullYear()+"-"+(date.getMonth())+"-"+LastDayOfCurrentMonth(date.getFullYear(),date.getMonth())+" 14:00:00");
	else return new Date((date.getFullYear()-1)+"-12-31 14:00:00");
}

function countTime() {
        var date;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isiOS)date = new Date(new Date().toLocaleString().replace(/-/g,'/'));
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

function isNull(val){
	var str = val.replace(/(^\s*)|(\s*$)/g, '');
        if (str == '' || str == undefined || str == null) {
		val.value=0;
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
        var date = new Date(new Date().getTime()+86400000);
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
	needlps();
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

function AutomaticRecover(){
	var RemainMins = Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)+Number(document.getElementById

("_m").innerHTML);
	var AutoRec=Math.floor((RemainMins>10?RemainMins-10:0)/6);
	var LvUpRec=Number(document.getElementById("LvUp").value) * Number(document.getElementById("LPMax").value) +1;
	var LP50Rec=Number(document.getElementById("LP50").value)*50;
	var LP50pcRec=Number(document.getElementById("LP50pc").value)*Number(document.getElementById("LPMax").value)*0.5;
	var LP100pcRec=Number(document.getElementById("LP100pc").value)*Number(document.getElementById("LPMax").value);
	document.getElementById("LPs").innerHTML=AutoRec+LvUpRec+LP50Rec+LP50pcRec+LP100pcRec;
	countres();
}

function needlps(){
	var i = 0;
	var icon = Number(document.getElementById("IconGet").value);
	var ptcha = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value);
	var curic = Number(document.getElementById("curicons").value);
	var ptneeds = ptcha > 0 ? ptcha : 0;
	while(true){
		if(icon*i+EventSongPt()*Math.floor((icon*i+curic)/75)>=ptneeds)break;
		i++;
	}
	document.getElementById("normalsong").innerHTML = i;
	document.getElementById("NeedLP").innerHTML = i*Number(document.getElementById("LPUse").value);
	countres();
}

function countres(){
	var needlp = Number(document.getElementById("NeedLP").innerHTML);
	var recovlp= Number(document.getElementById("LPs").innerHTML);
	var lpmax  = Number(document.getElementById("LPMax").value);
	var res = Math.ceil((needlp-recovlp)/lpmax);
	document.getElementById("auto").innerHTML=res>0?res:0;
}

function EventSongPt(){
	var sRank = document.getElementById("scoreRank").value;
	var cRank = document.getElementById("ComboRank").value;
	switch(sRank)
	{
	case "S":switch(cRank)
		{
		case "S":return 565;
		case "A":return 549;
		case "B":return 518;
		case "C":return 508;
		case "D":return 498;
		}
		break;
	case "A":switch(cRank)
		{
		case "S":return 540;
		case "A":return 525;
		case "B":return 495;
		case "C":return 485;
		case "D":return 475;
		}
		break;
	case "B":switch(cRank)
		{
		case "S":return 509;
		case "A":return 495;
		case "B":return 467;
		case "C":return 458;
		case "D":return 448;
		}
		break;
	case "C":switch(cRank)
		{
		case "S":return 484;
		case "A":return 470;
		case "B":return 444;
		case "C":return 435;
		case "D":return 426;
		}
		break;
	}
}

function isNull(obj){
        if (obj == '' || obj == undefined || obj == null) {
		obj.value=0;
	}
}

//----------------------------------------ÈÕ·þ------------------------------------------
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
	var preMin=Number(document.getElementById("_m").innerHTML);
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
	if(preMin!=m)fix();
	if(d*24+h<2){
		document.getElementById("main").style.display="inline";
		document.getElementById("TimeOutOfRange").style.display="none";
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
//---------------------------CountTimeLine------------------------------
function change(){
	var lastRank=Number(document.getElementById("border").value);
	var curRank=Number(document.getElementById("curRank").value);
	var remainMin=Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)*60+Number(document.getElementById("_m").innerHTML);
	var drop=Math.floor((lastRank-curRank)/remainMin);
	document.getElementById("nextRank").innerHTML=curRank+drop-1;
	if(remainMin>5)document.getElementById("nextRank_5").innerHTML=curRank+drop*5-10;
	else document.getElementById("nextRank_5").innerHTML=""
	if(remainMin>10)document.getElementById("nextRank_10").innerHTML=curRank+drop*10-20;
	else document.getElementById("nextRank_10").innerHTML=""
	if(remainMin>30)document.getElementById("nextRank_30").innerHTML=curRank+drop*30-50;
	else document.getElementById("nextRank_30").innerHTML=""
}

function fix(){
	document.getElementById("curRank").value=Number(document.getElementById("nextRank").innerHTML);
	change();
}
//----------------------------¹ú·þ------------------------------------
function serverSwitch(value){
	if(value==1){
		document.getElementById("JP").style.display="inline";
		document.getElementById("CN").style.display="none";
	}
	else{
		document.getElementById("JP").style.display="none";
		document.getElementById("CN").style.display="inline";
	}
	document.getElementById("sv").value=1-Number(document.getElementById("sv").value);
}
function countTimeC() {
        var date;
	var u = navigator.userAgent;
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(isiOS)date = new Date();
	else date = new Date();
        var now = date.getTime();
//--------------------fix-------------------
	var endDate = new Date("2018/6/25 14:00");
	var opening=true;
//--------------------fix end---------------
        var end = endDate.getTime();
        var leftTime = end-now; 
        var d=0,h=0,m=0,s=0;
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
	if(d*24+h<2){
		document.getElementById("mainC").style.display="inline";
		document.getElementById("TimeOutOfRangeC").style.display="none";
	}
        setTimeout(countTimeC,1000);
}
function changeC(){
	var lastRank=Number(document.getElementById("borderC").value);
	var curRank=Number(document.getElementById("curRankC").value);
	var remainMin=Number(document.getElementById("_dc").innerHTML)*24*60+Number(document.getElementById("_hc").innerHTML)*60+Number(document.getElementById("_mc").innerHTML);
	var drop=Math.floor((lastRank-curRank)/remainMin);
	document.getElementById("nextRankC").innerHTML=curRank+drop-1;
	if(remainMin>5)document.getElementById("nextRank_5C").innerHTML=curRank+drop*5-10;
	else document.getElementById("nextRank_5C").innerHTML=""
	if(remainMin>10)document.getElementById("nextRank_10C").innerHTML=curRank+drop*10-20;
	else document.getElementById("nextRank_10C").innerHTML=""
	if(remainMin>30)document.getElementById("nextRank_30C").innerHTML=curRank+drop*30-50;
	else document.getElementById("nextRank_30C").innerHTML=""
}

function fixC(){
	document.getElementById("curRank").value=Number(document.getElementById("nextRank").innerHTML);
	change();
}

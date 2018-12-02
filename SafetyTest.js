function isNull(obj){
        if (obj == '' || obj == undefined || obj == null) {
		obj.value=0;
	}
}

function unwarn(obj){
	obj.style.color="black";
	obj.style.fontWeight="normal";
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
	var mustBe=0,HighRisk=0, LittleRisk=1,NoRisk=2;
	switch(lastRank){
		case 10000:mustBe=14;HighRisk=22;LittleRisk=32;NoRisk=50;break;
		case 30000:mustBe=17;HighRisk=25;LittleRisk=38;NoRisk=67;break;
		case 50000:mustBe=19;HighRisk=35;LittleRisk=60;NoRisk=80;break;
	}
	if(curRank>lastRank){
		document.getElementById("msg").innerHTML="都已经掉档了还观测个jb，还不快去打歌";
		warn(document.getElementById("msg"));
	}
	else if(drop<=mustBe){
		document.getElementById("msg").innerHTML="稳稳的下一档天花板，打歌吧，4倍";
		warn(document.getElementById("msg"));
	}
	else if(drop<=HighRisk){
		document.getElementById("msg").innerHTML=remainMin>15?"掉档风险极大，建议立即开四倍打歌":"掉档风险极大，赶紧打歌，能打几首打几首";
		warn(document.getElementById("msg"));
	}
	else if(drop<=LittleRisk){
		document.getElementById("msg").innerHTML="掉档风险较大，建议打个1首压压惊（1倍就行）";
		unwarn(document.getElementById("msg"));
	}
	else if(drop<=NoRisk){
		document.getElementById("msg").innerHTML="基本稳。仅供参考，如果1分钟后你的排名在上面安全排名之后，仍建议打歌保档";
		unwarn(document.getElementById("msg"));
	}
	else{
		document.getElementById("msg").innerHTML="稳如狗，可以喝茶";
		unwarn(document.getElementById("msg"));
	}
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
	var startDate = e_cnstart();
	var endDate = e_cnend();
        var end = endDate.getTime();
        var leftTime = end-now;
	var opening = now-startDate.getTime()>0 && end-now>0;
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
	if(d*24+h<2 && opening==true){
		document.getElementById("mainC").style.display="inline";
		document.getElementById("TimeOutOfRangeC").style.display="none";
	}
	last2hours();
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
	var HighRisk=0, LittleRisk=1;
	switch(lastRank){
		case 2300:HighRisk=5;LittleRisk=8;break;
		case 6900:HighRisk=8;LittleRisk=11;break;
		case 11500:HighRisk=12;LittleRisk=16;break;
	}
	if(curRank-lastRank>0){
		document.getElementById("msgC").innerHTML="都已经掉档了还观测个jb，还不快去打歌";
		warn(document.getElementById("msgC"));
	}
	else if(drop<=HighRisk){
		document.getElementById("msgC").innerHTML=remainMin>15?"掉档风险极大，建议立即打歌，5首":"掉档风险极大，赶紧打歌，能打几首打几首";
		warn(document.getElementById("msgC"));
	}
	else if(drop<=LittleRisk){
		document.getElementById("msgC").innerHTML="掉档风险较大，建议立即打1首歌";
		unwarn(document.getElementById("msgC"));
	}
	else{
		document.getElementById("msgC").innerHTML="基本稳。仅供参考，如果1分钟后你的排名在上面安全排名之后，仍建议打歌保档";
		unwarn(document.getElementById("msgC"));
	}
}

function fixC(){
	document.getElementById("curRankC").value=Number(document.getElementById("nextRankC").innerHTML);
	changeC();
}

//-------------------temp-------------------------
function last2hours(){
	var remainDays=Number(document.getElementById("_d").innerHTML);
	var remainHours=Number(document.getElementById("_h").innerHTML);
	if(remainDays==0 && remainHours<2){
		document.getElementById("main").style.display="inline";
		document.getElementById("TimeOutOfRange").style.display="none";
	}
	var remainDaysC=Number(document.getElementById("_dc").innerHTML);
	var remainHoursC=Number(document.getElementById("_hc").innerHTML);
	if(remainDaysC==0 && remainHoursC<2){
		document.getElementById("mainC").style.display="inline";
		document.getElementById("TimeOutOfRangeC").style.display="none";
	}
}

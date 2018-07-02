function isNull(obj){
        if (obj == '' || obj == undefined || obj == null) {
		obj.value=0;
	}
}
//--------------------------------------------------------------------time---------------------------------------------------
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
        var date = new Date(new Date().getTime());
        var now = date.getTime();  
        var endDate,opening;
	if(document.getElementById("server").value=="JP"){
		endDate=EventEnd(date);
		opening=EventOpening(date);
	}
	else{
		var CNsta=String(document.getElementById("CNsta").innerHTML);
		var startDate=new Date(CNsta+" 14:00");
		var CNend=String(document.getElementById("CNend").innerHTML);
		endDate=new Date(CNend+" 14:00");
		opening=(now-startDate.getTime()>0)&&(endDate.getTime()-now>0);
	}
        var end = endDate.getTime();
        var leftTime = end-now; 
        var d=0,h=0,m=0,s=0;  
        if (leftTime>0 && opening==true) {
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
			else{
			}
		}
	}
	else{
		unwarn(_d);
		unwarn(_h);
		unwarn(_m);
		unwarn(_s);
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
function unwarn(obj){
	obj.style.color="black";
	obj.style.fontWeight="normal";
}
//----------------------------------------------------------------LP counter-----------------------------------------------
function AutomaticRecover(){
	var RemainMins = Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)+Number(document.getElementById("_m").innerHTML);
	var AutoRec=Math.floor((RemainMins>10?RemainMins-10:0)/6);
	var LvUpRec=Number(document.getElementById("LvUp").value) * Number(document.getElementById("LPMax").value) +1;
	var LP50Rec=Number(document.getElementById("LP50").value)*50;
	var LP50pcRec=Number(document.getElementById("LP50pc").value)*Number(document.getElementById("LPMax").value)*0.5;
	var LP100pcRec=Number(document.getElementById("LP100pc").value)*Number(document.getElementById("LPMax").value);
	var nowLP=Number(document.getElementById("lp").value);
	document.getElementById("LPs").innerHTML=AutoRec+LvUpRec+LP50Rec+LP50pcRec+LP100pcRec+nowLP;
	countres();
}

// ----------------------------------Icon collection--------------------------------------
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
	TimeLimitWarnings();
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
	case "D":return 0;
	}
}
//------------------------------------Score Match------------------------------------------

function isMax(pct){
	var p1=Number(document.getElementById("Sm1pct").value);
	var p2=Number(document.getElementById("Sm2pct").value);
	var p3=Number(document.getElementById("Sm3pct").value);
	if(p1<0)document.getElementById("Sm1pct").value=0;
	if(p2<0)document.getElementById("Sm2pct").value=0;
	if(p3<0)document.getElementById("Sm3pct").value=0;
	if(p1+p2+p3>100){
		if(pct==document.getElementById("Sm1pct"))pct.value=100-p2-p3;
		else if(pct==document.getElementById("Sm2pct"))pct.value=100-p1-p3;
		else pct.value=100-p1-p2;
		document.getElementById("Sm4pct").innerHTML=0;
	}
	else{
		document.getElementById("Sm4pct").innerHTML=100-p1-p2-p3;
	}
}

function SmNeedLps(){
	var p1=Number(document.getElementById("Sm1pct").value)/100;
	var p2=Number(document.getElementById("Sm2pct").value)/100;
	var p3=Number(document.getElementById("Sm3pct").value)/100;
	var p4=Number(document.getElementById("Sm3pct").innerHTML)/100;
	var sBets=0.0;
	var sRank = document.getElementById("scoreRank").value;
	switch(sRank){
	case "S":sBets=1.20;break;
	case "A":sBets=1.15;break;
	case "B":sBets=1.10;break;
	case "C":sBets=1.05;break;
	case "D":sBets=1.00;break;
	}
	var rBets=p1*1.25+p2*1.15+p3*1.05+p4;
	var needPts = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value);
	var res=Math.ceil(needPts/Math.round(357*sBets*rBets));
	document.getElementById("SmNeedLP").innerHTML=res*25;
	document.getElementById("Songs").innerHTML=Math.ceil(res/Number(document.getElementById("smbet").value));
	countres();
	TimeLimitWarnings();
}

//------------------------------------Medley Festival--------------------------------------

function MfNeedLps(){
	var sBets = 0.0;
	var cBets = 0.0;
	var sRank = document.getElementById("scoreRank").value;
	var cRank = document.getElementById("ComboRank").value;
	switch(sRank){
	case "S":sBets=1.20;break;
	case "A":sBets=1.15;break;
	case "B":sBets=1.10;break;
	case "C":sBets=1.05;break;
	case "D":sBets=1.00;break;
	}
	switch(cRank){
	case "S":cBets=1.08;break;
	case "A":cBets=1.06;break;
	case "B":cBets=1.04;break;
	case "C":cBets=1.02;break;
	case "D":cBets=1.00;break;
	}
	var needPts = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value);
	var res=Math.ceil(needPts/Math.round(777*sBets*cBets*1.1));
	document.getElementById("MfNeedLP").innerHTML=res*60;
	document.getElementById("Songs").innerHTML=Math.ceil(res/Number(document.getElementById("mfbet").value));
	countres();
	TimeLimitWarnings();
}

// -----------------------------------Challenge Festival-----------------------------------
function CfNeedLps(){
	var needPts = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value)-Number(document.getElementById("CfPtInRun").value);
	var CurrentRound=Number(document.getElementById("CfCurrentRound").value);
	
	var r1b = document.getElementById("cfr1").value;
	var r2b = document.getElementById("cfr2").value;
	var r3b = document.getElementById("cfr3").value;
	var r4b = document.getElementById("cfr4").value;
	var r5b = document.getElementById("cfr5").value;
	var songs = 0;
	var r=r1b;

	switch(CurrentRound){
	case 1:r=r1b;break;
	case 2:r=r2b;break;
	case 3:r=r3b;break;
	case 4:r=r4b;break;
	case 5:r=r5b;break;
	}
	var needLP=0;
	while(needPts>0){
		needLP+=r*25;
		needPts-=r*Math.round(CfEventSongPt(CurrentRound));
		
		CurrentRound++;
		songs++;
		if(CurrentRound>5)CurrentRound-=5;
		switch(CurrentRound){
		case 1:r=r1b;break;
		case 2:r=r2b;break;
		case 3:r=r3b;break;
		case 4:r=r4b;break;
		case 5:r=r5b;break;
		}
	}
	document.getElementById("Cfrlp").innerHTML=needLP;
	document.getElementById("Songs").innerHTML=songs;
	countres();
	TimeLimitWarnings();
	
}
function CfEventSongPt(round){
	var sRank = document.getElementById("scoreRank").value;
	var cRank = document.getElementById("ComboRank").value;
	var sBets = 0.0;
	var cBets = 0.0;
	var arrangeBets = 1.06;
	switch(sRank){
	case "S":sBets=1.20;break;
	case "A":sBets=1.15;break;
	case "B":sBets=1.10;break;
	case "C":sBets=1.05;break;
	case "D":sBets=1.00;break;
	}
	switch(cRank){
	case "S":cBets=1.08;break;
	case "A":cBets=1.06;break;
	case "B":cBets=1.04;break;
	case "C":cBets=1.02;break;
	case "D":cBets=1.00;break;
	}
	switch(round){
	case 1: return 301.0*sBets*cBets*1.1*arrangeBets;
	case 2: return 320.0*sBets*cBets*1.1*arrangeBets;
	case 3: return 339.0*sBets*cBets*1.1*arrangeBets;
	case 4: return 358.0*sBets*cBets*1.1*arrangeBets;
	case 5: return 377.0*sBets*cBets*1.1*arrangeBets;
	}
}
//-----------------------------------Osanpo Rally-----------------------------------------
function OrNeedLps(){
	//story
	var story = document.getElementById("ORStoryProcess").value;
	var getPt = 1500;
	switch(story){
	case "Nop": getPt-=50;
	case "Prologue": getPt-=50;
	case "1": getPt-=100;
	case "2": getPt-=100;
	case "3": getPt-=150;
	case "4": getPt-=150;
	case "5": getPt-=200;
	case "6": getPt-=200;
	case "7": getPt-=250;
	case "8": getPt-=250;
	case "9":
	case "Epilogue":
	}
	console.log(getPt);
	//normalsong
	var sBets = 0.0;
	var cBets = 0.0;
	var sRank = document.getElementById("scoreRank").value;
	var cRank = document.getElementById("ComboRank").value;
	switch(sRank){
	case "S":sBets=1.20;break;
	case "A":sBets=1.15;break;
	case "B":sBets=1.10;break;
	case "C":sBets=1.05;break;
	case "D":sBets=1.00;break;
	}
	switch(cRank){
	case "S":cBets=1.08;break;
	case "A":cBets=1.06;break;
	case "B":cBets=1.04;break;
	case "C":cBets=1.02;break;
	case "D":cBets=1.00;break;
	}
	var nms = document.getElementById("ORNormalBets").value;
	var nlp = 0, npt = 0;
	switch(nms){
	case "1ea":nlp=5;npt=54;break;
	case "1ex":nlp=25;npt=Math.round(343*sBets*cBets);break;
	case "4ex":nlp=100;npt=Math.round(1372*sBets*cBets);break;
	}
	//secret
	var spc = Number(document.getElementById("ORsecretPerc").value);
	var spt = Number(document.getElementById("ORsecretPtArr").value);
	var slp = Number(document.getElementById("ORsecretLpDec").value);
	
	var counter=0;
	var src=0;
	var needlps = 0;
	var songCount = 0;
	var needPts = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value)-getPt;
	while(needPts>0){
		if(src==0){
			needPts-=npt;
			needlps+=nlp;
			counter++;
			songCount++;
			if(counter==spc){
				counter=0;
				src=1;
			}
		}
		else{
			needPts-=Math.round(1780*spt);
			needlps+=slp;
			songCount++;
			src=0;
		}
	}
	document.getElementById("Orrlp").innerHTML=Math.ceil(needlps);
	document.getElementById("Songs").innerHTML=songCount;
	countres();
	TimeLimitWarnings();
}
//------------------------------------Nakayoshi Match------------------------------------------

function isMaxR(pct){
	var p1=Number(document.getElementById("Nm1pct").value);
	var p2=Number(document.getElementById("Nm2pct").value);
	var p3=Number(document.getElementById("Nm3pct").value);
	if(p1<0)document.getElementById("Nm1pct").value=0;
	if(p2<0)document.getElementById("Nm2pct").value=0;
	if(p3<0)document.getElementById("Nm3pct").value=0;
	
	if(p1+p2+p3>100){
		if(pct==document.getElementById("Nm1pct"))pct.value=100-p2-p3;
		else if(pct==document.getElementById("Nm2pct"))pct.value=100-p1-p3;
		else pct.value=100-p1-p2;
		document.getElementById("Nm4pct").innerHTML=0;
	}
	else{
		document.getElementById("Nm4pct").innerHTML=100-p1-p2-p3;
	}
}

function isMaxN(pct){
	var p1=Number(document.getElementById("NmSSSpct").value);
	var p2=Number(document.getElementById("NmSSpct").value);
	var p3=Number(document.getElementById("NmSpct").value);
	var p4=Number(document.getElementById("NmApct").value);
	var p5=Number(document.getElementById("NmBpct").value);
	if(p1<0)document.getElementById("NmSSSpct").value=0;
	if(p2<0)document.getElementById("NmSSpct").value=0;
	if(p3<0)document.getElementById("NmSpct").value=0;
	if(p4<0)document.getElementById("NmApct").value=0;
	if(p5<0)document.getElementById("NmBpct").value=0;
	if(p1+p2+p3+p4+p5>100){
		if(pct==document.getElementById("NmSSSpct"))pct.value=100-p1-p2-p3-p4-p5+p1;
		else if(pct==document.getElementById("NmSSpct"))pct.value=100-p1-p2-p3-p4-p5+p2;
		else if(pct==document.getElementById("NmSpct"))pct.value=100-p1-p2-p3-p4-p5+p3;
		else if(pct==document.getElementById("NmApct"))pct.value=100-p1-p2-p3-p4-p5+p4;
		else pct.value=100-p1-p2-p3-p4-p5+p5;
		document.getElementById("NmCpct").innerHTML=0;
	}
	else{
		document.getElementById("NmCpct").innerHTML=100-p1-p2-p3-p4-p5;
	}
}

function NmNeedLps(){
	var p1=Number(document.getElementById("NmSSSpct").value)/100;
	var p2=Number(document.getElementById("NmSSpct").value)/100;
	var p3=Number(document.getElementById("NmSpct").value)/100;
	var p4=Number(document.getElementById("NmApct").value)/100;
	var p5=Number(document.getElementById("NmBpct").value)/100;
	var p6=Number(document.getElementById("NmCpct").innerHTML)/100;
	var r1=Number(document.getElementById("Nm1pct").value)/100;
	var r2=Number(document.getElementById("Nm2pct").value)/100;
	var r3=Number(document.getElementById("Nm3pct").value)/100;
	var r4=Number(document.getElementById("Nm4pct").innerHTML)/100;
	var sBets = 0.0;
	var cBets = 0.0;
	var sRank = document.getElementById("scoreRank").value;
	var cRank = document.getElementById("ComboRank").value;
	switch(sRank){
	case "S":sBets=1.20;break;
	case "A":sBets=1.15;break;
	case "B":sBets=1.10;break;
	case "C":sBets=1.05;break;
	case "D":sBets=1.00;break;
	}
	switch(cRank){
	case "S":cBets=1.08;break;
	case "A":cBets=1.06;break;
	case "B":cBets=1.04;break;
	case "C":cBets=1.02;break;
	case "D":cBets=1.00;break;
	}
	var pBets=p1*1.45+p2*1.35+p3*1.25+p4*1.15+p5*1.1*p6*1.05;
	var rBets=r1*1.08+p2*1.05+p3*1.02+p4;
	var needPts = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value);
	var res=Math.ceil(needPts/Math.round(301*sBets*cBets*pBets*rBets));
	document.getElementById("NmNeedLP").innerHTML=res*25;
	document.getElementById("Songs").innerHTML=Math.ceil(res/Number(document.getElementById("nmbet").value));
	countres();
	TimeLimitWarnings();
}
//------------------------------------------general------------------------------------------
function countres(){
	var needlp = 0;
	
	switch(document.getElementById("CurrentEvent").value){
	case "ic":needlp=Number(document.getElementById("NeedLP").innerHTML);break;
	case "sm":needlp=Number(document.getElementById("SmNeedLP").innerHTML);break;
	case "mf":needlp=Number(document.getElementById("MfNeedLP").innerHTML);break;
	case "cf":needlp=Number(document.getElementById("Cfrlp").innerHTML);break;
	case "sr":needlp=Number(document.getElementById("Orrlp").innerHTML);break;
	case "nm":needlp=Number(document.getElementById("NmNeedLP").innerHTML);break;
	}

	var recovlp= Number(document.getElementById("LPs").innerHTML);
	var lpmax  = Number(document.getElementById("LPMax").value);
	var res = Math.ceil((needlp-recovlp)/lpmax);
	document.getElementById("auto").innerHTML=res>0?res:0;
}
function eventType(){
	var a = document.getElementById("CurrentEvent").value;
	document.getElementById("IconCol").style.display="none";
	document.getElementById("SM").style.display="none";
	document.getElementById("MF").style.display="none";
	document.getElementById("CF").style.display="none";
	document.getElementById("OR").style.display="none";
	document.getElementById("NM").style.display="none";
	document.getElementById("notAvailable").style.display="none";
	switch(a){
	case "ic":document.getElementById("IconCol").style.display="inline";break;
	case "sm":document.getElementById("SM").style.display="inline";break;
	case "mf":document.getElementById("MF").style.display="inline";break;
	case "cf":document.getElementById("CF").style.display="inline";break;
	case "sr":document.getElementById("OR").style.display="inline";break;
	case "nm":document.getElementById("NM").style.display="inline";break;
	}
}
function TimeLimitWarnings(){
	var remainTime=Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)*60+Number(document.getElementById("_m").innerHTML);
	var songs=Number(document.getElementById("Songs").innerHTML);
	if(remainTime-songs*2.5>12)document.getElementById("TimeLimitWarning").innerHTML="";
	else if(remainTime-songs*2.5>0)document.getElementById("TimeLimitWarning").innerHTML="达到目标pt所需时间可能不够，请抓紧时间";
	else document.getElementById("TimeLimitWarning").innerHTML="已经没有时间足以达到该pt，请调整目标pt或多倍策略";
}

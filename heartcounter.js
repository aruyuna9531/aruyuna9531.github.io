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
	
	var remainTime=Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)*60+Number(document.getElementById("_m").innerHTML);
	if(remainTime-songs*2.5>12)document.getElementById("TimeLimitWarning").innerHTML="";
	else if(remainTime-songs*2.5>0)document.getElementById("TimeLimitWarning").innerHTML="达到目标pt所需时间可能不够，请抓紧时间";
	else document.getElementById("TimeLimitWarning").innerHTML="已经没有时间足以达到该pt，请调整目标pt或多倍策略";
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
}
//------------------------------------------general------------------------------------------
function countres(){
	var needlp = 0;
	
	switch(document.getElementById("CurrentEvent").value){
	case "ic":needlp=Number(document.getElementById("NeedLP").innerHTML);break;
	case "sm":needlp=0;break;
	case "mf":needlp=0;break;
	case "cf":needlp=Number(document.getElementById("Cfrlp").innerHTML);break;
	case "sr":needlp=Number(document.getElementById("Orrlp").innerHTML);break;
	case "nm":needlp=0;break;
	}

	var recovlp= Number(document.getElementById("LPs").innerHTML);
	var lpmax  = Number(document.getElementById("LPMax").value);
	var res = Math.ceil((needlp-recovlp)/lpmax);
	document.getElementById("auto").innerHTML=res>0?res:0;
}
function eventType(){
	var a = document.getElementById("CurrentEvent").value;
	document.getElementById("IconCol").style.display="none";
	document.getElementById("CF").style.display="none";
	document.getElementById("OR").style.display="none";
	document.getElementById("notAvailable").style.display="none";
	switch(a){
	case "ic":document.getElementById("IconCol").style.display="inline";break;
	case "sm":document.getElementById("notAvailable").style.display="inline";break;
	case "mf":document.getElementById("notAvailable").style.display="inline";break;
	case "cf":document.getElementById("CF").style.display="inline";break;
	case "sr":document.getElementById("OR").style.display="inline";break;
	case "nm":document.getElementById("notAvailable").style.display="inline";break;
	}
}
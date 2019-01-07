function f(){
	var curEv=Number(document.getElementById("LastNo").innerHTML);
	for(var i=118;i<curEv;i++){
		BC(i);
		Ar(i);
		Dif(i);
		e(i,1);
		e(i,2);
		e(i,3);
	}
	BC(curEv);
	Ar(curEv);
	Dif(curEv);
	detect(curEv,1);
	detect(curEv,2);
	detect(curEv,3);
}
function detect(curEv,b){
	var eID=curEv+String(b)+"C";
	var eScore=Number(document.getElementById(eID).innerHTML);
	var bcID=curEv+"BC";
	var bc=Number(document.getElementById(bcID).innerHTML);
	var arID=curEv+"Ar";
	var ar=Number(document.getElementById(arID).innerHTML);
	var cID=curEv+String(b)+"S";
	var difID=curEv+"dif";
	var dif=Number(document.getElementById(difID).innerHTML);
	
	document.getElementById(cID).innerHTML=Math.round(eScore*bc*ar*dif/80*1.21);
	warn2(cID);
}
function warn(obj){
		var abj=document.getElementById(obj);
		abj.style.color="red";
		abj.style.fontWeight="Bold";
}
function warn2(obj){
		var abj=document.getElementById(obj);
		abj.style.color="pink";
		abj.style.fontWeight="Bold";
}
//-------------------------------------------history------------------------------------
function BC(curEv){
	var mcID=curEv+"MC";
	var maxCombo=Number(document.getElementById(mcID).innerHTML);
	var res=0;
	if(maxCombo<=50)res=maxCombo;
	else if(maxCombo<=100)res=1.1*maxCombo-5;
	else if(maxCombo<=200)res=1.15*maxCombo-10;
	else if(maxCombo<=400)res=1.2*maxCombo-20;
	else if(maxCombo<=600)res=1.25*maxCombo-40;
	else if(maxCombo<=800)res=1.3*maxCombo-70;
	else res=1.35*maxCombo-110;
	var bcID=curEv+"BC";
	document.getElementById(bcID).innerHTML=res;
}
function Ar(curEv){
	var enID=curEv+"EN";
	var EventName=String(document.getElementById(enID).innerHTML);
	var arID=curEv+"Ar";
	var arrangeSpan=document.getElementById(arID);
	switch(EventName){
	case "Score Match":arrangeSpan.innerHTML=1;break;
	case "Medley Festival":arrangeSpan.innerHTML=1.1;break;
	case "Challenge Festival":arrangeSpan.innerHTML=1.1;break;
	case "おさんぽラリー":arrangeSpan.innerHTML=1.13;break;
	case "なかよしマッチ":arrangeSpan.innerHTML=1.20;break;
	default:arrangeSpan.innerHTML=1.13
	}
}
function e(curEv,b){
	var eID=curEv+String(b)+"S";
	var eScore=Number(document.getElementById(eID).innerHTML);
	var bcID=curEv+"BC";
	var bc=Number(document.getElementById(bcID).innerHTML);
	var arID=curEv+"Ar";
	var ar=Number(document.getElementById(arID).innerHTML);
	var cID=curEv+String(b)+"C";
	var difID=curEv+"dif";
	var dif=Number(document.getElementById(difID).innerHTML);
	var enID=curEv+"EN";
	var EventName=String(document.getElementById(enID).innerHTML);
	if(EventName!="Score Match")document.getElementById(cID).innerHTML=Math.round(eScore/bc/ar/dif*80/1.21);
	else document.getElementById(cID).innerHTML=0;
	warn(cID);
}
//-------------------------%--------------------------------
function Dif(curEv){
	var enID=curEv+"EN";
	var EventName=String(document.getElementById(enID).innerHTML);
	var hnID=curEv+"HN";
	var maxSongs=Number(document.getElementById(hnID).innerHTML);
	var pct=0,eventSong=0,oneRound=1,allSongs=1,fcDif=1;
	switch(EventName){
	case "Score Match":
		pct=1;break;
	case "Medley Festival":
		eventSong=150;
		oneRound=3;
		allSongs=15;		//56/11*3--song can be refresh
		fcDif=0.9;
		break;
	case "Challenge Festival":
		eventSong=300;
		oneRound=5;
		allSongs=8;
		fcDif=1;
		break;
	case "おさんぽラリー":
		eventSong=150;
		oneRound=1;
		allSongs=21;
		break;
	case "なかよしマッチ":
		eventSong=220;
		oneRound=1;
		allSongs=36;
		fcDif=0.95;
		break;
	default:
		eventSong=54;
		oneRound=1;
		maxSongs=1;
		allSongs=1;
		break;
	}
	if(EventName!="Score Match")pct=1-1/(eventSong/oneRound*maxSongs/allSongs*fcDif);
	var difID=curEv+"dif";
	document.getElementById(difID).innerHTML=pct.toFixed(3);
}

function last6monthEvc(){
	var curEv=Number(document.getElementById("LastNo").innerHTML);
	var ic=0,sm=0,mf=0,cf=0,sr=0,nm=0;
	for(var i=curEv; i>curEv-12;i--){
		var enID=i+"EN";
		var EventName=String(document.getElementById(enID).innerHTML);
		switch(EventName){
		case "Score Match":sm++;break;
		case "Medley Festival":mf++;break;
		case "Challenge Festival":cf++;break;
		case "おさんぽラリー":sr++;break;
		case "なかよしマッチ":nm++;break;
		default:ic++;break;
		}
	}
	document.getElementById("icc").innerHTML=ic;
	document.getElementById("smc").innerHTML=sm;
	document.getElementById("mfc").innerHTML=mf;
	document.getElementById("cfc").innerHTML=cf;
	document.getElementById("src").innerHTML=sr;
	document.getElementById("nmc").innerHTML=nm;
	var icl=0,sml=0,mfl=104,cfl=0,srl=0,nml=0;
	for(var i=curEv; i>117;i--){
		var enID=i+"EN";
		var EventName=String(document.getElementById(enID).innerHTML);
		switch(EventName){
		case "Score Match":if(i>sml)sml=i;break;
		case "Medley Festival":if(i>mfl)mfl=i;break;
		case "Challenge Festival":if(i>cfl)cfl=i;break;
		case "おさんぽラリー":if(i>srl)srl=i;break;
		case "なかよしマッチ":if(i>nml)nml=i;break;
		default:if(i>icl)icl=i;break;
		}
	}
	var cEv=158;
	var cYear=2019;
	var icGap=0,smGap=0,mfGap=0,cfGap=0,srGap=0,nmGap=0;
	
	var RvsE=cEv-icl;
	var _Year=cYear-Math.floor(RvsE/24);
	var _Month=12-Math.floor((RvsE%24)/2);
	var _Half=icl%2==1?"上旬":"下旬";
	document.getElementById("LastIc").innerHTML=_Year+"年"+_Month+"月"+_Half;
	icGap=RvsE;
	
	RvsE=cEv-sml;
	_Year=cYear-Math.floor(RvsE/24);
	_Month=12-Math.floor((RvsE%24)/2);
	_Half=sml%2==1?"上旬":"下旬";
	document.getElementById("LastSm").innerHTML=_Year+"年"+_Month+"月"+_Half;
	smGap=RvsE;
	
	RvsE=cEv-mfl;
	_Year=cYear-Math.floor(RvsE/24);
	_Month=12-Math.floor((RvsE%24)/2);
	_Half=mfl%2==1?"上旬":"下旬";
	document.getElementById("LastMf").innerHTML=_Year+"年"+_Month+"月"+_Half;
	mfGap=RvsE;
	
	RvsE=cEv-cfl;
	_Year=cYear-Math.floor(RvsE/24);
	_Month=12-Math.floor((RvsE%24)/2);
	_Half=cfl%2==1?"上旬":"下旬";
	document.getElementById("LastCf").innerHTML=_Year+"年"+_Month+"月"+_Half;
	cfGap=RvsE;
	
	RvsE=cEv-srl;
	_Year=cYear-Math.floor(RvsE/24);
	_Month=12-Math.floor((RvsE%24)/2);
	_Half=srl%2==1?"上旬":"下旬";
	document.getElementById("LastSr").innerHTML=_Year+"年"+_Month+"月"+_Half;
	srGap=RvsE;
	
	RvsE=cEv-nml;
	_Year=cYear-Math.floor(RvsE/24);
	_Month=12-Math.floor((RvsE%24)/2);
	_Half=nml%2==1?"上旬":"下旬";
	document.getElementById("LastNm").innerHTML=_Year+"年"+_Month+"月"+_Half;
	nmGap=RvsE;
	
	var mfPct=1,srPct=0,icPct=0,cfPct=0,smPct=0,nmPct=0,tGap=1;
	if(curEv%2==0){
		//μ's
		icPct=0;	//No new song
		tGap=smGap+cfGap+nmGap;
		smPct=smGap/tGap*99;
		cfPct=cfGap/tGap*99;
		nmPct=nmGap/tGap*99;
	}
	else{
		//Aqours
		cfPct=1;
		tGap=icGap+smGap+nmGap;
		icPct=icGap/tGap*98;
		smPct=smGap/tGap*98;
		nmPct=nmGap/tGap*98;
	}
	document.getElementById("nextIcPerc").innerHTML=icPct+"%";
	document.getElementById("nextSmPerc").innerHTML=smPct+"%";
	document.getElementById("nextMfPerc").innerHTML=mfPct+"%";
	document.getElementById("nextCfPerc").innerHTML=cfPct+"%";
	document.getElementById("nextSrPerc").innerHTML=srPct+"%（必ず事前お知らせで確認できる）";
	document.getElementById("nextNmPerc").innerHTML=nmPct+"%";
}

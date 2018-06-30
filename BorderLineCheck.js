﻿function f(ev){
	var curEv=ev;
	for(var i=curEv-4;i<curEv;i++){
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
	
	document.getElementById(cID).innerHTML=Math.round(eScore*bc*ar*dif);
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
	document.getElementById(cID).innerHTML=(eScore/bc/ar/dif).toFixed(2);
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
	pct=1-1/(eventSong/oneRound*maxSongs/allSongs*fcDif);
	var difID=curEv+"dif";
	document.getElementById(difID).innerHTML=pct.toFixed(3);
}

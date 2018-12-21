
//----------------------------------------------------------------LP counter-----------------------------------------------
function AutomaticRecover(){
	var RemainMins = Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)+Number(document.getElementById("_m").innerHTML);
	var AutoRec=Math.floor((RemainMins>10?RemainMins-10:0)/6);
	var LvUpRec=Number(document.getElementById("LvUp").innerHTML) * Number(document.getElementById("LPMax").innerHTML) +1;
	var LP50Rec=Number(document.getElementById("LP50").value)*50;
	var LP50pcRec=Number(document.getElementById("LP50pc").value)*Number(document.getElementById("LPMax").innerHTML)*0.5;
	var LP100pcRec=Number(document.getElementById("LP100pc").value)*Number(document.getElementById("LPMax").innerHTML);
	var nowLP=Number(document.getElementById("lp").value);
	var ptBonusSugar=(document.getElementsByName("useTheseSugars")[0].checked)?(Number(document.getElementById("getSugar").innerHTML)*50):0;
	document.getElementById("LPs").innerHTML=AutoRec+LvUpRec+LP50Rec+LP50pcRec+LP100pcRec+nowLP+ptBonusSugar;
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
	document.getElementById("Songs_ic").innerHTML = i+Math.ceil(i*Number(document.getElementById("IconGet").value)/300);
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
	document.getElementById("Songs_sm").innerHTML=Math.ceil(res/Number(document.getElementById("smbet").value));
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
	document.getElementById("Songs_mf").innerHTML=Math.ceil(res/Number(document.getElementById("mfbet").value));
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
	document.getElementById("Songs_cf").innerHTML=songs;
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
	document.getElementById("Songs_or").innerHTML=songCount;
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
	var pBets=p1*1.45+p2*1.35+p3*1.25+p4*1.15+p5*1.1+p6*1.05;
	var rBets=r1*1.08+r2*1.05+r3*1.02+r4;
	var needPts = Number(document.getElementById("aim").value)-Number(document.getElementById("cur").value);
	var res=Math.ceil(needPts/Math.round(301*sBets*cBets*pBets*rBets));
	document.getElementById("NmNeedLP").innerHTML=res*25;
	var songplay=Math.ceil(res/Number(document.getElementById("nmbet").value));
	document.getElementById("Songs_nm").innerHTML=songplay>0?songplay:0;
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
	var lpmax  = Number(document.getElementById("LPMax").innerHTML);
	var res = Math.ceil((needlp-recovlp)/lpmax);
	document.getElementById("auto").innerHTML=res>0?res:0;
	if(res==1)document.getElementById("Loveca1Warning").style.display="inline";
	else document.getElementById("Loveca1Warning").style.display="none";
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
	case "ic":document.getElementById("IconCol").style.display="inline";document.getElementById("sicMsg").style.display="inline";break;
	case "sm":document.getElementById("SM").style.display="inline";document.getElementById("ssmMsg").style.display="inline";break;
	case "mf":document.getElementById("MF").style.display="inline";document.getElementById("smfMsg").style.display="inline";break;
	case "cf":document.getElementById("CF").style.display="inline";document.getElementById("scfMsg").style.display="inline";break;
	case "sr":document.getElementById("OR").style.display="inline";document.getElementById("sorMsg").style.display="inline";break;
	case "nm":document.getElementById("NM").style.display="inline";document.getElementById("snmMsg").style.display="inline";break;
	}
}
function TimeLimitWarnings(){
	var remainTime=Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)*60+Number(document.getElementById("_m").innerHTML);
	var songs=Number(document.getElementById("Songs").innerHTML);
	if(remainTime-songs*2.5>12)document.getElementById("TimeLimitWarning").innerHTML="";
	else if(remainTime-songs*2.5>0)document.getElementById("TimeLimitWarning").innerHTML="达到目标pt所需时间可能不够，请抓紧时间";
	else document.getElementById("TimeLimitWarning").innerHTML="已经没有时间足以达到该pt，请调整目标pt或多倍策略";
}
function ptBonus(){
	var loveca_checkpoint=[500, 2500, 5750, 12500, 20000, 32500, 47500, 62500, 75000, 120000, 160000]
	var loveca_checkpoint_makaron=[200, 1200, 2250, 5000, 9000, 14000, 20000, 26500, 36000, 42500, 65000]
	var SR_checkpoint=[25000, 55000, 100000]
	var SR_checkpoint_makaron=[11000, 25000, 40000]
	var ticket_checkpoint=[80000, 140000]
	var ticket_checkpoint_makaron=[34000, 50000]
	var sugar_checkpoint=[3500, 8000, 15000, 52500, 80000]
	var sugar_checkpoint_makaron=[1600, 3500, 7000, 22000, 33000]
	var eventType=document.getElementById("CurrentEvent").value;
	if(eventType=="ic")ptBonusShow(loveca_checkpoint_makaron, SR_checkpoint_makaron, ticket_checkpoint_makaron, sugar_checkpoint_makaron);
	else ptBonusShow(loveca_checkpoint, SR_checkpoint, ticket_checkpoint, sugar_checkpoint);
}
function ptBonusShow(lovecaArr, srArr, ticketArr, sugarArr){
	var start=Number(document.getElementById("cur").value);
	var end=Number(document.getElementById("aim").value);
	var loveca=0,sr=0,ticket=0,sugar=0;
	var point_slow=0, point_fast=0;
	//loveca
	while(point_fast<11 && lovecaArr[point_fast]<=end){
		if(point_fast<5)loveca++;
		else if(point_fast<9)loveca+=2;
		else if(point_fast==9)loveca+=3;
		else loveca+=4;
		point_fast++;
	}
	while(point_slow<11 && lovecaArr[point_slow]<start){
		if(point_slow<5)loveca--;
		else if(point_slow<9)loveca-=2;
		else if(point_slow==9)loveca-=3;
		else loveca-=4;
		point_slow++;
	}
	//SR
	point_fast=0;
	point_slow=0;
	while(point_fast<3 && srArr[point_fast]<=end){
		sr++;
		point_fast++;
	}
	while(point_slow<3 && srArr[point_slow]<start){
		sr--;
		point_slow++;
	}
	//ticket
	point_fast=0;
	point_slow=0;
	while(point_fast<2 && ticketArr[point_fast]<=end){
		ticket++;
		point_fast++;
	}
	while(point_slow<2 && ticketArr[point_slow]<start){
		ticket--;
		point_slow++;
	}
	//sugar
	point_fast=0;
	point_slow=0;
	while(point_fast<5 && sugarArr[point_fast]<=end){
		if(point_fast<4)sugar++;
		else sugar+=2;
		point_fast++;
	}
	while(point_slow<5 && sugarArr[point_slow]<start){
		if(point_slow<4)sugar--;
		else sugar-=2;
		point_slow++;
	}
	document.getElementById("getLoveca").innerHTML=loveca>0?loveca:0;
	document.getElementById("getSR").innerHTML=sr>0?sr:0;
	document.getElementById("getTicket").innerHTML=ticket>0?ticket:0;
	document.getElementById("getSugar").innerHTML=sugar>0?sugar:0;
}
//————————————————————————————EXP————————————————————————————

function getExpFromRank(rank){
	if(rank<=33){
		switch(rank){
		case 1:return 6;
		case 2:return 6;
		case 3:return 8;
		case 4:return 10;
		case 5:return 13;
		case 6:return 16;
		case 7:return 20;
		case 8:return 24;
		case 9:return 28;
		case 10:return 34;
		case 11:return 39;
		case 12:return 46;
		case 13:return 52;
		case 14:return 60;
		case 15:return 68;
		case 16:return 76;
		case 17:return 85;
		case 18:return 94;
		case 19:return 104;
		case 20:return 115;
		case 21:return 125;
		case 22:return 137;
		case 23:return 149;
		case 24:return 162;
		case 25:return 174;
		case 26:return 188;
		case 27:return 203;
		case 28:return 217;
		case 29:return 232;
		case 30:return 247;
		case 31:return 264;
		case 32:return 281;
		case 33:return 298;
		}
	}
	else if(rank<=1000)
	{
		var ret=Math.round(34.45*rank-551);
		if(rank<100)return Math.round(ret/2);
		else return ret;
	}
	else return 0;
}

function expCount(){
	var rank=Number(document.getElementById("curRank").value);
	var cexp=Number(document.getElementById("curExp").value);
	exp(rank, cexp);
}

function exp(rank, cexp){
	var ctotExp=0;
	for(var i=1;i<rank;i++)ctotExp+=getExpFromRank(i);
	ctotExp+=cexp;
	
	var expExploseSign=Number(document.getElementById("_d").innerHTML)>=8 && String(document.getElementById("serverswitch").value)=="jp"?1:0;
	var needlp=0;
	switch(document.getElementById("CurrentEvent").value){
	case "ic":needlp=Number(document.getElementById("NeedLP").innerHTML);break;
	case "sm":needlp=Number(document.getElementById("SmNeedLP").innerHTML);break;
	case "mf":needlp=Number(document.getElementById("MfNeedLP").innerHTML);break;
	case "cf":needlp=Number(document.getElementById("Cfrlp").innerHTML);break;
	case "sr":needlp=Number(document.getElementById("Orrlp").innerHTML);break;
	case "nm":needlp=Number(document.getElementById("NmNeedLP").innerHTML);break;
	}
	var Nrecover=Math.floor(Number(document.getElementById("_d").innerHTML)*240+Number(document.getElementById("_h").innerHTML)*10+Number(document.getElementById("_m").innerHTML)/6);
	var Nexp=Nrecover/25*83;
	if(expExploseSign==1){
		var Grecover=(needlp-Nrecover)>0?needlp-Nrecover:0;
		var Gexp=Math.floor(Grecover/25)*830;
		var GeventSongExp=Math.floor(Grecover/25*27/75)*830;
		ctotExp+=Nexp+Gexp+GeventSongExp;
		var destExp=0;
		var destRank=1;
		for(;destExp<ctotExp;destRank++)destExp+=getExpFromRank(destRank);
		document.getElementById("LvUp").innerHTML=destRank-rank;
	}
	else{
		ctotExp+=Nexp;
		var destExp=0;
		var destRank=1;
		for(;destExp<ctotExp;destRank++)destExp+=getExpFromRank(destRank);
		document.getElementById("LvUp").innerHTML=destRank-rank;
	}
}

function maxLP(){
	var rank=Number(document.getElementById("curRank").value);
	document.getElementById("LPMax").innerHTML=(rank<=300)?(25+Math.floor(rank/2)):(175+Math.floor((rank-300)/3));
}

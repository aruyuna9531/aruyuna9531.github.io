﻿function comboBonus(combo){
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
	case 2:return 1.13;
	case 3:return 1.1;
	case 4:return 1.13;
	case 5:return 1.21;
	default:return 1;
	}
}
function print(){
	var maxC = Number(document.getElementById("MaxCombo").value);
	var EType = document.getElementById("EventType").selectedIndex;
	var S1 = Number(document.getElementById("FirstBase").innerHTML);
	var S2 = Number(document.getElementById("SecondBase").innerHTML);
	var S3 = Number(document.getElementById("ThirdBase").innerHTML);
	var C1 = Number(document.getElementById("FirstC").innerHTML);
	var C2 = Number(document.getElementById("SecondC").innerHTML);
	var C3 = Number(document.getElementById("ThirdC").innerHTML);
	var TeaTimeSpot = Number(document.getElementById("_d").innerHTML)*24+Number(document.getElementById("_h").innerHTML);
	if(EType!="Score Match"){
	document.getElementById("First").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S1);
	document.getElementById("Second").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S2);
	document.getElementById("Third").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S3);
	document.getElementById("Tea1").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*(S1+TeaTimeSpot/2))+2000;
	document.getElementById("Tea2").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*(S2+TeaTimeSpot/3))+1500;
	document.getElementById("Tea3").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*(S3+TeaTimeSpot/4))+1000;
	document.getElementById("B1c").innerHTML=isPos(Math.round(arrangeBits(EType)*comboBonus(maxC)*C1));
	document.getElementById("B2c").innerHTML=isPos(Math.round(arrangeBits(EType)*comboBonus(maxC)*C2));
	document.getElementById("B3c").innerHTML=isPos(Math.round(arrangeBits(EType)*comboBonus(maxC)*C3));
	}
}

function isPos(num){
	if(num>=0)return "+"+num;
	else return num;
}


function languageSwitch(value){
	switch(value){
		case "ch":
			document.getElementById("lan").innerHTML="语言：";
			document.getElementById("server").innerHTML="日服";
			document.getElementById("MsgToEnd").innerHTML="离活动结束还有：";
			document.getElementById("MsgDays").innerHTML="天";
			document.getElementById("MsgET").innerHTML="当前活动类型：";
			document.getElementById("T1").innerHTML="传统";
			document.getElementById("T2").innerHTML="mf";
			document.getElementById("T3").innerHTML="cf";
			document.getElementById("T4").innerHTML="散步";
			document.getElementById("T5").innerHTML="协力";
			document.getElementById("MsgMaxC").innerHTML="最高Combo：";
			document.getElementById("MsgBorderGuest").innerHTML="预测线";
			document.getElementById("Msg1").innerHTML="一档：";
			document.getElementById("Msg2").innerHTML="二档：";
			document.getElementById("Msg3").innerHTML="三档：";
			document.getElementById("MsgCurrentUpdate").innerHTML="上次更新：";
			document.getElementById("MsgSafe").innerHTML="喝茶线";
			document.getElementById("MsgS1").innerHTML="一档：";
			document.getElementById("MsgS2").innerHTML="二档：";
			document.getElementById("MsgS3").innerHTML="三档：";
			document.getElementById("MsgSafeTips").innerHTML="喝茶线是动态变化的，随着活动进行会越来越迫近预测线，仅供参考";
			break;
		case "jp":
			document.getElementById("lan").innerHTML="言語：";
			document.getElementById("server").innerHTML="日本版";
			document.getElementById("MsgToEnd").innerHTML="イベント終了までおよそ：";
			document.getElementById("MsgDays").innerHTML="日";
			document.getElementById("MsgET").innerHTML="開催中のイベントタイプ";
			document.getElementById("T1").innerHTML="マカロン";
			document.getElementById("T2").innerHTML="メドレーフェスティバル";
			document.getElementById("T3").innerHTML="チャレンジフェスティバル";
			document.getElementById("T4").innerHTML="おさんぽラリー";
			document.getElementById("T5").innerHTML="なかよしマッチ";
			document.getElementById("MsgMaxC").innerHTML="最大ノーツ数：";
			document.getElementById("MsgBorderGuest").innerHTML="ボーダー予想";
			document.getElementById("Msg1").innerHTML="10000位：";
			document.getElementById("Msg2").innerHTML="30000位：";
			document.getElementById("Msg3").innerHTML="50000位：";
			document.getElementById("MsgCurrentUpdate").innerHTML="前回更新：";
			document.getElementById("MsgSafe").innerHTML="セーフボーダー（すでにボーダー以上確定）";
			document.getElementById("MsgS1").innerHTML="10000位：";
			document.getElementById("MsgS2").innerHTML="30000位：";
			document.getElementById("MsgS3").innerHTML="50000位：";
			document.getElementById("MsgSafeTips").innerHTML="セーフボーダーは時間の流れによって自動的に更新します";
			break;
		case "en":
			document.getElementById("lan").innerHTML="Language：";
			document.getElementById("server").innerHTML="JP Ver.";
			document.getElementById("MsgToEnd").innerHTML="Time to event over:";
			document.getElementById("MsgDays").innerHTML="days";
			document.getElementById("MsgET").innerHTML="Current event type:";
			document.getElementById("T1").innerHTML="Icon collection";
			document.getElementById("T2").innerHTML="Medley Festival";
			document.getElementById("T3").innerHTML="Challenge Festival";
			document.getElementById("T4").innerHTML="Adventure Scroll";
			document.getElementById("T5").innerHTML="Companion Match";
			document.getElementById("MsgMaxC").innerHTML="Max Combo：";
			document.getElementById("MsgBorderGuest").innerHTML="Border Predict";
			document.getElementById("Msg1").innerHTML="10000th：";
			document.getElementById("Msg2").innerHTML="30000th：";
			document.getElementById("Msg3").innerHTML="50000th：";
			document.getElementById("MsgCurrentUpdate").innerHTML="Last update：";
			document.getElementById("MsgSafe").innerHTML="Safety border (be sure above the border)";
			document.getElementById("MsgS1").innerHTML="10000th：";
			document.getElementById("MsgS2").innerHTML="30000th：";
			document.getElementById("MsgS3").innerHTML="50000th：";
			document.getElementById("MsgSafeTips").innerHTML="Safety border is dynamic.";
			break;
	}
}

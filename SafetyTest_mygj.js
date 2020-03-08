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
	var remainMin=Number(document.getElementById("_d").innerHTML)*24*60+Number(document.getElementById("_h").innerHTML)*60+Number(document.getElementById("_m").innerHTML);
	var NextBorderCurrentPt = Number(document.getElementById("NextBorderCurrentPt").value);
	var NextBorderGetPt = Number(document.getElementById("NextBorderGetPt").value);
	//计算基于如下假设：
	//1.该玩家下一局立即打出了fever
	//2.该玩家一个fever内能打8首歌
	//3.由于该玩家在冲档爆菊，因此假设为稳定打大师10星，全程2倍体力，因此不对体力、难度选择上作处理
	
	var oneSongTime = 2.85;
	var loopGet = NextBorderGetPt * (1.5 * 8 + 1 * 8);
	var loopTime = oneSongTime * (8 + 8);
	var loops = Math.floor(remainMin / loopTime);
	//打完周期后预计最后剩下的时间（不够一个loop），假设前期是fever
	var remainTime = remainMin - loops * loopTime;
	var result = NextBorderCurrentPt + loops * loopGet;
	if(remainTime < oneSongTime * 8){
		//最后一个fever没打完活动结束的情况
		result = result + NextBorderGetPt * 1.5 * Math.ceil(remainTime / oneSongTime);
	}
	else{
		result = result + NextBorderGetPt * (1.5 * 8 + Math.ceil(remainTime / oneSongTime) - 8);
	}
	document.getElementById("result").innerHTML = Math.ceil(result);
}

function fix(){
	document.getElementById("curRank").value=Number(document.getElementById("nextRank").innerHTML);
	change();
}
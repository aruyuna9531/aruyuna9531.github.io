function comboBonus(combo){
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
	case 1:return 1.13;
	case 2:return 1.1;
	case 3:return 1.13;
	case 4:return 1.21;
	default:return 1;
	}
}
function print(){
	var maxC = Number(document.getElementById("MaxCombo").value);
	var EType = document.getElementById("EventType").selectedIndex;
	var S1 = Number(document.getElementById("FirstBase").innerHTML);
	var S2 = Number(document.getElementById("SecondBase").innerHTML);
	var S3 = Number(document.getElementById("ThirdBase").innerHTML);
<<<<<<< HEAD
	var T1 = Number(document.getElementById("T1").innerHTML);
	var T2 = Number(document.getElementById("T2").innerHTML);
	var T3 = Number(document.getElementById("T3").innerHTML);
	document.getElementById("First").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S1);
	document.getElementById("Second").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S2);
	document.getElementById("Third").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*S3);
	document.getElementById("Tea1").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*T1);
	document.getElementById("Tea2").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*T2);
	document.getElementById("Tea3").innerHTML=Math.round(arrangeBits(EType)*comboBonus(maxC)*T3);
}
=======
	var are = arrangeBits(EType);
	var cbs = comboBonus(maxC);
	document.getElementById("First").innerHTML=Math.round(are*cbs*S1);
	document.getElementById("Second").innerHTML=Math.round(are*cbs*S2);
	document.getElementById("Third").innerHTML=Math.round(are*cbs*S3);
	document.getElementById("Tea1").innerHTML=Math.round(are*cbs*(S1+20));
	document.getElementById("Tea2").innerHTML=Math.round(are*cbs*(S2+18));
	document.getElementById("Tea3").innerHTML=Math.round(are*cbs*(S3+16));
}
>>>>>>> 5a9a8a1ec8afb750fd5a36dd82e6bd4c6861cfbd

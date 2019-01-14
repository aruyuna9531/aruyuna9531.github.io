function count(){
	var mysmpt=Number(document.getElementById("mySmpt").value);
	var r1smpt=Number(document.getElementById("rival1Smpt").value);
	var r2smpt=Number(document.getElementById("rival2Smpt").value);
	var r3smpt=Number(document.getElementById("rival3Smpt").value);
	var robots=0;
	if(document.getElementById("robot1").checked==true)robots++;
	if(document.getElementById("robot2").checked==true)robots++;
	if(document.getElementById("robot3").checked==true)robots++;
	document.getElementById("r1res").innerHTML=plm(Math.round((arr+getSmpt(mysmpt,1))*((4-robots)/4)>=3?(arr+getSmpt(mysmpt,1))*((4-robots)/4):3));
	document.getElementById("r2res").innerHTML=plm(Math.round((arr+getSmpt(mysmpt,2))*((4-robots)/4)));
	document.getElementById("r3res").innerHTML=plm(Math.round((arr+getSmpt(mysmpt,3))*((4-robots)/4)));
	document.getElementById("r4res").innerHTML=plm(Math.round((arr+getSmpt(mysmpt,4))*((4-robots)/4)));
}

function getSmpt(base, rank){
	switch(rank){
	case 1:
		if(base<=3000)return 1386;
		if(base>23500)return 80;
		if(base<=10000)return 1540-77*Math.floor(base/1000);
		return 770-77*Math.floor((base-10000)/1500);
	case 2:
		if(base<=3000)return 990;
		if(base>23500)return 60;
		if(base<=10000)return 1100-55*Math.floor(base/1000);
		return 550-55*Math.floor((base-10000)/1500);
	case 3:
		if(base<=3000)return 396;
		if(base>23500)return -60;
		if(base<=10000)return 450-27*Math.floor(base/1000);
		return 180-27*Math.floor((base-10000)/1500);
	case 4:
		if(base<=3000)return 198;
		if(base>23500)return -80;
		if(base<=10000)return 230-16*Math.floor(base/1000);
		return 70-16*Math.floor((base-10000)/1500);
	}
}

function plm(x){
	if(x>=0)return "+"+x;
	else return x;
}

brackets = [0, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11500, 13000, 14500, 16000, 17500, 19000, 20500, 22000, 23500, 100000];

function guessOriginSmpt(){
	//从html获得最终得分
	var grs=5;
	document.getElementById("andmore").innerHTML="";
	for(var g = 1; g<grs; g++){
		document.getElementById("1stChange_"+g).innerHTML="-";
		document.getElementById("2ndChange_"+g).innerHTML="-";
		document.getElementById("3rdChange_"+g).innerHTML="-";
		document.getElementById("4thChange_"+g).innerHTML="-";
	}
	var a = Number(document.getElementById("1stScore").value);
	var b = Number(document.getElementById("2ndScore").value);
	var c = Number(document.getElementById("3rdScore").value);
	var d = Number(document.getElementById("4thScore").value);
	//获得最终得分所在区间
	var aBra = getCurrentBracket(a);
	var bBra = getCurrentBracket(b);
	var cBra = getCurrentBracket(c);
	var dBra = getCurrentBracket(d);
	var printed = 0;
	for(var xBra = aBra-1;xBra<=aBra+1;xBra++){
		for(var yBra = bBra-1;yBra<=bBra+1;yBra++){
			for(var zBra = cBra-1;zBra<=cBra+1;zBra++){
				for(var wBra = dBra-1;wBra<=dBra+1;wBra++){
					//计算各位基础分
					var basic1 = getSmpt(brackets[xBra], 1);
					var basic2 = getSmpt(brackets[yBra], 2);
					var basic3 = getSmpt(brackets[zBra], 3);
					var basic4 = getSmpt(brackets[wBra], 4);
					//排位基础分
					var posBasic = Math.round((a+b+c+d-basic1-basic2-basic3-basic4)/160);
					//计算原得分
					var origin1=0,origin2=0,origin3=0,origin4=0;
					origin1 = Math.ceil(40*(a - posBasic - basic1)/39);
					if(a-origin1<3){
						origin1=a-3;		//第一名至少+3
						origin2=origin1-Math.floor(40*(a-b-basic1+basic2)/39);
						origin3=origin1-Math.floor(40*(a-c-basic1+basic3)/39);
						origin4=origin1-Math.floor(40*(a-d-basic1+basic4)/39);
					}
					else{
						origin2 = Math.ceil(40*(b - posBasic - basic2)/39);
						origin3 = Math.ceil(40*(c - posBasic - basic3)/39);
						origin4 = Math.ceil(40*(d - posBasic - basic4)/39);
					}
					if(xBra==getCurrentBracket(origin1) && yBra==getCurrentBracket(origin2) && zBra==getCurrentBracket(origin3) && wBra==getCurrentBracket(origin4)){
						if(printed>=5){
							document.getElementById("andmore").innerHTML="还有其他组合，不再一一列举";
							return;
						}
						document.getElementById("1stChange_"+printed).innerHTML=plm(a-origin1);
						document.getElementById("2ndChange_"+printed).innerHTML=plm(b-origin2);
						document.getElementById("3rdChange_"+printed).innerHTML=plm(c-origin3);
						document.getElementById("4thChange_"+printed).innerHTML=plm(d-origin4);
						printed++;
					}
				}
			}
		}
	}
}

function getCurrentBracket(smpt){
	for(var i=0;i<brackets.length-1;i++){
		if(brackets[i]<=smpt && brackets[i+1]>smpt)return i;
	}
}

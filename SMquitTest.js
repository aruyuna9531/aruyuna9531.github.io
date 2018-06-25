function count(){
	var mysmpt=Number(document.getElementById("mySmpt").value);
	var r1smpt=Number(document.getElementById("rival1Smpt").value);
	var r2smpt=Number(document.getElementById("rival2Smpt").value);
	var r3smpt=Number(document.getElementById("rival3Smpt").value);
	var robots=0;
	if(document.getElementById("robot1").checked==true)robots++;
	if(document.getElementById("robot2").checked==true)robots++;
	if(document.getElementById("robot3").checked==true)robots++;
	var arr=Math.round((r1smpt+r2smpt+r3smpt-3*mysmpt)/160);
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

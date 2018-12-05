function countTime(counter){
	var date=new Date();
	for(var i=1;i<=counter;i++){
		var sta_s="cmp"+String(i)+"_start";
		var end_s="cmp"+String(i)+"_end";
		var rmt_s="cmp"+String(i)+"_remain";
		var startAt=new Date(String(document.getElementById(sta_s).innerHTML));
		var endAt=new Date(String(document.getElementById(end_s).innerHTML));
		var d=0,h=0,m=0,s=0,mms=0;
		if(date.getTime()<startAt.getTime()-3600000){
			mms=endAt.getTime()-startAt.getTime();
		}
		else{
			mms=endAt.getTime()-3600000-date.getTime();
		}
		d=Math.floor(mms/1000/24/60/60);
		h=Math.floor(mms/1000/60/60%24);
		m=Math.floor(mms/1000/60%60);
		s=Math.floor(mms/1000%60);
		document.getElementById(rmt_s).innerHTML=d+"天 "+h+":"+front0(m)+":"+front0(s);
	}
}

function front0(x){
	if(x<10)return "0"+x;
	else return x;
}

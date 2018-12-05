var cList_counter=0;

function countTime(counter){
	if(cList_counter==0)cList_counter=counter;
	var date=new Date();
	for(var i=1;i<=cList_counter;i++){
		var sta_s="cmp"+String(i)+"_start";
		var end_s="cmp"+String(i)+"_end";
		var stu_s="cmp"+String(i)+"_status";
		var rmt_s="cmp"+String(i)+"_remain";
		var startAt=new Date(String(document.getElementById(sta_s).innerHTML));
		var endAt=new Date(String(document.getElementById(end_s).innerHTML));
		var d=0,h=0,m=0,s=0,mms=0;
		if(date.getTime()<startAt.getTime()-3600000){
			mms=endAt.getTime()-startAt.getTime();
			document.getElementById(stu_s).innerHTML="未开始";
		}
		else if(date.getTime()<endAt.getTime()-3600000){
			mms=endAt.getTime()-3600000-date.getTime();
			if(mms>2*24*60*60)document.getElementById(stu_s).innerHTML="进行中";
			else {
				document.getElementById(stu_s).innerHTML="即将结束";
				warn(rmt_s);
				warn(stu_s);
			}
		}
		else{
			mms=0;
			document.getElementById(stu_s).innerHTML="已结束";
			warn(stu_s);
			
		}
		d=Math.floor(mms/1000/24/60/60);
		h=Math.floor(mms/1000/60/60%24);
		m=Math.floor(mms/1000/60%60);
		s=Math.floor(mms/1000%60);
		document.getElementById(rmt_s).innerHTML=d+"天 "+h+":"+front0(m)+":"+front0(s);
	}
	setInterval(countTime, 1000);
}

function front0(x){
	if(x<10)return "0"+x;
	else return x;
}


function warn(obj){
	document.getElementById(obj).style.color="red";
	document.getElementById(obj).style.fontWeight="Bold";
}

function TokyoTime(){
	var d=new Date();
	var localTime = d.getTime(); 
	var localOffset=d.getTimezoneOffset()*60000;
	var utc = localTime + localOffset;
	var offset =9;
	var gtm= utc + (3600000*offset); 
	var u = navigator.userAgent;
	var nd = new Date(gtm); 
	return nd;
}
function calendar(){
	var date = TokyoTime();
	var endDate = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var monthminus = endDate.getMonth()-date.getMonth();
	var daycounter = 0;
	if(endDate.getFullYear()-date.getFullYear()==1)monthminus+=12;
	if(endDate.getDate()>date.getDate()){
		if(date.getDate()<5 && endDate.getDate()>=5)daycounter++;
		if(date.getDate()<10 && endDate.getDate()>=10)daycounter++;
		if(date.getDate()<15 && endDate.getDate()>=15)daycounter++;
		if(date.getDate()<20 && endDate.getDate()>=20)daycounter++;
		if(date.getDate()<25 && endDate.getDate()>=25)daycounter++;
		if(date.getDate()<getCountDays() && endDate.getDate()>=getCountDays())daycounter++;
	}
	else
	{
		if(date.getDate()>=5 && endDate.getDate()<5)daycounter--;
		if(date.getDate()>=10 && endDate.getDate()<10)daycounter--;
		if(date.getDate()>=15 && endDate.getDate()<15)daycounter--;
		if(date.getDate()>=20 && endDate.getDate()<20)daycounter--;
		if(date.getDate()>=25 && endDate.getDate()<25)daycounter--;
		if(date.getDate()>=getCountDays() && getCountDays())daycounter--;
	}
	document.getElementById("loginCalendar").innerHTML = monthminus * 12 + daycounter * 2;
}
function dailyloveca(){
	var currentDate = TokyoTime();
	var endDate = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var now = currentDate.getTime();
	var end = endDate.getTime();
	var left = end-now;
	var leftDays = Math.floor(left/1000/60/60/24);
	document.getElementById("daily").innerHTML = leftDays;
}
function datecompare(d1, d2){
	var d1 = new Date(d1);  
	var d2=new Date(d2);  
	if(d1>=d2)return true;
	else return false;
}
function otherbirth(value){
	var names = ["dia", "hanayo", "kanan", "hanamaru", "umi", "you", "maki", "nozomi", "mari", "yoshiko", "nico", "chika", "honoka", "kotori", "riko", "ruby", "eli", "rin"];
	
	var now = daystobirth(value,false);
	var endDate = TokyoTime();
	var counter = 0;
	for(var i=0;i<names.length;i++){
		if(datecompare(daystobirth(names[i],false),now)==false)counter++;
	}
	return counter;
}
function otherMuseBirth(value){
	var names = ["hanayo", "umi", "maki", "nozomi", "nico", "honoka", "kotori", "eli", "rin"];
	var now = daystobirth(value,false);
	var endDate = TokyoTime();
	var counter = 0;
	for(var i=0;i<names.length;i++){
		if(datecompare(daystobirth(names[i],false),now)==false)counter++;
	}
	return counter;
}
function otherAqoursBirth(value){
	var names = ["dia", "kanan", "hanamaru", "you",  "mari", "yoshiko", "chika", "riko", "ruby"];
	var now = daystobirth(value,false);
	var endDate = TokyoTime();
	var counter = 0;
	for(var i=0;i<names.length;i++){
		if(datecompare(daystobirth(names[i],false),now)==false)counter++;
	}
	return counter;
}
function otherMemberLoveca(value){
	document.getElementById("othersbirth").innerHTML = otherbirth(value)*5;
}
function daystobirth(value, fromHTML){
	var date=TokyoTime();
	var year=date.getFullYear();
	var month=0;
	var day=0;
	switch(value)
	{
	case "honoka": month=8; day=3; break;
	case "eli": month=10; day=21; break;
	case "kotori": month=9; day=12; break;
	case "umi": month=3; day=15; break;
	case "rin": month=11; day=1; break;
	case "maki": month=4; day=19; break;
	case "nozomi": month=6; day=9; break;
	case "hanayo": month=1; day=17; break;
	case "nico": month=7; day=22; break;
	case "chika": month=8; day=1; break;
	case "riko": month=9; day=19; break;
	case "kanan": month=2; day=10; break;
	case "dia": month=1; day=1; break;
	case "you": month=4; day=17; break;
	case "yoshiko": month=7; day=13; break;
	case "hanamaru": month=3; day=4; break;
	case "mari": month=6; day=13; break;
	case "ruby": month=9; day=21; break;
	default: break;
	}
	if(month<date.getMonth()+1)year++;
	if(month==date.getMonth()+1 && day<date.getDate())year++;
	if(fromHTML==true){
	document.getElementById("birth").innerHTML = year+"-"+month+"-"+day;
	dailyloveca();
	eventCount(document.getElementById("eventset").value);
	TicketEventget(document.getElementById("eventTicket").value);
	MuseBirthGacha(document.getElementById("OtherStepUpMuse").value);
	AqoursBirthGacha(document.getElementById("OtherStepUpAqours").value);
	}
	else return year+"/"+month+"/"+day;
}
function eventCount(strategy){
	var events=EventTimes();
	switch(strategy)
	{
	case "normal": document.getElementById("eventloveca").innerHTML = events*9; break;
	case "pt11w": document.getElementById("eventloveca").innerHTML = events*4; break;
	case "pt13w": document.getElementById("eventloveca").innerHTML = events*-1; break;
	default: document.getElementById("eventloveca").innerHTML = 0; break;
	}
}
function newex(){
	var date = TokyoTime();
	var endDate = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var monthminus = endDate.getMonth()-date.getMonth();
	var daycounter = 0;
	if(endDate.getFullYear()-date.getFullYear()==1)monthminus+=12;
	if(endDate.getDate()>date.getDate()){
		if(date.getDate()<15 && endDate.getDate()>=15)daycounter++;
		if(date.getDate()<getCountDays() && endDate.getDate()>=getCountDays())daycounter++;
	}
	else
	{
		if(date.getDate()>=15 && endDate.getDate()<15)daycounter--;
		if(date.getDate()>=getCountDays() && getCountDays())daycounter--;
	}
	document.getElementById("newexpert").innerHTML = (monthminus * 2 + daycounter) * document.getElementById("lovecaperex").value;
}
 
function getCountDays() {
       var curDate = TokyoTime();
       var curMonth = curDate.getMonth();
       curDate.setMonth(curMonth + 1);
       curDate.setDate(0);
       return curDate.getDate();
}
function newma(){
	var date = TokyoTime();
	var endDate = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var monthminus = endDate.getMonth()-date.getMonth();
	var daycounter = 0;
	if(endDate.getFullYear()-date.getFullYear()==1)monthminus+=12;
	if(endDate.getDate()>date.getDate()){
		if(date.getDate()<1 && endDate.getDate()>=1)daycounter++;
		if(date.getDate()<6 && endDate.getDate()>=6)daycounter++;
		if(date.getDate()<16 && endDate.getDate()>=16)daycounter++;
		if(date.getDate()<21 && endDate.getDate()>=21)daycounter++;
	}
	else
	{
		if(date.getDate()>=1 && endDate.getDate()<1)daycounter--;
		if(date.getDate()>=6 && endDate.getDate()<6)daycounter--;
		if(date.getDate()>=16 && endDate.getDate()<16)daycounter--;
		if(date.getDate()>=21 && endDate.getDate()<21)daycounter--;
	}
	document.getElementById("newmaster").innerHTML = document.getElementById("lovecaperma").value * (monthminus * 4 + daycounter);
}
function predictloginbonus(){
	var prediction = Math.floor(Number(document.getElementById("daily").innerHTML)*0.5);
	document.getElementById("loginbonus").value = prediction;
}
function printToday(){
	var date=TokyoTime();
	document.getElementById("today").innerHTML = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+front0(date.getMinutes())+":"+front0(date.getSeconds());
	birthdayInProcess();
	setTimeout(printToday,1000);
}
function front0(ms){
	if(ms<=9)return "0"+ms;
	else return ms;
}
function sum(){
	var currentlove = Number(document.getElementById("current").value);
	var predictlove = Number(document.getElementById("loveca").innerHTML);
	var MuseSingle = Number(document.getElementById("MuseTotalLoveca").innerHTML);
	var AqoursSingle = Number(document.getElementById("AqoursTotalLoveca").innerHTML);
	document.getElementById("totalloveca").innerHTML = currentlove + predictlove - MuseSingle - AqoursSingle;
}
function total(){
	var dailylove = Number(document.getElementById("daily").innerHTML);
	var birthlove = Number(document.getElementById("othersbirth").innerHTML);
	var exlove = Number(document.getElementById("newexpert").innerHTML);
	var malove = Number(document.getElementById("newmaster").innerHTML);
	var eventlove = Number(document.getElementById("eventloveca").innerHTML);
	var callove = Number(document.getElementById("loginCalendar").innerHTML);
	var bonuslove = Number(document.getElementById("loginbonus").value);
	document.getElementById("loveca").innerHTML=dailylove+birthlove+exlove+malove+callove+bonuslove+eventlove;
}
function EventTimes(){
	var currentMonthEvents = 0;
	var finalMonthEvents = 0;
	var mediumEvents = 0;
	var date = TokyoTime();
	var end = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	if(date.getDate()<=5)currentMonthEvents=2;
	else if(date.getDate()<=20)currentMonthEvents=1;
	else currentMonthEvents=0;
	if(end.getDate()>15)finalMonthEvents=1;
	else finalMonthEvents=0;
	var mediummonth = end.getMonth()-date.getMonth()-1;
	if(mediummonth<0 && date.getFullYear()<end.getFullYear()) mediummonth+=12;
	mediumEvents = 2 * mediummonth;
	var events = currentMonthEvents + finalMonthEvents + mediumEvents;
	return events>=0?events:0;
}
function TicketEventget(strategy){
	var events = EventTimes();
	switch(strategy)
	{
	case "third": document.getElementById("eventTicketSum").innerHTML = events*0; break;
	case "second": document.getElementById("eventTicketSum").innerHTML = events*1; break;
	case "shisanwan": document.getElementById("eventTicketSum").innerHTML = events*3; break;
	case "first": document.getElementById("eventTicketSum").innerHTML = events*4; break;
	default: document.getElementById("eventTicketSum").innerHTML = 0; break;
	}
}
function TicketEventBonus(){
	var events = EventTimes();
	var mf = Math.floor(events/8);
	var cf = Math.floor(events/6);
	var nm = Math.floor(events/4);
	var mfEv = Number(document.getElementById("mfTEv").value);
	var cfEv = Number(document.getElementById("cfTEv").value);
	var nmEv = Number(document.getElementById("nmTEv").value);
	document.getElementById("mfTicket").innerHTML = mf * mfEv;
	document.getElementById("cfTicket").innerHTML = cf * cfEv;
	document.getElementById("nmTicket").innerHTML = nm * nmEv;
}
function totalTicketSum(){
	var current = Number(document.getElementById("currentTicket").value);
	var event = Number(document.getElementById("eventTicketSum").innerHTML);
	var mf = Number(document.getElementById("mfTicket").innerHTML);
	var cf = Number(document.getElementById("cfTicket").innerHTML);
	var nm = Number(document.getElementById("nmTicket").innerHTML);
	var lb = Number(document.getElementById("loginbonusTicket").value);
	document.getElementById("totalTicket").innerHTML=current+event+mf+cf+nm+lb;
}
function MuseBirthGacha(strategy){
	var other = otherMuseBirth(document.getElementById("member").value);
	switch(strategy){
	case "0": document.getElementById("MuseTotalLoveca").innerHTML = 0 * other; break;
	case "30": document.getElementById("MuseTotalLoveca").innerHTML = 30 * other; break;
	case "80": document.getElementById("MuseTotalLoveca").innerHTML = 80 * other; break;
	}
}
function AqoursBirthGacha(strategy){
	var other = otherAqoursBirth(document.getElementById("member").value);
	switch(strategy){
	case "0": document.getElementById("AqoursTotalLoveca").innerHTML = 0 * other; break;
	case "30": document.getElementById("AqoursTotalLoveca").innerHTML = 30 * other; break;
	case "120": document.getElementById("AqoursTotalLoveca").innerHTML = 120 * other; break;
	}
}
function MuseMemberGachaMax(){
	var this80=0;
	if(document.getElementById("this80").value=="yes")this80=1;
	var tmp=document.getElementById("NumazuKanshasai");
	var Loveca = Number(document.getElementById("totalloveca").innerHTML)-80*this80-(tmp==null?0:Number(tmp.value));
	var Ticket = Number(document.getElementById("totalTicket").innerHTML);
	var Chain_11 = Math.floor(Loveca/50);
	var single = Math.floor((Loveca-Chain_11*50)/5);
	if(document.getElementById("member").selectedIndex<10){
	var res = Chain_11*11+single+Ticket+Number(document.getElementById("current3Ticket").value)*3+Number(document.getElementById("current11Ticket").value)*11+Number(document.getElementById("Buy11Ticket").value)*11; 
	document.getElementById("MuseMemberResult").innerHTML=res;
	var cards = Number(document.getElementById("NeedCard").value);
	document.getElementById("card1").innerHTML=(calcPerc(res,cards)*100).toFixed(2)+"%";
	}
	else document.getElementById("MuseMemberResult").innerHTML = ""; 
}
function calcPerc(res,cards){
	if(res>=cards*200)return 1;
	else return Math.pow(res/(200*cards),cards);
}
function otherBirth(){
	var other1 = otherMuseBirth(document.getElementById("member").value);
	var other2 = otherAqoursBirth(document.getElementById("member").value);
	document.getElementById("memberBirth").innerHTML=(other1+other2);
	var monthEnd = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var monthNow = TokyoTime();
	document.getElementById("months").innerHTML=monthEnd.getMonth()-monthNow.getMonth();
	document.getElementById("randomPack").innerHTML=Math.round((monthEnd.getMonth()-monthNow.getMonth())/2);
}


function birthdayInProcess(){
	var currentMonth = TokyoTime().getMonth()+1;
	var currentDay = TokyoTime().getDate();
	var dayShift=0;
	if(currentMonth>1)dayShift+=31;
	if(currentMonth>2)dayShift+=28;
	if(currentMonth>3)dayShift+=31;
	if(currentMonth>4)dayShift+=30;
	if(currentMonth>5)dayShift+=31;
	if(currentMonth>6)dayShift+=30;
	if(currentMonth>7)dayShift+=31;
	if(currentMonth>8)dayShift+=31;
	if(currentMonth>9)dayShift+=30;
	if(currentMonth>10)dayShift+=31;
	if(currentMonth>11)dayShift+=30;
	dayShift+=currentDay;

	if(dayShift==365 || dayShift<=2)showMsg("Dia", 1);
	else showMsg("Dia", 2);
	dateCond(dayShift, 16, "Hanayo");
	dateCond(dayShift, 40, "Kanan");
	dateCond(dayShift, 62, "Hanamaru");
	dateCond(dayShift, 73, "Umi");
	dateCond(dayShift, 106, "You");
	dateCond(dayShift, 108, "Maki");
	dateCond(dayShift, 159, "Nozomi");
	dateCond(dayShift, 163, "Mari");
	dateCond(dayShift, 193, "Yoshiko");
	dateCond(dayShift, 202, "Nico");
	dateCond(dayShift, 212, "Chika");
	dateCond(dayShift, 214, "Honoka");
	dateCond(dayShift, 254, "Kotori");
	dateCond(dayShift, 261, "Riko");
	dateCond(dayShift, 293, "Eli");
	dateCond(dayShift, 304, "Rin");
}

function dateCond(dayShift, start, character){
	if(dayShift>=start && dayShift<=start+2)showMsg(character, 1);
	else showMsg(character, 2);
}

function showMsg(character, showOrHide){
	var str = "birthdayProcessing_"+character;
	var show = "none"
	if(showOrHide==1)show = "inline"
	document.getElementById(str).style.display=show;
}
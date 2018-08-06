//��������������������������������������������������ȡ����ʱ�䡪��������������������������������������
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
//������������������������������������������½����������ÿ��5�ı������ܻ��2�ģ�����������������������������
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
//��������������������������������������������ÿ��1�Ľ�������������������������������������������
function dailyloveca(){
	var currentDate = TokyoTime();
	var endDate = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var now = currentDate.getTime();
	var end = endDate.getTime();
	var left = end-now;
	var leftDays = Math.floor(left/1000/60/60/24);
	document.getElementById("daily").innerHTML = leftDays;
}
//���������������������������������������������Ƚ��������ڣ�d1��d2֮�󷵻�true�����򷵻�false������������������������������
function datecompare(d1, d2){
	var d1 = new Date(d1);  
	var d2=new Date(d2);  
	if(d1>=d2)return true;
	else return false;
}
//����������������������������������������������Ա����5�Ľ���������������������������������������������������������������
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
function otherMemberLoveca(value){
	document.getElementById("othersbirth").innerHTML = otherbirth(value)*5+5;
}
//��������������������������������������������������'s��Ա�ж�����Ŀ���Ա֮ǰ������Step up�鿨���ԣ���������������������
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
//������������������������������������������������Aqours��Ա�ж�����Ŀ���Ա֮ǰ������Step up�鿨���ԣ���������������������
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
//����������������������������������������������һ��[value]��Ա���յ�ʱ�䣨��������ȥ��д���꣩��������������������������
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
//������������������������������������������������Ĳ��ԡ���������������������������������������
function eventCount(strategy){
	var events=EventTimes();
	switch(strategy)
	{
	case "normal": document.getElementById("eventloveca").innerHTML = events*9; break;
	case "pt11w": document.getElementById("eventloveca").innerHTML = events*4; break;
	case "pt13w": document.getElementById("eventloveca").innerHTML = events*-1; break;
	case "pt16w": document.getElementById("eventloveca").innerHTML = events*-7; break;
	default: document.getElementById("eventloveca").innerHTML = 0; break;
	}
}
//����������������������������������������������ex��ma���ġ�������������������������������������������
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
//�������������������������������㵱���ж����졪����������������������
function getCountDays() {
       var curDate = TokyoTime();
       var curMonth = curDate.getMonth();
       curDate.setMonth(curMonth + 1);
       curDate.setDate(0);
       return curDate.getDate();
}
//����������������������������������¼������������������������������������
function predictloginbonus(){
	var prediction = Math.floor(Number(document.getElementById("daily").innerHTML)*0.7);
	document.getElementById("loginbonus").value = prediction;
}
//������������������������������ӡ���ڵ�ʱ�䡪����������������������������������
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
//����������������������������ͳ�ƽ����ͨ������������������������������������
function sum(){
	var currentlove = Number(document.getElementById("current").value);
	var predictlove = Number(document.getElementById("loveca").innerHTML);
	var MuseSingle = Number(document.getElementById("MuseTotalLoveca").innerHTML);
	var AqoursSingle = Number(document.getElementById("AqoursTotalLoveca").innerHTML);
	document.getElementById("totalloveca").innerHTML = currentlove + predictlove - MuseSingle - AqoursSingle;
}
//����������������������������ͳ�Ƶ�������������������������������������������
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
//�����������������������������������㵽����Ϊֹ�м��λ��������������������������������
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
//�����������������������������������ȯ����������������������������������
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
//��������������������������������mf��cf��Э����ȯ��������������������������
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
//��������������������������������ͳ�Ƶ��տ���ȯ����������������������������
function totalTicketSum(){
	var current = Number(document.getElementById("currentTicket").value);
	var event = Number(document.getElementById("eventTicketSum").innerHTML);
	var mf = Number(document.getElementById("mfTicket").innerHTML);
	var cf = Number(document.getElementById("cfTicket").innerHTML);
	var nm = Number(document.getElementById("nmTicket").innerHTML);
	var lb = Number(document.getElementById("loginbonusTicket").value);
	document.getElementById("totalTicket").innerHTML=current+event+mf+cf+nm+lb;
}
//������������������������������������ɳ�Box����������������������������������
function MuseMemberGachaMax(){
	var this80=0;
	if(document.getElementById("this80").value=="yes")this80=1;
	var tmp=document.getElementById("ManatsuStepup");
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
//�����������������������������ܳ鵽���տ��ĸ��ʡ���������������������������
function calcPerc(res,cards){
	if(res>=cards*200)return 1;
	else return Math.pow(res/(200*cards),cards);
}
//������������������������������ʾ�ɹ��������������������������������������������
function otherBirths(){
	var other1 = otherMuseBirth(document.getElementById("member").value);
	var other2 = otherAqoursBirth(document.getElementById("member").value);
	document.getElementById("memberBirth").innerHTML=(other1+other2);
	var monthEnd = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var monthNow = TokyoTime();
	document.getElementById("months").innerHTML=monthEnd.getMonth()-monthNow.getMonth();
	document.getElementById("randomPack").innerHTML=Math.round((monthEnd.getMonth()-monthNow.getMonth())/2);
}

//��������������������������������������������������ǰ������ƫ�ơ�������������������������������
function dayShift(){
	var currentMonth = TokyoTime().getMonth()+1;
	var currentDay = TokyoTime().getDate();
	var ds=0;
	if(currentMonth>1)ds+=31;
	if(currentMonth>2)ds+=28;
	if(currentMonth>3)ds+=31;
	if(currentMonth>4)ds+=30;
	if(currentMonth>5)ds+=31;
	if(currentMonth>6)ds+=30;
	if(currentMonth>7)ds+=31;
	if(currentMonth>8)ds+=31;
	if(currentMonth>9)ds+=30;
	if(currentMonth>10)ds+=31;
	if(currentMonth>11)ds+=30;
	ds+=currentDay;
	return ds;
}

//���������������������������������е����յ����޶�������������������������������������
function birthdayInProcess(){
	var ds = dayShift();
	//showMsg_old(ds);
	showMsg_new(ds);
}

function showMsg_new(ds){
	var p=birthday_Hash();
	if(p[ds]==0)return;
	showMsg("Honoka", p[ds] & 0x01000000);
	showMsg("Eli", p[ds] & 0x00800000);
	showMsg("Kotori", p[ds] & 0x00400000);
	showMsg("Umi", p[ds] & 0x00200000);
	showMsg("Rin", p[ds] & 0x00100000);
	showMsg("Maki", p[ds] & 0x00080000);
	showMsg("Nozomi", p[ds] & 0x00040000);
	showMsg("Hanayo", p[ds] & 0x00020000);
	showMsg("Nico", p[ds] & 0x00010000);
	showMsg("Chika", p[ds] & 0x0100);
	showMsg("Riko", p[ds] & 0x0080);
	showMsg("Kanan", p[ds] & 0x0040);
	showMsg("Dia", p[ds] & 0x0020);
	showMsg("You", p[ds] & 0x0010);
	showMsg("Yoshiko", p[ds] & 0x0008);
	showMsg("Hanamaru", p[ds] & 0x0004);
	showMsg("Mari", p[ds] & 0x0002);
	showMsg("Ruby", p[ds] & 0x0001);
}

function showMsg_old(ds){
	if(ds==365 || ds<=2)showMsg("Dia", 1);
	else showMsg("Dia", 0);
	dateCond(ds, 16, "Hanayo");
	dateCond(ds, 40, "Kanan");
	dateCond(ds, 62, "Hanamaru");
	dateCond(ds, 73, "Umi");
	dateCond(ds, 106, "You");
	dateCond(ds, 108, "Maki");
	dateCond(ds, 159, "Nozomi");
	dateCond(ds, 163, "Mari");
	dateCond(ds, 193, "Yoshiko");
	dateCond(ds, 202, "Nico");
	dateCond(ds, 212, "Chika");
	dateCond(ds, 214, "Honoka");
	dateCond(ds, 254, "Kotori");
	dateCond(ds, 261, "Riko");
	dateCond(ds, 263, "Ruby");
	dateCond(ds, 293, "Eli");
	dateCond(ds, 304, "Rin");
}
function showMsg(character, showOrHide){
	var str = "birthdayProcessing_"+character;
	var show = "none"
	if(showOrHide!=0)show = "inline"
	document.getElementById(str).style.display=show;
}
function dateCond(ds, start, character){
	if(ds>=start && ds<=start+2)showMsg(character, 1);
	else showMsg(character, 0);
}

//����������������������������������ԭ����'s��Ա���ճ鿨���ԡ�����������������������
function MuseBirthGacha(strategy){
	var other = otherMuseBirth(document.getElementById("member").value);
	switch(strategy){
	case "0": document.getElementById("MuseTotalLoveca").innerHTML = 0 * other; break;
	case "30": document.getElementById("MuseTotalLoveca").innerHTML = 30 * other; break;
	case "80": document.getElementById("MuseTotalLoveca").innerHTML = 80 * other; break;
	}
}
//����������������������������������ԭ��Aqours��Ա���ճ鿨���ԡ�����������������������
function AqoursBirthGacha(strategy){
	var other = otherAqoursBirth(document.getElementById("member").value);
	switch(strategy){
	case "0": document.getElementById("AqoursTotalLoveca").innerHTML = 0 * other; break;
	case "30": document.getElementById("AqoursTotalLoveca").innerHTML = 30 * other; break;
	case "120": document.getElementById("AqoursTotalLoveca").innerHTML = 120 * other; break;
	}
}
//�����������������������������������£���'s��Aqours��Ա���ճ鿨���ԡ��ع����֣����á�������������������������
//���յ��޷ֲ���ϣ��ÿһ������λ����һ����ɫ��step up�Ƿ�����У�Ϊ1���ǣ�Ϊ0��񣨶���Ϊ����'s��Ա�ӹ�����ռ��8-16λ��Aqours��Ա��ǧ��¶ռ��24-32λ����
function birthday_Hash(){
	var b=new Array(365);
	for(var i=0;i<365;i++)b[i]=0;
	b = fillHash("Honoka", 214, b);
	b = fillHash("Eli", 293, b);
	b = fillHash("Kotori", 254, b);
	b = fillHash("Umi", 73, b);
	b = fillHash("Rin", 304, b);
	b = fillHash("Maki", 108, b);
	b = fillHash("Nozomi", 159, b);
	b = fillHash("Hanayo", 16, b);
	b = fillHash("Nico", 202, b);
	b = fillHash("Chika", 212, b);
	b = fillHash("Riko", 261, b);
	b = fillHash("Kanan", 40, b);
	b = fillHash("Dia", 0, b);
	b = fillHash("You", 106, b);
	b = fillHash("Yoshiko", 193, b);
	b = fillHash("Hanamaru", 62, b);
	b = fillHash("Mari", 163, b);
	b = fillHash("Ruby", 263, b);
	return b;
}
function fillHash(character, start, hashList){
	var fillVal=0;
	switch(character){
	case "Honoka": fillVal=0x01000000; break;
	case "Eli": fillVal=0x00800000; break;
	case "Kotori": fillVal=0x00400000; break;
	case "Umi": fillVal=0x00200000; break;
	case "Rin": fillVal=0x00100000; break;
	case "Maki": fillVal=0x00080000; break;
	case "Nozomi": fillVal=0x00040000; break;
	case "Hanayo": fillVal=0x00020000; break;
	case "Nico": fillVal=0x00010000; break;
	case "Chika": fillVal=0x0100; break;
	case "Riko": fillVal=0x0080; break;
	case "Kanan": fillVal=0x0040; break;
	case "Dia": fillVal=0x0020; break;
	case "You": fillVal=0x0010; break;
	case "Yoshiko": fillVal=0x0008; break;
	case "Hanamaru": fillVal=0x0004; break;
	case "Mari": fillVal=0x0002; break;
	case "Ruby": fillVal=0x0001; break;
	}
	hashList[(start)%365]+=fillVal;
	hashList[(start+1)%365]+=fillVal;
	hashList[(start+2)%365]+=fillVal;
	return hashList;
}
//������������������������Ŀ��ǰ���ж��ٸ��˵����գ����������ڽ����еģ��ѵ㣩����������������������������
//˼·����ù�ϣ���Ȼ�ȡ����Ĺ�ϣֵ
//��Ŀǰ��3�ֿ��ܣ�
//1)û���˵��޶������У�Ϊ0��
//2)1�����޶������У���1λΪ1������Ϊ0��
//3)2�����޶�ͬʱ�����У�2λΪ1��������������3�����ڣ�4��18�գ�8��2�գ�9��20�ա���

//1)Ϊ0������ֱ������ɨ��ɨ������0�������������һ���˵������޶���Χ�ڣ�����3�������Ǹ÷�0������4����ʼ�ָ�Ϊ0������������������ʱ���Լ���1�ˡ�
//���ţ����������ڵ���0x10000Ϊ��'s��Ա����֮ΪAqours��Ա
//2,3��1λ��2λΪ0����ʱ����ֱ��ɨ�����������ӣ�
//������Ĺ�ϣֵ��λȡ��������8��2�չ�ϣΪ0x01000100��ȡ����Ϊ0xFEFFFEFF��Ȼ��ȡ������֮��ɨ��������λ�롣
//��ô����step up�����е���Щ��Ա����λ�ڰ�λ����Ϊ0���������ڽ�������еĳ�Ա����λ���Ϊԭ��ֵ��������0��������+1

//�������1/2�����յ�2����Ա�Ĵ���Ŀǰֻ�и�2�죩����ʱ������5��Step up���У���1-3��Ϊ��ɫ1����3-5��Ϊ��ɫ2����������й�ϣ��ȡ��3��ֵ
//�������һ����0�������Ӹ���ͷ��ͬʱ��¼�����ϣֵ����ʱ�������ϸ�����ʹ�øý�ɫ��ռ�ã������ټ��㣩��֮��ͱ�ɨ������λ��ʱ��Ҫһ��ȡ��
//����Ҫ������ޣ�10��21�գ�ɨ��9��11�������������ϣֵΪ0x00400000��

//��Եֵ��Ŀ��������ڽ����еĽ�ɫ����ʱȡֵΪ0

//����г�Ա������ͬ����3��Ĺ�ϣֵ����2λ��1����ʱ��Ա����Ӧ��+2����Ŀǰû�г�Ա������ͬ�������Ǹ������������ʱ���޸�
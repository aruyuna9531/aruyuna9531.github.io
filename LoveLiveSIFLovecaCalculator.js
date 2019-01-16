//————————————————————————获取东京时间————————————————————
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
//————————————————————登陆日历奖励（每到5的倍数日能获得2心）——————————————
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
//——————————————————————每日1心奖励————————————————————
function dailyloveca(){
	var currentDate = TokyoTime();
	var endDate = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var now = currentDate.getTime();
	var end = endDate.getTime();
	var left = end-now;
	var leftDays = Math.floor(left/1000/60/60/24);
	document.getElementById("daily").innerHTML = leftDays;
}
//——————————————————————比较两个日期（d1在d2之后返回true，否则返回false）——————————————
function datecompare(d1, d2){
	var d1 = new Date(d1);  
	var d2=new Date(d2);  
	if(d1>=d2)return true;
	else return false;
}
//——————————————————————成员生日5心奖励——————————————————————————————
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
//——————————————————————其他μ's成员有多少在目标成员之前（生日Step up抽卡策略）——————————
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
//——————————————————————其他Aqours成员有多少在目标成员之前（生日Step up抽卡策略）——————————
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
//——————————————————————下一次[value]成员生日的时间（如果今年过去了写明年）—————————————
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
//——————————————————————活动攒心策略————————————————————
function eventCount(strategy){
	var events=EventTimes();
	switch(strategy)
	{
	case "normal": document.getElementById("eventloveca").innerHTML = events*9; break;
	case "pt11w": document.getElementById("eventloveca").innerHTML = events*1; break;
	case "pt13w": document.getElementById("eventloveca").innerHTML = events*-4; break;
	case "pt16w": document.getElementById("eventloveca").innerHTML = events*-7; break;
	default: document.getElementById("eventloveca").innerHTML = 0; break;
	}
}
//——————————————————————新ex、ma攒心——————————————————————
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
//——————————————计算当月有多少天————————————
function getCountDays() {
       var curDate = TokyoTime();
       var curMonth = curDate.getMonth();
       curDate.setMonth(curMonth + 1);
       curDate.setDate(0);
       return curDate.getDate();
}
//——————————————活动随机登录奖励————————————————
function predictloginbonus(){
	var prediction = Math.floor(Number(document.getElementById("daily").innerHTML)*1);
	document.getElementById("loginbonus").value = prediction;
}
//——————————————打印现在的时间——————————————————
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
//——————————————统计结果（通常）————————————————
function sum(){
	var currentlove = Number(document.getElementById("current").value);
	var predictlove = Number(document.getElementById("loveca").innerHTML);
	var MuseSingle = Number(document.getElementById("MuseTotalLoveca").innerHTML);
	var AqoursSingle = Number(document.getElementById("AqoursTotalLoveca").innerHTML);
	document.getElementById("totalloveca").innerHTML = currentlove + predictlove - MuseSingle - AqoursSingle;
}
//——————————————统计当日心数——————————————————
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
//————————————————计算到当天为止有几次活动————————————————
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
//————————————————活动攒券数————————————————
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
//————————————————mf，cf，协力攒券数————————————
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
//————————————————统计当日可攒券——————————————
function totalTicketSum(){
	var current = Number(document.getElementById("currentTicket").value);
	var event = Number(document.getElementById("eventTicketSum").innerHTML);
	var mf = Number(document.getElementById("mfTicket").innerHTML);
	var cf = Number(document.getElementById("cfTicket").innerHTML);
	var nm = Number(document.getElementById("nmTicket").innerHTML);
	var lb = Number(document.getElementById("loginbonusTicket").value);
	document.getElementById("totalTicket").innerHTML=current+event+mf+cf+nm+lb;
}
//————————————————计算可抽Box卡数量——————————————
function MuseMemberGachaMax(){
	var loveca = Number(document.getElementById("totalloveca").innerHTML);
	var ticket = Number(document.getElementById("totalTicket").innerHTML);
	var t11 = Number(document.getElementById("current11Ticket").innerHTML)+ Number(document.getElementById("Buy11Ticket").innerHTML);
	var times_11 = Math.floor(loveca/50)+t11;
	loveca -= Math.floor(loveca/50)*50;
	var times_single = Math.floor(loveca/5);
	var t3 =  Number(document.getElementById("current3Ticket").innerHTML);
	var totaltimes = times_11*11+times_single+t3*3;
	document.getElementById("CN2018BoxPerc").innerHTML=1-Math.pow(99.25, totaltimes);
}
//——————————————能抽到生日卡的概率——————————————
function calcPerc(res,cards){
	
}
//——————————————显示可购买礼包数——————————————————
function otherBirths(){
	var other1 = otherMuseBirth(document.getElementById("member").value);
	var other2 = otherAqoursBirth(document.getElementById("member").value);
	document.getElementById("memberBirth").innerHTML=(other1+other2);
	var monthEnd = new Date(String(document.getElementById("birth").innerHTML).replace(/\-/g, "/"));
	var monthNow = TokyoTime();
	document.getElementById("months").innerHTML=monthEnd.getMonth()-monthNow.getMonth();
	document.getElementById("randomPack").innerHTML=Math.round((monthEnd.getMonth()-monthNow.getMonth())/2);
}

//————————————————————————当前的日期偏移————————————————
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

//——————————————进行中的生日单人限定——————————————————
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

//————————————————（原）μ's成员生日抽卡策略————————————
function MuseBirthGacha(strategy){
	var other = otherMuseBirth(document.getElementById("member").value);
	document.getElementById("MuseTotalLoveca").innerHTML = Number(strategy) * other;
}
//————————————————（原）Aqours成员生日抽卡策略————————————
function AqoursBirthGacha(strategy){
	var other = otherAqoursBirth(document.getElementById("member").value);
	document.getElementById("AqoursTotalLoveca").innerHTML = Number(strategy) * other;
}
//————————————————（新）μ's，Aqours成员生日抽卡策略【重构部分，试用】————————————
//生日单限分布哈希表（每一二进制位代表一个角色的step up是否进行中，为1则是，为0则否（定义为：μ's成员从果到妮占用8-16位，Aqours成员从千到露占用24-32位））
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
//——————————计算目标前面有多少个人的生日，不包括正在进行中的（难点）——————————————
//思路：获得哈希表，先获取今天的哈希值
//（目前有3种可能：
//1)没有人的限定进行中，为0；
//2)1个人限定进行中，有1位为1，其余为0；
//3)2个人限定同时进行中，2位为1【符合条件的有3个日期：4月18日，8月2日，9月20日】）

//1)为0，可以直接往后扫，扫到不是0的情况即来到了一个人的生日限定范围内，连续3个数都是该非0数，第4个开始恢复为0（或者其他数）；此时可以加入1人。
//分团：若该数大于等于0x10000为μ's成员，反之为Aqours成员
//2,3）1位或2位为0，此时不能直接扫，可以这样子：
//将今天的哈希值按位取反，比如8月2日哈希为0x01000100，取反后为0xFEFFFEFF，然后将取反数和之后扫到的数按位与。
//那么今天step up进行中的那些成员所在位在按位与后均为0，而不属于今天进行中的成员，按位与后为原数值，遇到非0数，即可+1

//遇到相隔1/2天生日的2名成员的处理（目前只有隔2天）：此时有连续5天Step up进行，第1-3天为角色1，第3-5天为角色2，这段数组中哈希表共取了3个值
//因此碰到一个非0结果后，添加该人头，同时记录今天哈希值的临时变量加上该数，使得该角色被占用（不可再计算），之后和被扫的数按位与时需要一起取反
//如需要计算绘限（10月21日）扫到9月11日鸟生日那天哈希值为0x00400000，

//边缘值：目标就是现在进行中的角色，此时取值为0

//如果有成员生日相同，这3天的哈希值均有2位是1，此时成员计算应该+2，但目前没有成员生日相同，不考虑该情况，待出现时再修改

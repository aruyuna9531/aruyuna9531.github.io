function count(){
	var lnf = document.getElementById("LevelNoFever").value;
	var v_lnf = 0;
	var v_snf = 15;
	switch(lnf){
		case '6': v_lnf=300;v_snf=10;break;
		case '8': v_lnf=350;break;
		case '9': v_lnf=370;break;
		case '10': v_lnf=380;break;
		default: break;
	}
	
	var lf = document.getElementById("LevelFever").value;
	var v_lf = 0;
	var v_sf = 15;
	var times_f = 7;
	switch(lf){
		case '6': v_lf=300;times_f=8;v_sf=10;break;
		case '8': v_lf=350;break;
		case '9': v_lf=370;break;
		case '10': v_lf=380;break;
		case 'short': v_lf=348;times_f=8;break;
		default: break;
	}
	
	var rnf = document.getElementById("RankNoFever").value;
	var v_rnf = 0;
	switch(rnf){
		case 'S': v_rnf=1.3;break;
		case 'SS': v_rnf=1.4;break;
		case 'SSS': v_rnf=1.5;break;
		default: break;
	}
	
	var rf = document.getElementById("RankFever").value;
	var v_rf = 0;
	switch(rf){
		case 'S': v_rf=1.3;break;
		case 'SS': v_rf=1.4;break;
		case 'SSS': v_rf=1.5;break;
		default: break;
	}
	
	var betnofever = Number(document.getElementById("betNoFever").value);
	var bonus = Number(document.getElementById("bonus").value)/100+1;
	var one_round_times = 8 + times_f;
	var one_round_staminas = v_snf * betnofever * 8 + v_sf * 2 * times_f;
	var one_round_pts = (v_lnf * v_rnf * bonus) * betnofever * 8 + (v_lf * v_rf * bonus) * 2 * times_f;
	
	var pt_gap = Number(document.getElementById("target").value) - Number(document.getElementById("current").value);
	var to_gap_rounds = Math.floor(pt_gap / one_round_pts);
	var remain_times = Math.ceil((pt_gap - to_gap_rounds * one_round_pts) / (v_lnf * v_rnf * bonus) / 2);
	
	var total_staminas = to_gap_rounds * one_round_staminas + remain_times * v_snf * 2;
	var total_times = one_round_times * to_gap_rounds + remain_times;
	var total_elapse_min = total_times * 2.87;
	var buy_stamina = total_staminas - Number(document.getElementById("current_stamina").value) - Number(document.getElementById("_d").innerHTML)*(Number(document.getElementById("stamina_50").value)+Number(document.getElementById("stamina_friend").value));
	buy_stamina = buy_stamina - Math.floor(((
		Number(document.getElementById("_d").innerHTML) * 24 
		+ Number(document.getElementById("_h").innerHTML)) * 60 
		+ Number(document.getElementById("_m").innerHTML))/6);
	
	console.log(v_rnf);
	document.getElementById("need_stamina").innerHTML = total_staminas;
	document.getElementById("buy_stamina").innerHTML = buy_stamina > 0 ? buy_stamina : 0;
	document.getElementById("playSongs").innerHTML = total_times;
	document.getElementById("time_h").innerHTML = Math.floor(total_elapse_min / 60);
	document.getElementById("time_min").innerHTML = Math.floor(total_elapse_min % 60);
}
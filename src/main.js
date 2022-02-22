import Binder from "../../lib/lib/binder.js";
var v = document.getElementById("v");
var calc={};
calc.frame=0;
calc.fps =60;
calc.dt=1;
var cancel=false;
var binder = new Binder();

v.addEventListener("seeked",function(e){
	var old = calc.frame;
	calc.frame =v.currentTime;
	
});
window.main={};
var presson = false;
main.changeFrame = function(f){
	var f2 = f;
	if(presson){
		f2=f*5;
	}
	if(isNaN(v.duration)){
		return;
	}
	calc.frame=Math.min(Math.max(calc.frame+f2/calc.fps,0),v.duration);
	v.currentTime=calc.frame;
	presson=true;

//	window.setTimeout(()=>{
//		if(!presson){
//			return;
//		}
//		main.changeFrame(f)}
//		,400
//	);
	
}
main.changeSec = function(s){
	main.changeFrame(s*calc.fps);
}
main.recalc=function(){
	calc.recv = Math.abs(calc.bst0 - calc.bst1)/calc.dt;
}
main.recalc2=function(){
	calc.dt2 = Math.abs(calc.bst2 - calc.bst3)/calc.recv;
	calc.spd1 = 8833 / calc.dt2;
	calc.extend = calc.spd1 * ((calc.range-0.5)/100)/2.5;
	calc.extend2 = calc.spd1 * (9.5-1.5)/100 ;
}
main.recalc3=function(){
	calc.dt3 = Math.abs(calc.bst4 - calc.bst5)/calc.dash_cost;
	calc.dash = 200 * calc.dash_cycle / calc.dt3;
}
main.recalc4=function(){
	calc.increase= 1000 / calc.increase_time;
}


document.addEventListener("pointerup",()=>{
	presson=false;
});
document.addEventListener("change",(e)=>{

});
document.getElementById("file").addEventListener("change",
	function(e){
		var file=this.files[0];
		
		calc.frame=0;
		// FileReaderを生成
		var fileReader = new FileReader();
		 
		calc.filename=file.name;
	
		// 読み込み完了時の処理を追加
		fileReader.onload = function() {
	
			v.src= this.result;
		};
	
		// ファイルの読み込み(Data URI Schemeの取得)
		fileReader.readAsDataURL( file );

});

binder.init(calc);

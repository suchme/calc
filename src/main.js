import Binder from "./binder.js";
var v = document.getElementById("v");
var calc={};
calc.frame=0;
calc.fps =60;
var cancel=false;
var binder = new Binder();

v.addEventListener("seeked",function(e){
	var old = calc.frame;
	var frame = v.currentTime * calc.fps;
	calc.frame =frame|0;
	calc.frame +=Math.sign(old-frame);
});
window.main={};
main.changeFrame = function(f){
	calc.frame=Math.min(Math.max(calc.frame+f,0),v.duration*calc.fps);
	v.currentTime=calc.frame/calc.fps;

	cancel=window.setTimeout(()=>{
		main.changeFrame(f)}
		,200
	);
}
main.changeSec = function(s){
	main.changeFrame(s*calc.fps);
}
main.recalc=function(){
	calc.recv = (calc.bst0 - calc.bst1)/calc.dt;
}
main.recalc2=function(){
	calc.extend = (calc.range/100)/((calc.bst2 - calc.bst3)/calc.recv)   *8833;
}


document.addEventListener("pointerup",()=>{
	clearTimeout(cancel);
});
document.addEventListener("change",(e)=>{

});
document.getElementById("file").addEventListener("change",
	function(e){
		var file=this.files[0];
		
		// FileReaderを生成
				var fileReader = new FileReader();
		 
	
		// 読み込み完了時の処理を追加
		fileReader.onload = function() {
	
			v.src= this.result;
		};
	
		// ファイルの読み込み(Data URI Schemeの取得)
		fileReader.readAsDataURL( file );

});

binder.init(calc);

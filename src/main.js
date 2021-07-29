var v = document.getElementById("v");
var frame=0;
var fps =60;
var cancel=false;
window.main={};
main.changeFrame = function(f){
	frame=Math.min(Math.max(frame+f,0),v.duration*fps);
	v.currentTime=frame/fps;

	cancel=window.setTimeout(()=>{changeFrame(f)},200);
}
main.changeSec = function(s){
	changeFrame(s*fps);
}

document.addEventListener("pointerup",()=>{
	clearTimeout(cancel);
});

"use strict";

import Binder from "./binder.js";

var binder=new Binder();
var values={};


var onloadfunc=function(){
	binder.init(values);

}


onloadfunc();

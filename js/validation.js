
var isNumber = function(val) {
	if(!val.match(/^[0-9]+$/)) {
		alert("数値を入力してください。");
		return true;
	}
}

var isString = function() {

}

var isEmpty = function(val) {
	if("" == val){
		return true;
	}
}
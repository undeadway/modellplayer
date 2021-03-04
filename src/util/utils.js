const isWindows = require("os").type().toLocaleLowerCase().indexOf("windows") >= 0;
const separator = isWindows ? "\\" :  "/";


function a(e) {
	return 10 > e ? "0" + e : "" + e;
}

exports.secondToTime = function(e) {
	let t = parseInt(e / 60),
		i = parseInt(e - 60 * t);
	return a(t) + ":" + a(i);
}

exports.getSeparator = () => {
	return separator;
}

exports.isWIndows = () => {
	return isWindows;
}
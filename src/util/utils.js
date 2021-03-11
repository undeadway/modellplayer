const os = require("os");
const isWindows = os.type().toLocaleLowerCase().indexOf("windows") >= 0;
const separator = isWindows ? "\\" :  "/";
const process = require("process");
let isDevMode = null;

function _a(e) {
	return 10 > e ? "0" + e : "" + e;
}

exports.secondToTime = function(e) {
	let t = parseInt(e / 60),
		i = parseInt(e - 60 * t);
	return _a(t) + ":" + _a(i);
}

exports.getSeparator = () => {
	return separator;
}

exports.isWIndows = () => {
	return isWindows;
}

exports.isDevMode = () => {
	if (isDevMode !== null) {
		return isDevMode;
	}
	for (let i = 0, len = process.argv.length; i < len; i++) {
		if (process.argv[i] === "--devmode") {
			isDevMode = true;
			return isDevMode;
		}
	}
	isDevMode = false;
	return isDevMode;
}

exports.getOS = () => {
	return os;
};
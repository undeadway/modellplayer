const os = require("os");
const fs = require("fs");
const isWindows = os.type().toLocaleLowerCase().indexOf("windows") >= 0;
const separator = isWindows ? "\\" :  "/";
const { remote } = require('electron');
let isDevMode = false, isDebug = false;
 (() => {
	const process = require("process");
	for (let i = 0, len = process.argv.length; i < len; i++) {
		if (process.argv[i] === "--devmode") {
			isDevMode = true;
		}
		if (process.argv[i] === "-debug") {
			isDebug = true;
		}
	}
})();

let rootPath = (() => {
	let tmp = __dirname.split("/");
	tmp.pop();
	tmp.pop();

	if (!isDevMode && tmp[1] === 'home') {
		tmp.pop();
		tmp.pop();
	}

	let result = tmp.join("/") + "/";
	return result;
})();

if (!isDevMode) {
	if (fs.existsSync("./resources/")) {
		if (fs.existsSync("./resources/app/")) {
			rootPath += "resources/app/";
		} else {
			rootPath += "resources/app.asar/";
		}
	}
}

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

exports.isWindows = () => {
	return isWindows;
}

exports.isDevMode = () => {
	return isDevMode;
}
exports.isDebug = () => {
	return isDebug;
}

exports.getOS = () => {
	return os;
};

exports.getRootPath = () => {
	return rootPath;
}

exports.getGlobalConfig = (... names) => {
	let configs = [];
	for (let name of names) {
		let config = global[name];
		if (!config) {
			config = remote.getGlobal(name);
		}
		configs.push(config);
	}
	return configs;
}
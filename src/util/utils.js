const os = require("os");
const fs = require("fs");
const isWindows = os.type().toLocaleLowerCase().indexOf("windows") >= 0;
const separator = isWindows ? "\\" :  "/";
const process = require("process");
const { remote } = require('electron');
let isDevMode = null;

let rootPath = "./";
if (fs.existsSync("./resources/")) {
	if (fs.existsSync("./resources/app/")) {
		rootPath = "./resources/app/";
	} else {
		rootPath = "./resources/app.asar/";
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
const fs = require("fs");

const  [rootPath, CONFIG_DIR_PATH ] = (() => {
	const { isWindows , getRootPath } = require("./../util/utils");

	let configDirPath = isWindows() ? process.env.USERPROFILE : process.env.HOME

	return [getRootPath(), configDirPath +  "/.modellplayer/"];
})();
const PERFERENCES_NAME = `${rootPath}res/config/perferences.json`;
const CONFIG_FILE_PATH = `${CONFIG_DIR_PATH}perferences`

let config = null;

const configObj = {
	init: () => {
		let file = null;
		if (fs.existsSync(CONFIG_FILE_PATH)) {
			configObj.get();
			return;
		} else {
			file = fs.readFileSync(PERFERENCES_NAME, "utf-8");
		}

		configObj.write(JSON.parse(file));
	},
	clear: () => {
		if (fs.existsSync(CONFIG_FILE_PATH)) {
			fs.rmSync(CONFIG_FILE_PATH);
		}
	},
	get: () => {

		if (config === null) {
			if (!fs.existsSync(CONFIG_FILE_PATH)) {
				configObj.init();
			}
	
			let file = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
			let tmp = Buffer.from(file, "base64").toString("utf-8");
			config = JSON.parse(tmp);
		}

		return config;

	},
	write: (obj) => {

		if (!fs.existsSync(CONFIG_DIR_PATH)) {
			fs.mkdirSync(CONFIG_DIR_PATH);
		}

		let data = JSON.stringify(obj);
		let base64 = Buffer.from(data).toString("base64")

		fs.writeFileSync(CONFIG_FILE_PATH, base64, "utf-8");
	}
};


exports = module.exports = configObj;
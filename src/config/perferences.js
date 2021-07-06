const fs = require("fs");
const PERFERENCES_NAME = `./resources/perferences.json`;
const CONFIG_DIR_PATH = process.env.HOME + "/.modellplayer/"
const CONFIG_FILE_PATH = `${CONFIG_DIR_PATH}perferences`
const rootPath = require("./../util/utils").getRootPath();

const config = {
	init: () => {
		let file = fs.readFileSync(PERFERENCES_NAME, "utf-8");

		config.write(JSON.parse(file));
	},
	clear: () => {
		if (fs.existsSync(CONFIG_FILE_PATH)) {
			fs.rmSync(CONFIG_FILE_PATH);
		}
	},
	get: () => {

		if (!fs.existsSync(CONFIG_FILE_PATH)) {
			config.init();
		}

		let file = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
		file = Buffer.from(file, "base64").toString("utf-8");
		return JSON.parse(file);
	},
	write: (obj) => {

		if (!fs.existsSync(CONFIG_DIR_PATH)) {
			fs.mkdirSync(CONFIG_DIR_PATH);
		}

		if (fs.existsSync(CONFIG_FILE_PATH)) return;

		let data = JSON.stringify(obj);
		let base64 = Buffer.from(data).toString("base64")

		fs.writeFileSync(CONFIG_FILE_PATH, base64, "utf-8");
	}
};


exports = module.exports = config;
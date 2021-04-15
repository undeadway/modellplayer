const RESOURCES = "./resources";
const PERFERENCES_NAME = `${RESOURCES}/.perferences`;
const fs = require("fs");
const rootPath = require("./../util/utils").getRootPath();

exports = module.exports = {
	get: () => {
		let fileName = PERFERENCES_NAME;
		if (!fs.existsSync(PERFERENCES_NAME)) {
			fileName = `${rootPath}res/config/perferences.json`
		}

		let file = fs.readFileSync(fileName, "utf-8");

		if (fs.existsSync(PERFERENCES_NAME)) {
			file = Buffer.from(file, "base64").toString("utf-8");
		}

		return  JSON.parse(file);
	},
	write: (obj) => {
		if (!fs.existsSync(RESOURCES)) {
			fs.mkdirSync(RESOURCES);
		}
		let data = JSON.stringify(obj);
		let base64 = Buffer.from(data).toString("base64");
		fs.writeFileSync(PERFERENCES_NAME, base64, "utf-8");
	}
};
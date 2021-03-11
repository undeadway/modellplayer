const RESOURCES = "./resources";
const PERFERENCES_NAME = `${RESOURCES}/.perferences`;
const fs = require("fs");

exports = module.exports = {
	get: () => {
		let fileName = fs.existsSync(PERFERENCES_NAME) ? PERFERENCES_NAME :`${global.rootPath}res/config/perferences.json`;
		return  JSON.parse(fs.readFileSync(fileName, "utf-8"));
	},
	write: (obj) => {
		if (!fs.existsSync(RESOURCES)) {
			fs.mkdirSync(RESOURCES);
		}
		fs.writeFileSync(PERFERENCES_NAME, JSON.stringify(obj), "utf-8");
	}
};
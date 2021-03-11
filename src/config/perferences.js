const PERFERENCES_NAME = "./resources/.perferences";
const fs = require("fs");

exports = module.exports = {
	get: () => {
		let fileName = fs.existsSync(PERFERENCES_NAME) ? PERFERENCES_NAME :`${global.rootPath}res/config/perferences.json`;
		return  JSON.parse(fs.readFileSync(fileName, "utf-8"));
	},
	write: (obj) => {
		if (!fs.existsSync("./resources")) { //fs.existsSync(PERFERENCES_NAME)) {
			fs.mkdirSync("./resources");
		}
		fs.writeFileSync(PERFERENCES_NAME, JSON.stringify(obj), "utf-8");
	}
};
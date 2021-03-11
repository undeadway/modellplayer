const PERFERENCES_NAME = ".perferences";
const fs = require("fs");
const perferences = JSON.parse(fs.readFileSync(`${global.rootPath}${PERFERENCES_NAME}`, "utf-8"));

exports = module.exports = {
	get: () => {
		return  perferences;
	},
	write: (obj) => {
		let string = JSON.stringify(obj);
		fs.writeFileSync(`${global.rootPath}${PERFERENCES_NAME}`, string, "utf-8");
	}
};
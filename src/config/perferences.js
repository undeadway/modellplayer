const PERFERENCES_NAME = ".perferences";
const fs = require("fs");

exports = module.exports = {
	get: () => {
		return  JSON.parse(fs.readFileSync(PERFERENCES_NAME, "utf-8"));
	},
	write: (obj) => {
		let string = JSON.stringify(obj);
		fs.writeFileSync(PERFERENCES_NAME, string, "utf-8");
	}
};
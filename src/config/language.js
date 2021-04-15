const fs = require("fs");
const rootPath = require("./../util/utils").getRootPath();
const langFolder = fs.readdirSync(`${rootPath}res/languages`);
const languages = {};

langFolder.map(file => {
	let name = file.replace(".json", "");
	languages[name] = JSON.parse(fs.readFileSync(`${rootPath}res/languages/${file}`, "utf-8"));
});

module.exports = exports = {
	getConfig: (name) => {
		return languages[name];
	}
}
const fs = require("fs");
const langFolder = fs.readdirSync(`${global.rootPath}res/languages`);
const languages = {};

langFolder.map(file => {
	let name = file.replace(".json", "");
	languages[name] = JSON.parse(fs.readFileSync(`${global.rootPath}res/languages/${file}`, "utf-8"));
});

module.exports = exports = {
	getConfig: (name) => {
		return languages[name];
	}
}
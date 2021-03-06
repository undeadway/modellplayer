const fs = require("fs");

const langFolder = fs.readdirSync("./res/languages");

const languages = {};

langFolder.map(file => {
	let fn = file.replace(".json", "");
	languages[fn] = JSON.parse(fs.readFileSync(`./res/languages/${file}`, "utf-8"));
});

module.exports = exports = {
	getConfig: () => {
		
	}
}
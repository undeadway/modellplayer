/**
 * 项目所要用到的库的预载入
 */
const fs = require("fs");

let rootPath = "./";
if (fs.existsSync("./resources/")) {
	if (fs.existsSync("./resources/app/")) {
		rootPath = "./resources/app/";
	} else {
		rootPath = "./resources/app.asar/";
	}
}

global.rootPath = rootPath;

const config = fs.readdirSync(`${rootPath}src/config`);

config.map(file => {
	let configs = file.replace(".js", "");
	let configName = configs.charAt(0).toUpperCase() + configs.slice(1) + "Config";

	global[configName] = require(`./../../src/config/${file}`);
});
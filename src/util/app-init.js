/**
 * 项目所要用到的库的预载入
 */
const rootPath = require("./utils").getRootPath();
const config = require("fs").readdirSync(`${rootPath}src/config`);

config.map(file => {
	let configs = file.replace(".js", "");
	let configName = configs.charAt(0).toUpperCase() + configs.slice(1) + "Config";

	global[configName] = require(`./../../src/config/${file}`);
});
/**
 * 项目所要用到的库的预载入
 */
const fs = require("fs");

const config = fs.readdirSync("./src/config");

config.map(file => {
    let configName = file.replace(".js", "");
    configName = configName.charAt(0).toUpperCase() + configName.slice(1) + "Config";

    global[configName] = require(`./../../src/config/${file}`);
});
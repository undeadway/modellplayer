let LanguageConfig = null;
if (global.LanguageConfig) {
	LanguageConfig = global.LanguageConfig;
} else {
	LanguageConfig = require('electron').remote.getGlobal("LanguageConfig");
}
let langguage = LanguageConfig.getConfig("zh-CN");

module.exports =  {
	get: (pageName) => {
		return {
			title: langguage.common.title,
			body: langguage.layout[pageName]
		}
	},
	getMenu: () => {
		return langguage.menu;
	},
	change: (name) => {
		langguage = LanguageConfig.getConfig(name);
	}
};
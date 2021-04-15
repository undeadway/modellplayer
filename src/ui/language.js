// const LanguageConfig = global.LanguageConfig ? global.LanguageConfig : require('electron').remote.getGlobal("LanguageConfig");
// const PerferencesConfig = global.PerferencesConfig ? global.PerferencesConfig : require('electron').remote.getGlobal("PerferencesConfig");
const utils = require("./../util/utils");
const [PerferencesConfig, LanguageConfig] = utils.getGlobalConfig("PerferencesConfig", "LanguageConfig");
const language = LanguageConfig.getConfig(PerferencesConfig.get().language.default);

module.exports =  {
	init: ($, pageName) => {

		let mod = language[pageName];

		$("title").html(mod.title || language.common.title);
		for (let key in mod.layout) {
			$(`#${key}`).html(mod.layout[key]);
		}
	},
	getMenu: () => {
		return language.menu;
	},
	change: (name) => {
		language = LanguageConfig.getConfig(name);
	}
};